/* eslint-disable react/jsx-pascal-case */
import React, { Component , useState , useRef , useEffect} from 'react'
import { connect } from 'react-redux'
import '../Styles/Class_assessment.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import '../Styles/Add_assessment.css'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import  File_upload from './File_upload.js'
import { InputTextarea } from 'primereact/inputtextarea';
import FormData, {getHeaders} from 'form-data';
import { InputText } from 'primereact/inputtext'
import {Input , Card} from 'antd'
import { ScrollPanel } from 'primereact/scrollpanel';
import axios from 'axios';

const { Meta } = Card;


export const Add_assessment = (props) => {
    const toast = useRef(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(props.store.backend.Add_assessment_switch);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [activeIndex , setactiveIndex] = useState(0)
    //Fields being entered
    const [Name , setName] = useState('')
    const [Extra_info , setExtra_info] = useState('')
    const [ReportCards , setReportCards] = useState(null)
    const [new_assessment_id , setnew_assessment_id] = useState(null)
    const [Extras , setExtras] = useState(null)

    //Fields created
    const [relevant_info , set_relevant_info] = useState(false)
    const [reports_uploaded , setreports_uploaded] = useState(false)
    const [extra_uploaded , setextra_uploaded] = useState(false)
 
    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        props.Add_assessment_switch()
    }
    const steps = [
        {label : 'Name'},
        {label : 'Extra info'},
        {label : 'Report cards'},
        {label : 'Extras '}
    ]
    const upload_assessment = (extra_info) =>{
        console.log(props.store)
        // console.log({
        //     'School' : props.store.backend.id,
        //     'Name' : Name,
        //     'Extra_information' : Extra_info,
        //     'Class' : props.Class,
        // })
        axios({
            method : 'POST',
            url : 'https://m-r-s-api.onrender.com/Create_assessment',
            // onUploadProgress : (e) => {
            //     setuploaded_size(e.progress)
            // },
            data : {
                'School' : props.store.backend.id,
                'Name' : Name,
                'Extra_information' : extra_info,
                'Class' : props.Class,
            },
            headers : { 
                'content-type' : 'application/json',                
            }
        }).then((response)=>{
            console.log(response.data)
            setnew_assessment_id(response.data['id'])
            set_relevant_info(true)
            toast.current.show({severity: 'info', summary: 'Uploading' , detail : 'Assessment with id ' + response.data['id'] + ' created'})

        })
    }

    const button_disabled = () => {

    }

    const renderFooter = () => {
        return (
            <div>
                {(activeIndex === 2 || activeIndex ===3) ? (null) : (
                      <Button label={activeIndex === 0 ? ('Cancel') : ('Previous')} icon="pi pi-times" onClick={() =>{
                        if (activeIndex ===0){
                            props.Add_assessment_switch(); 
                            onHide('displayBasic2')
                        } else {
                            setactiveIndex(activeIndex-1)
                        
                        }
                       
                    } } className="p-button-text" />
                )}
              
                <Button disabled = { (activeIndex === 2 || activeIndex ===3)  && (!props.store.backend.Reports_upload && !props.store.backend.Extra_assessment_files)}  label={activeIndex === 3 ? ('Submit') : ('Next')} icon="pi pi-check" onClick={() => {
                    if (activeIndex === 3){
                        onHide('displayBasic2')
                        props.Extra_assessment_files(false)
                        props.Reports_upload(false)
                    } else {
                        if (activeIndex === 0){
                            setName(document.getElementById('Name_input').value)
                        } else if(activeIndex === 1){
                            // setExtra_info(document.getElementById('Extra_info').value)
                            // console.log(Extra_info)
                            let info = document.getElementById('Extra_info').value
                            console.log(info)
                            setTimeout(() => {
                                upload_assessment(info)
                            }, 1000);
                            
                        } else if (activeIndex === 2){
                            props.Reports_upload(false)
                        }
                        setactiveIndex(activeIndex + 1)
                    }
                }} autoFocus />
            </div>
        );
    }

    const Extra_Comp_field = () => {
        return (
            <InputTextarea placeholder = "Put here your extra info about the assessment" style = {{width : '30vw'}} id = "Extra_info" rows={5} cols={30} autoResize = {false} />
        )

    }

    

    const Name_Comp_field = () => {
        return (
            <span className="p-input-icon-right">
                    <i className="pi pi-spin pi-spinner" />
                    <InputText id = "Name_input" />
            </span>
            // <Inputq onChange = {(e)=>setName(e.target.value)} />
        )
    }
    useEffect(()=>{},[])
    const ref = useRef(null)

    return (
        <div  ref = {ref} >
            <Toast ref={toast} />
            <Dialog focusOnShow = {true} header="Add Assessment" visible={displayBasic2} style={{ width: '60vw' , height : '80vh' }} footer={
               renderFooter()
            } onHide={() => onHide('displayBasic2')}>
                <div className = "components">
                    <Steps activeIndex = {activeIndex} model = {steps} style = {{
                        width : '40vw',
                        height : '10vh'
                    }} />
                    {
                        activeIndex === 0 ? (
                            <div className = "form-field-Name">
                                <h4>Add Name of the Assessment</h4>
                                <Name_Comp_field/>

                            </div>
                            ) : (null)
                        
                       
                    }
                    {
                        activeIndex === 1 ? ( 
                        <div className = "form-field-Name">
                        <h4>Extra Notes</h4>
                        <Extra_Comp_field/>

                    </div>) : (null)
                    }
                    {
                        activeIndex === 2 ? (
                            <div className = "Upload-style">
                                <h4>Upload Report cards</h4>
                                <ScrollPanel  style = {{
                                    height : '40vh',
                                    width : '50vw'
                            
                                }}>
                                    <File_upload specific_extra_files = {false} type = {false} id = {new_assessment_id}/>
                                </ScrollPanel>
                            </div>
                      
                        ) : (null)
                    }
                    {
                        activeIndex === 3 ? (
                        <div className = "Upload-style">
                            <h4>Upload Extra info</h4>
                            <ScrollPanel  style = {{
                                height : '40vh',
                                width : '50vw'
                        
                            }}>
                                <File_upload specific_extra_files = {false} type = {true} id = {new_assessment_id}/>
                            </ScrollPanel>
                        </div>) : (null)
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
    Add_assessment_switch : ()=> dispatch({type : 'Add_assessment'}),
    Add_name : (text)=> dispatch({type : 'add_name' , text : text}),
    Reports_upload : (bool) => dispatch({type : 'Reports_upload' , bool : bool}),
    Extra_assessment_files : (bool) => dispatch({type : 'Extra_assessment_files' , bool : bool})
})

export default connect(mapStateToProps, mapDispatchToProps)(Add_assessment)
