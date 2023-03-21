import React, { Component , useState , useEffect } from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../Styles/Classes.css'
import {Link} from 'react-router-dom'
import { Button } from 'primereact/button';

export const Classes = (props) => {
    const [clicked , setclicked] = useState(false)
    useEffect(()=>{
        console.log(props)
    },[])

    const footer = (Class) => (
        
            <div className = "card-footer">
           {
               clicked ? (
                <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>
               ) : (
                   null
               )
           }
           <Link style = {{
               color : 'transparent'
           }} to = {'/' + props.store.backend.School + '/' + Class} >
                <Button onClick = {
                    () => {
                        setclicked(true)
                        setTimeout(()=>{
                            setclicked(false)

                        },1500)
                    }
                } className = "p-button-raised p-button-secondary" style = {{
                    display : 'flex',
                    backgroundColor : 'transparent',
                    //    width : '30vh',
                    justifyContent : 'space-between',
                    borderColor : 'transparent',
                    borderRadius : 5
                }} label="See assessment" icon="pi pi-chart-line" iconPos="left"  />
           </Link>
          

       </div>

        

    )

    const title = (title) => (
        <div style = {{
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            width : '50vh',
            height : '5vh'
        }}>
            <h4>
                {title}
            </h4>
            <i className="pi pi-fw pi-user" style={{'fontSize': '1.5em'}}></i>
        </div>
    )
    return (
        <div>
            <div className = "class-cards">
                <Card footer = {footer('Senior One')}  title={title('Senior One')} className = {'Class-Card'} style={{ width: '25rem'  }}>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        </p>
                </Card>
                <Card footer = {footer('Senior Two')} title={title('Senior Two')} className = {'Class-Card'} style={{ width: '25rem', marginBottom: '2em' }}>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        </p>
                </Card>
                <Card footer = {footer('Senior Three')}  title={title('Senior Three')} className = {'Class-Card'}  style={{ width: '25rem', marginBottom: '2em' }}>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        </p>
                </Card>
                <Card footer = {footer('Senior Four')}  title={title('Senior Four')} className = {'Class-Card'}  style={{ width: '25rem', marginBottom: '2em'}}>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        </p>
                </Card>
                <Card footer = {footer('Senior Five')}  title={title('Senior Five')} className = {'Class-Card'}  style={{ width: '25rem', marginBottom: '2em'}}>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        </p>
                </Card>
                <Card footer = {footer('Senior Six')}  title={title('Senior Six')} className = {'Class-Card'} style={{ width: '25rem', marginBottom: '2em'  }}>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        </p>
                </Card>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {store : state}
}


const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)
