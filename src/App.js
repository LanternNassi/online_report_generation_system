// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from 'react-redux'
import Frontend_index from './frontend/Frontend_index';
import Backend_index from './backend/Backend_index'
import Class_assessment from './backend/Components/Class_assessment.js'
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";


function App(props) {
  console.log('executed')
  // if (props.store.overall.frontend){
  //   return (
  //     <Frontend_index/>
  //   );
  // } else {
  //   return (
  //     <Backend_index/>
  //   );

  // }

  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Frontend_index/>}/>
      {/* <Route exact path = "/Sign_up" component = {Sign_up}/> */}
      <Route path = "/School/:School" element = {<Backend_index/>}/>
      {/* <Route path = {"/" + props.store.backend.School + "/:Class"} element = {<Class_assessment/>}/> */}
      <Route path = "/:School/:Class" element = {<Class_assessment/>}/>
      </Routes>
    </BrowserRouter>
  )
  
}

let mapStateToProps = (state) => {
  return {store : state}
}

let mapDispatchToProps = (dispatch) => ({
  create_request_instances : (token) => dispatch({ type : 'create_business_request_instances' , token : token })
})

export default connect(mapStateToProps , mapDispatchToProps)(App);
