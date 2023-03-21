/* eslint-disable no-unused-vars */

import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import axios from 'axios'
import { connect } from 'react-redux'
import FormData, {getHeaders} from 'form-data';


export const File_upload = (props) => {
    // const [specific_extra_files , set_specific_extra_files] = useState(props.specific_extra_files?(props.specific_extra_files):(false))
    const [totalSize, setTotalSize] = useState(0);
    const [uploaded_size , setuploaded_size] = useState(null)
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const onUpload = () => {
        // alert('Uploaded')
        toast.current.show({severity: 'info', summary: 'Uploading', sticky : uploaded_size ===1 ? (false) : (true), detail: ()=>(
            // <div style = {{height : '40vh' , width : '20vw'}} >
            // <ProgressBar value = {uploaded_size} />
            // </div>
            <h3>Hello</h3>
        )});
    }

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        // e.files.forEach(file => {
        //     _totalSize += file.size;
        // });
        for(let i=0; i<e.files.length; i++){
            _totalSize += e.files[i].size
        }

        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        // e.files.forEach(file => {
        // });
        for(let i = 0; i<e.files.length; i++){
            _totalSize += (e.files[i].size || 0);
        }
        setTotalSize(_totalSize);
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const onBasicUpload = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }

    const onBasicUploadAuto = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
       
        const value = totalSize/1000000000
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 GB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const upload = (form_data) => {
        axios({
            method : 'POST',
            url : 'http://localhost:8000/Upload_reports',
            onUploadProgress : (e) => {
                setuploaded_size(e.progress)
            },
            data : form_data,
            headers : { 
                'content-type' : 'multipart/form-data',                
            }
        }).then((response)=>{
            if (response.status == 200){
                onTemplateClear()
                fileUploadRef.current.clear()
                // console.log(fileUploadRef)
                toast.current.show({severity: 'info', summary: 'Success', detail: 'Reports successfully uploaded'});
                props.Reports_upload(true)
            }
        })
    }

    const upload_other_docs = (form_data) => {
        axios({
            method : 'POST',
            url : 'http://localhost:8000/Upload_extra_docs',
            onUploadProgress : (e) => {
                setuploaded_size(e.progress)
            },
            data : form_data,
            headers : { 
                'content-type' : 'multipart/form-data',                
            }

        }).then((response)=>{
            if(response.status == 200){
                toast.current.show({severity: 'info', summary: 'Success', detail: 'Extra files uploaded successfully'});
                props.Extra_assessment_files(true)
            }
        })
    }

    const upload_specific_extra_docs = (form_data) => {
        axios({
            method : 'POST',
            data:form_data,
            url : 'http://localhost:8000/UploadSpecificFiles',
            headers : {
                'content-type' : 'multipart/form-data',
            }
        }).then((Response)=>{
            if(Response.status == 200){
                toast.current.show({severity: 'info', summary: 'Success', detail: 'Extra files uploaded successfully'});
                setTimeout(()=>{
                    props.Add_Specific_files_switch()
                },1000)
            }
        })
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '10vw'}}>
                    {/* <img alt={file.name} role="presentation" src={file.objectURL} width={100} /> */}
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                {/* <Tag value={props.formatSize} severity="warning" className="px-3 py-2" /> */}
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Files Here</span>
            </div>
        )
    }

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            console.log(base64data);
        }
    }

    const progressBarTemplate = (e) => {
        return (
            <div>
                <ProgressBar style = {{height : 20}} className = "p-progressbar-value" value = {uploaded_size*100}/>
            </div>
        )
    }

    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload',
     iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <div className="card">
              
                <FileUpload ref={fileUploadRef} customUpload = {true} style = {{width : '50vw'}} name="demo[]" url={'http://localhost:8000/Upload_reports'} multiple accept="pdf/*" maxFileSize={1000000000}
                    onUpload={onUpload} progressBarTemplate = {progressBarTemplate} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                    uploadHandler = { ({files})=>{
                        
                        if(props.type && !props.specific_extra_files ){
                            const form_data = new FormData()
                            for(let i =0; i<files.length; i++){
                                form_data.append('doc '+i , files[i])
                            }
                            form_data.append('id' , props.id)
                            upload_other_docs(form_data)
                        } else if (!props.type && !props.specific_extra_files) {
                            const form_data = new FormData()
                            for(let i = 0; i<files.length; i++){
                                console.log(files[i])
                                let name_list = (files[i].name).split('')
                                let computed_name = (name_list.slice(0,(name_list.length-10)).join('')).replace('-',' ')
                                let computed_passcode = (name_list.slice(name_list.length-9 , name_list.length-4)).join('')
                                // console.log(computed_name.replace('-',' '))
                                // compiled.push()
                                form_data.append(computed_name , files[i])
                                form_data.append(computed_name + ' Passcode' , computed_passcode)
                                // form_data.append(computed_name ,{Name : computed_name , Passcode : computed_passcode , File : files[i] })
                            }
                            form_data.append('id' , props.id)
                           
                            upload(form_data)
                        } else if (!props.type && props.specific_extra_files ){
                            if (files && (props.Students.length > 0)){
                                const form_data = new FormData()
                                for(let i =0; i<files.length; i++){
                                    form_data.append('document '+i , files[i])
                                }
                                for(let i=0; i<props.Students.length; i++){
                                    form_data.append(props.Students[i]['Name'] , props.Students[i]['id'])
                                }
                                form_data.append('Assessment_id' , props.id)
                                upload_specific_extra_docs(form_data)
                            } else {
                                toast.current.show({severity: 'info', summary: 'Success', detail: 'No files or Students uploaded . Please select.'});
                            }
                            
                        }
                      
                        // console.log(files[0].name)
                    }}
                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} uploadOptions = {uploadOptions} cancelOptions={cancelOptions} />

               
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    Add_Specific_files_switch : ()=>dispatch({type: 'SFS'}),
    Reports_upload : (bool) => dispatch({type : 'Reports_upload' , bool : bool}),
    Extra_assessment_files : (bool) => dispatch({type : 'Extra_assessment_files' , bool : bool}),
})

export default connect(mapStateToProps , mapDispatchToProps)(File_upload)
                 