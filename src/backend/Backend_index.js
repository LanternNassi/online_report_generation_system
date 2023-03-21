import React, { Component , useState} from 'react'
import { Divider } from 'primereact/divider';
import { connect } from 'react-redux'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import Window_dimensions from '../Screen_dimensions.js'
import SideNav , {Toggle , Nav , NavItem , NavIcon , NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Add_student from './Components/Add_student.js'
import Add_teacher from './Components/Add_teacher.js'
import Classes from './Components/Classes.js'
import Multixlogo from '../public/Multix.png'
import './Styles/Backend_index.css'


export const Backend_index = (props) => {
        const { height, width } = Window_dimensions();
        const [add_teacher , set_add_teacher] = useState(false)
        const [extra_files , set_extra_files] = useState(null);
    
        const items = [
        {
            label: 'Sign out',
            icon: 'pi pi-fw pi-sign-out',
        }
    ];

    const start = <img alt="logo" src={Multixlogo} style = {{ height : 40 , width : 40 , borderRadius : 20 }} className="mr-2"></img>;

    const end = <InputText placeholder="Search" type="text" />;
    return (
        <div className = {'bg'}>
            <div className="card">
                <Menubar className = {'banner'} model={items} start={start} end={end} />
            </div>

            <div className = "overall-divisions">
                 {
                    props.store.backend.Classes ? (
                        <Classes/>
                    ) : (
                        null
                    )
                }
               <Divider layout="vertical" />

            </div>

            
        
           
            {   
                props.store.backend.Add_teacher_switch ? (
                    <Add_teacher add_teacher = {add_teacher}/>
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
    close_open_add_teacher_overlay : () => dispatch({type : 'Add_teacher_switch'}),

})

export default connect(mapStateToProps, mapDispatchToProps)(Backend_index)
