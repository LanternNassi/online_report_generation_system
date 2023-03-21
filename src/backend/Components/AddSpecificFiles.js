/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React , {Component  , useState , useRef , useEffect} from 'react'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from 'react-redux'
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '../Styles/Add_Specific_files.css'
import { Chip } from 'primereact/chip';
import { AutoComplete } from 'primereact/autocomplete';
import File_upload from './File_upload';
import axios from 'axios'
import { Toast } from 'primereact/toast';


export const AddSpecificFiles = (props) => {
    const [isVisible , setIsvisible] = useState(props.store.backend.Add_Specific_files_switch)
    const [Except , setExcept] = useState(false)
    const toast = useRef(null);

    //Autocomplete 
    const [papers, setpapers] = useState([
        {id : 1 , paper_code : 'P201/3'},
        {id : 2 , paper_code : 'P201/5'},
        {id : 3 , paper_code : 'P201/6'},
        {id : 4 , paper_code : 'P201/8'},
        {id : 5 , paper_code : 'P201/9'}
    ]);
    const [filtered_papers, setfiltered_papers] = useState(null);
    const [selected_paper, setSelected_paper] = useState(null);
    const [selected_papers , setselected_papers] = useState([])
    const searchCountry = (event) => {
        setTimeout(() => {
            let _filtered_papers = [];
            for(let i = 0; i<papers.length; i++){
                if(papers[i]['Name'].includes(event.query)){
                    _filtered_papers.push(papers[i])
                }
            }
            setfiltered_papers(_filtered_papers);
        }, 250);
    }
    
    const itemTemplate = (item) => {
        return (
            <div className="paper-item">
                <h6>{item.id}</h6>
                <h6>{item.Name}</h6>
            </div>
        );
    }

    const get_all_students = (assessment_id) => {
        axios({
            method : "GET",
            data : {},
            url : 'https://m-r-s-api.onrender.com/GetStudents/' + assessment_id + '/'
        }).then((response)=>{
            if (response.status == 200){
                console.log(response.data)
                setpapers(response.data)
            } else {
                setpapers([])
            }
        })
    }
    
    useEffect(()=>{
        get_all_students(props.assessment_id)
    },[])
    const onHide = (name) => {
        setIsvisible(false)
        props.Add_Specific_files_switch()
    }
    const renderFooter = (name) => {
        return (
            <div>
                
                <Button label="Submit" icon="pi pi-check" onClick={() => {
                    
                }} autoFocus />
            </div>
        );
    }
  return (
    <div >
        <Toast ref={toast}></Toast>
        <Dialog header = {"Add specific files"} visible = {isVisible} style = {{width : '55vw'}} onHide= {()=>{onHide('IsVisible')}}>
            {/* <div className = 'actions' >
                {Except ? (
                    <Button icon="pi pi-check" className="p-button-rounded p-button-outlined" aria-label="Submit" />
                ) : (
                    <Button icon="pi pi-times" disabled className="p-button-rounded p-button-danger p-button-outlined" aria-label="Cancel" />
                )}
            <Button label = "Except" onClick= {()=>{
                Except ? (setExcept(false)) : (setExcept(true))
                if (Except){
                    setExcept(false)
                    toast.current.show({severity: 'info', summary: 'Selection', detail: 'All names of students appearing in the selection box will be selected;'});
                } else {
                    setExcept(true)
                    toast.current.show({severity: 'info', summary: 'Selection', detail: 'All names of students in the selection box will be exempted.'});
                }
            }} />
            </div> */}
            <div className = 'Names' >
                    <h4>Names of students</h4>
                    <AutoComplete 
                            className = "auto-comp" 
                            value={selected_paper} 
                            suggestions={filtered_papers} 
                            delay = {500}
                            completeMethod={searchCountry} 
                            field="name" dropdown forceSelection 
                            itemTemplate={itemTemplate} 
                            onChange={(e) => {
                                if(e.value && e.value.id){
                                    for(let i = 0; i<selected_papers.length; i++){
                                        if(e.value.Name === selected_papers[i].Name){
                                            return null
                                        }
                                    }
                                    setSelected_paper(e.value.Name)
                                    setselected_papers([...selected_papers , e.value])
                                    setTimeout(()=>{
                                        setSelected_paper(null)
                                    },2000)
                                }
                               
                            }} 
                            aria-label="Papers" 
                            dropdownAriaLabel="Select Paper" />
                
            </div>
                 {
                        selected_papers ? (
                            <div className = "tags">
                               {
                                   selected_papers.map((item , idx) => (
                                       <div>
                                           <Chip label={item.Name} className="mb-2" removable onRemove = {
                                               () => {
                                                   let all_selected_papers = selected_papers
                                                   all_selected_papers.splice(idx , 1)
                                                    // alert(idx + item.paper_code)
                                                setselected_papers([...all_selected_papers])
                                               }
                                           }/>
                                          
                                       </div>
                                   ))
                               }
                            </div>
                        ) : (
                            null
                        )
                    }
            <div className='Upload'>
                <h4>Upload files</h4>
                <ScrollPanel  style = {{
                    height : '40vh',
                    width : '50vw',
                    justifyContent : 'center',
                    alignItems : 'center',
            
                }}>
                    <File_upload Students = {selected_papers} specific_extra_files = {true} type = {false} id = {props.assessment_id}/>
                </ScrollPanel>
            </div>

        </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    Add_Specific_files_switch : ()=>dispatch({type: 'SFS'}),
})
export default connect(mapStateToProps, mapDispatchToProps)(AddSpecificFiles)


