import React, { Component , useEffect , useState , useRef } from 'react'
import { connect } from 'react-redux'
// import { Card } from 'primereact/card'
import { TabView, TabPanel } from 'primereact/tabview';
import '../Styles/Class_assessment.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { SlideMenu } from 'primereact/slidemenu'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ScrollPanel } from 'primereact/scrollpanel';
import axios from 'axios'
import { Card } from 'antd';
import  Add_assessment  from './Add_assessment';
import { UNSAFE_enhanceManualRouteObjects, useParams } from 'react-router-dom';
import { saveAs } from "file-saver"
import JSZip from "jszip";
import AddSpecificFiles from './AddSpecificFiles';
import { Dialog } from 'primereact/dialog';
import {Link} from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


const { Meta } = Card;
const zip = new JSZip()

export const Class_assessment = (props) => {
    const [assessment , setassessment] = useState()  
    
    const [card_styles , setcard_styles] = useState({
        width: '20vw',
         marginBottom: '2em' , 
         backgroundColor : '#FF7452'
    })
    const [tabs , settabs] = useState([1 , 2 , 3])
    const [activeIndex2, setActiveIndex2] = useState(0);
    const toast = useRef(null);
    const [active_assessment , setactive_assessment] = useState('Mid Term')
    const [student_specific_files , set_student_specific_files] = useState(null)
    const [Student_modal , setStudent_modal] = useState(false)
   
    const columns = [
        // { field: 'id', header: 'ID' },
        { field: 'Name', header: 'Name' },
        { field: 'Passcode', header: 'Code' },
        { field: 'File', header: 'Report' }
    ];

    const {Class} = useParams()
    
    const [extracted_data , setextracted_data] = useState(
        {
            "data": [
                {"id": "1000","code": "f230fh0g3","image":"plaaa.png","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
                {"id": "1001","code": "nvklal433","image":"plaaa.png","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
                {"id": "1002","code": "zz21cz3c1","image":"plaaa.png","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
                {"id": "1003","code": "244wgerg2","image":"plaaa.png","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
                {"id": "1004","code": "h456wer53","image":"plaaa","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
                {"id": "1005","code": "av2231fwg","image":"plaaa","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
                {"id": "1006","code": "bib36pfvm","image":"plaaa","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
                {"id": "1007","code": "mbvjkgip5","image":"plaaa","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
                {"id": "1008","code": "vbb124btr","image":"plaaa","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
                {"id": "1009","code": "cm230f032","image":"plaaa","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3},
                {"id": "1000","code": "f230fh0g3","image":"plaaa","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
                {"id": "1001","code": "nvklal433","image":"plaaa","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
                {"id": "1002","code": "zz21cz3c1","image":"plaaa","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
                {"id": "1003","code": "244wgerg2","image":"plaaa","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
                {"id": "1004","code": "h456wer53","image":"plaaa","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
                {"id": "1005","code": "av2231fwg","image":"plaaa","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
                {"id": "1006","code": "bib36pfvm","image":"plaaa","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
                {"id": "1007","code": "mbvjkgip5","image":"plaaa","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
                {"id": "1008","code": "vbb124btr","image":"plaaa","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
                {"id": "1009","code": "cm230f032","image":"plaaa","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
            ]
        }
    )
    const items = [
        {
            label : 'Refresh data',
            style : {},
            icon : 'pi pi-chart-line',
            command : ()=> {        
                fetch_assessments(props.store.backend.id , Class)
            }
        } , {
            label : 'Add assessment',
            icon : 'pi pi-upload',
            command : ()=> props.Add_assessment_switch()
        } , {
            label : 'Download assessment',
            icon : 'pi pi-cloud-download',
            
            command : () => downloadAll()
        } , {
            label : 'Delete assessment',
            icon : 'pi pi-fw pi-trash',
            command : ()=> deleteAssessment(active_assessment.id)
        } , {
            label : 'Edit assessment' ,
            icon : 'pi pi-fw pi-pencil',
            items : [
                {
                    label : 'Add Specific Docs' ,
                    icon : 'pi pi-fw pi-pencil',
                    command : () => {
                        props.Add_Specific_files_switch()
                    }
                }
            ]
        } ,{
            Separator : true
        } ,{
            label : 'Archieve assessment',
            icon : 'pi pi-ban'
        }

    ]

    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }
    const showSticky = (Message) => {
        toast.current.show({severity: 'info', closable : false ,summary: 'Active Assessment', detail: 'You have selected ' + Message, sticky: false});
    }
    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      );

   

    const onCellEditComplete = (e) => {
        // if (e.field === "Name"){

        // } else {

        // }
        // let { rowData, newValue, field, originalEvent: event } = e;

        // switch (field) {
        //     case 'quantity':
        //     case 'price':
        //         if (isPositiveInteger(newValue))
        //             rowData[field] = newValue;
        //         else
        //             event.preventDefault();
        //         break;

        //     default:
        //         if (newValue.trim().length > 0)
        //             rowData[field] = newValue;
        //         else
        //             event.preventDefault();
        //         break;
        // }
    }

    const cellEditor = (options) => {
        if (options.field == 'Name' ){
            console.log(options)
            setStudent_modal(true)
            return Specific_File_Viewer(options);
        } else {
            
        }
        
    }

    // function openTab(link) {
    //     window.open(link);
    //   }
    
      const getSpecificDocuments = (name) => {
        axios({
            method : 'GET',
            url : 'http://localhost:8000/GetStudentSpecificFiles/' + active_assessment.id + '/' + name + '/' ,
            data : {}
        }).then((Response)=>{
            if (Response.status == 200){
                set_student_specific_files(Response.data)
            }
        })
      }
    
    const Specific_File_Viewer = (options)=>{
        if(student_specific_files == null){
            getSpecificDocuments(options.value)
        }
        return (
            <Dialog header = {"Specific Documents for " + options.value} visible = {Student_modal} style = {{width : '55vw'}} onHide= {()=>{
                set_student_specific_files(null)
                setStudent_modal(false)
            }}>
                <div>
                    <h4>Report Card</h4>
                    <ol>
                        <li>{extracted_data.data[options.rowIndex]['File']}</li>
                    </ol>
                </div>
                <div>
                    <h4>Assessment Documents</h4>
                    <ol>
                        {
                            student_specific_files != null ? (student_specific_files[0].map((Obj)=>{return(
                                <div>
                                        <li>{Obj.File}</li>
                                </div>
                            )})) : (null)
                        }
                    </ol>
                </div>
                <div>
                    <h4>Student specific Documents</h4>
                    <ol>
                        <li>jdddk</li>
                        <li>mkkskss</li>
                    </ol>
                </div>
            </Dialog>

        )
    }

    
    const fetch_assessments = (id , Class) => {
        axios({
            method : 'GET',
            url : 'http://localhost:8000/Assessment/' + id + '/' + Class + '/',
            // onUploadProgress : (e) => {
            //     setuploaded_size(e.progress)
            // },
            data : {
                
            },
            headers : { 
                'content-type' : 'application/json',                
            }
        }).then((response)=>{
            console.log(response.data)
            setassessment(response.data)
            let first_obj = Object.values(response.data)[0][0]
            showSticky(first_obj.name)
            fetch_reports(first_obj.id)
            setactive_assessment(first_obj)
           
            
        })

    }

    const fetch_reports = (id) => {
        axios({
            method : 'GET',
            url : 'http://localhost:8000/GetReports/' + id + '/',
            data : {
                
            },
            headers : { 
                'content-type' : 'application/json',                
            }
        }).then((response)=>{
           if (response.status === 200){
            console.log(response.data)
            //Configuring urls
           
            setextracted_data({
                'data' : response.data
            })
           }
        })
    }

    const download = (item) => {
        //download single file as blob and add it to zip archive
        return axios.get(item.File, { responseType: "blob" }).then((resp) => {
            zip.file(item.Name, resp.data);
        });
    }

    const downloadAll = () => {
        const arrOfFiles = extracted_data.data.map((item) => download(item)); //create array of promises
        Promise.all(arrOfFiles)
            .then(() => {
                //when all promises resolved - save zip file
                zip.generateAsync({ type: "blob" }).then(function (blob) {
                    saveAs(blob , active_assessment.name+'.zip');
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteAssessment = (id) => {
        axios({
            method : 'GET',
            url : 'http://localhost:8000/DeleteAssessment/' + id + '/',
            data : {},
            headers : { 
                'content-type' : 'application/json',                
            }
        }).then((response)=>{
           if (response.status === 200){
            console.log(response.data)
            fetch_assessments(props.store.backend.id , Class)
            toast.current.show({severity:'error', summary: 'Deleted Successfully', detail:'Assessment successfully deleted', life: 3000});
            }
        })
    }

    useEffect(()=>{
        // console.log(props)
        console.log(props)
        fetch_assessments(props.store.backend.id , Class)

    },[])
    return (
        <div className = "card" style = {{
        }}>
            <Toast ref={toast} />
            <div style = {{
                display : 'flex',
                justifyContent : 'center',
                alignItems : 'center',
            }}>
            
            <h2>Assessment for {Class}</h2>
            </div>
            <div className = "tab-view" >
            
                <TabView activeIndex={activeIndex2} onTabChange={(e) => setActiveIndex2(e.index)} scrollable>
                    {(Object.keys(assessment?(assessment):({}))).map((tab) => {
                        return (
                            <TabPanel header={tab} title = {tab}>
                                <ScrollPanel style = {{
                                    width : '80vw',
                                    height : '40vh'
                                }}>
                                    <div className = "assessment-objects">
                                        {(assessment[tab]).map((obj)=>{
                                            return (
                                               
                                                <Card
                                                    className = {'ass-card'}
                                                    onClick = {
                                                        ()=>{
                                                            showSticky(obj.name)
                                                            fetch_reports(obj.id)
                                                            setactive_assessment(obj)
                                                        }
                                                    }
                                                    hoverable
                                                    style={{
                                                        ...card_styles,

                                                    }}
                                                >
                                                    <Meta title={obj.name} description={obj.extra_information} />
                                                </Card>
                                            //     <Card title={obj.name} style={{ ...card_styles }}>
                                            //     <p className="m-0" style={{lineHeight: '1.5'}}>
                                            //         {obj.extra_information}
                                            //     </p>
                                            // </Card>
                                            )
                                        })}
                                    </div>
                                </ScrollPanel>
                               
                            </TabPanel>
                        )
                    })}
                </TabView>

                <div className = "Actions">
                    <h3>
                       GENERAL ACTIONS
                    </h3>
                    <SlideMenu model={items} viewportHeight={300} menuWidth={800}></SlideMenu>
                </div>

            </div>

            <div className = 'Data-preview'>
                <h3>{active_assessment.name}</h3>
                <div className="card p-fluid">
                <DataTable style = {{width : '100vw'}} paginator first = {10} rows = {10} value={extracted_data.data}  className="editable-cells-table" filterDisplay="row" responsiveLayout="scroll">
                    {
                        columns.map(({ field, header }) => {
                            return <Column key={field} field={field} header={header}  filter sortable style={{ width: '25%' }}
                                editor={(options) => cellEditor(options)} />
                                // onCellEditComplete={onCellEditComplete} 
                        })
                    }
                </DataTable>
            </div>

            </div>
            {
                props.store.backend.Add_assessment_switch ? (
                    <Add_assessment Class = {Class}/>
                ) : (
                    null
                )

            }
            {
                props.store.backend.Add_Specific_files_switch ? (
                    <AddSpecificFiles assessment_id = {active_assessment.id} />
                ) : (
                    null
                )
            }
               
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    Add_assessment_switch : ()=>dispatch({type : 'Add_assessment'}),
    Add_Specific_files_switch : ()=>dispatch({type: 'SFS'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Class_assessment)
