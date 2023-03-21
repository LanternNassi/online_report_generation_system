import React, { Component , useState,useRef } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import '../Styles/Add_student.css'
import { Toast } from 'primereact/toast';
import { Chip } from 'primereact/chip';
import { AutoComplete } from 'primereact/autocomplete';

export const Add_teacher = (props) => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(props.store.backend.Add_teacher_switch);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [filtered_papers, setfiltered_papers] = useState(null);
    const [papers, setpapers] = useState([
        {id : 1 , paper_code : 'P201/3'},
        {id : 2 , paper_code : 'P201/5'},
        {id : 3 , paper_code : 'P201/6'},
        {id : 4 , paper_code : 'P201/8'},
        {id : 5 , paper_code : 'P201/9'}
    ]);
    const [selected_paper, setSelected_paper] = useState(null);
    const [selected_papers , setselected_papers] = useState([])
    const toast = useRef(null);

    const showWarn = (warn_message) => {
        toast.current.show({severity:'warn', summary: 'Warn Message', detail:warn_message, life: 5000});
    }

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const searchCountry = (event) => {
        setTimeout(() => {
            let _filtered_papers = [];
            for(let i = 0; i<papers.length; i++){
                if(papers[i]['paper_code'].includes(event.query)){
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
                <h6>{item.paper_code}</h6>
            </div>
        );
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() =>{
                    props.SFS();
                    // props.close_overlay() ;
                    onHide(name)
                } } className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => {
                    props.close_overlay()
                    onHide(name)
                }} autoFocus />
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
             <Dialog header="Add Teacher" visible={displayBasic2} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
                <div className = "form-fields" >
                    <div className = "form-field">
                        <h4>Name</h4>
                        <InputText type="text" className="block mb-2" placeholder="Name of the teacher" />
                    </div>
                    <div className = "form-field">
                        <h4>Contact</h4>
                        <InputText type="text" className="block mb-2" placeholder="Contact" />
                    </div>
                    <div className = "form-field">
                        <h4>Email</h4>
                        <InputText type="text" className="block mb-2" placeholder="Email" />
                    </div>
                    <div className = "form-field">
                        <h4>Subjects</h4>
                        <AutoComplete 
                            className = "auto-comp" 
                            value={selected_paper} 
                            suggestions={filtered_papers} 
                            delay = {2000}
                            completeMethod={searchCountry} 
                            field="name" dropdown forceSelection 
                            itemTemplate={itemTemplate} 
                            onChange={(e) => {
                                // console.log(e)
                                if(e.value && e.value.id){
                                    for(let i = 0; i<selected_papers.length; i++){
                                        if(e.value.paper_code == selected_papers[i].paper_code){
                                            showWarn('You have already added ' + e.value.paper_code +' . Please choose another paper')
                                            return null
                                        }
                                    }
                                    setSelected_paper(e.value.paper_code)
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
                            <div className = "paper-chips">
                               {
                                   selected_papers.map((item , idx) => (
                                       <div>
                                           <Chip label={item.paper_code} className="mb-2" removable onRemove = {
                                               () => {
                                                   let all_selected_papers = selected_papers
                                                   all_selected_papers.splice(idx , 1)
                                                    alert(idx + item.paper_code)
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
                </div>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    close_overlay : () => dispatch({type : 'Add_teacher_switch'}),

})

export default connect(mapStateToProps, mapDispatchToProps)(Add_teacher)
