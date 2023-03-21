import React, { Component , useState , useRef } from 'react'
import { connect } from 'react-redux'
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Styles/Frontend.css'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Sign from '../authentication/Sign.js'


export const Frontend_index = (props) => {
    const [clicked , setclicked] = useState(false)
    const [visible, setVisible] = useState(false);
    const [passcode , setpasscode] = useState('');
    const toast = useRef(null);

    const pdf_merger = (pdfs , Name , assessment_name) => {
        const PDFMerger = require('pdf-merger-js');
        var merger = new PDFMerger();

        (async () => {
            for(let i=0; i<= pdfs.length-1; i++){
                console.log(pdfs[i])
                await merger.add(pdfs[i]);
            }
            // await merger.add('pdf1.pdf');  //merge all pages. parameter is the path to file and filename.
            // await merger.add('pdf2.pdf', 2); // merge only page 2
            // await merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
            // await merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
            // await merger.add('pdf3.pdf', '3 to 5'); //merge pages 3 to 5 (3,4,5)
            // await merger.add('pdf3.pdf', '3-5'); //merge pages 3 to 5 (3,4,5)

            await merger.save(Name+'@'+assessment_name+'.pdf').then((e)=>{setVisible(false)},(reason)=>{alert(reason)}) //save under given name and reset the internal document
            
            // Export the merged PDF as a nodejs Buffer
            // const mergedPdfBuffer = await merger.saveAsBuffer();
            // fs.writeSync('merged.pdf', mergedPdfBuffer);
        })();
    }

    const getReport = () => {
        axios({
            method : 'GET',
            url :'http://localhost:8000/GetReport/' + passcode + '/', 
        }).then(async(Response)=>{
            if (Response.status == 200){
                toast.current.show({ severity: 'info', summary: Response.data['Student_name'] + ' @ ' + Response.data['Assessment_name'], detail: 'Download in progress...', life: 4000 });
                let pdfs = [Response.data['Report']['File']]
                //Pushing assessment extra files
                for(let i=0; i<= Response.data['Assessment_extra_files'].length-1; i++){
                    console.log(Response.data['Assessment_extra_files'][i])
                    pdfs.push(Response.data['Assessment_extra_files'][i]['File'])
                }
                //Pushing students specific files
                for (let i=0; i<=Response.data['Student_specific_files'].length-1; i++){
                    pdfs.push(Response.data['Student_specific_files'][i]['File'])
                }
                await pdf_merger(pdfs,Response.data['Student_name'],Response.data['Assessment_name'])
            } else if (Response.status == 202){
                setVisible(false)
                toast.current.show({ severity: 'warn', summary: 'No content', detail: Response.data['Message'], life: 4000 });
            }
        })
    }

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const message = (Name , assessment) => {
        return (
            <h3>Downloading {assessment} report for {Name}</h3>
        )
    }

    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };
    
    const items  = [
        {label : 'Sign in' , icon: 'pi pi-fw pi-user-plus', 
        command : ()=> {props.Sign_alert_switch()}
    },
        {label : 'Report' , icon : ''},
        // {label : 'Recent assessments' , icon : 'pi pi-fw pi-file'},
        // {label : 'About us' , icon : ''},
        // {label : 'Contact us' , icon : 'pi pi-fw pi-user-plus'}
    ]
    const start = <img alt="logo" style = {{height :'6vh', width : '6vh' , borderRadius : '3vh'}} src="Multix.png" onError={(e) =>{}} height="40" className="mr-2"></img>;
    return (
        <div>
           <Toast ref={toast} />
            <div className = "pic">
                <img alt = {'Background'} src = "intro-bg.jpg" style = {{height : '100vh' , width : '100vw'}}/>
            </div>
            <div className = "opacitor">
                <div className = "intro">
                    {/* <img src = "Multix.png" style = {{ height : '10vh' , width : '10vh' , borderRadius : '5vh' }}/> */}
                    <h2 style = {{color : 'white'}} className = {'text-header'}>Want To access your report online?</h2>

                    <h4 style = {{color : 'white'}} className = {'text-sub'}>This is a service facilitated and maintained by Multix Company </h4>
                    {/* <div className = "buttons"> */}
                    {
                        clicked ? (
                            <span className="p-input-icon-right">
                                <i className={visible ? ("pi pi-spin pi-spinner") : ('')} />
                                <InputText style = {{ textAlign : 'center' }} placeholder="student's passcode " onChange={(e)=>setpasscode(e.target.value)}/>
                            </span>
                            // <InputText onChange={(e)=>setpasscode(e.target.value)}/>
                        ) : (null)
                    }
                        <Button  label={clicked ? ('Generate') : ('Enter code')} onClick = {()=>{
                            if (!clicked){
                                setclicked(true)
                            } else {
                                if (passcode === ''){
                                    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: "Please input your student's passcode", life: 3000 });
                                }else {
                                    getReport()
                                    setVisible(true)
                                }
                                
                            }
                        }} className = {'button'} />

                    {/* </div> */}

                </div>

            </div>
            <div className="card" style = {{ position : 'absolute' , zIndex : 1 , top : 0 , width : '100vw' }}>
                <Menubar model={items} start={start}  />
            </div>
            <ConfirmDialog visible={false} onHide={() => setVisible(false)} message={message('Ntambi' , 'Mid Term 1')}
            header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            {
                props.store.frontend.Sign_alert_switch ? (
                    <Sign/>
                ) : (null)
            }
        </div>
    )
}

const mapStateToProps = (state) => {
 return {store : state}   
}

const mapDispatchToProps = (dispatch) => ({
    Sign_alert_switch : ()=> dispatch({type : 'Sign_alert'}),


})

export default connect(mapStateToProps, mapDispatchToProps)(Frontend_index)