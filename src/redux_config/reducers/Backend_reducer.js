let backend_reducer = (state = {
    //Switches for overlays
    Authenticated : false,
    Add_assessment_switch : false,
    Add_teacher_switch : false,
    add_name : '',
    School : '',
    Add_Specific_files_switch : false,
    Classes : true,
    
    // Switches for buttons during assessment addition
    Reports_upload : false,
    Extra_assessment_files : false,

} , action) => {
    switch(action.type){
        case 'Add_teacher_switch' :
            return {
                ...state , Add_teacher_switch : state.Add_teacher_switch ? false : true
            }
        case 'Add_assessment' : 
        return {
            ...state , Add_assessment_switch : state.Add_assessment_switch ? false : true
        }
        case 'Classes' :
            return {
                ...state , Classes : state.Classes ? false : true
            }
        case 'add_name' : 
            return {
                ...state , add_name : action.text
            }
        case 'Authenticate' : 
            return {
                ...state , Authenticated : state.Authenticated ? false : true ,
            }
        case 'SFS' : 
        return {
            ...state , Add_Specific_files_switch : state.Add_Specific_files_switch ? false : true,
        }
        case 'Auth_info' : 
            return {
                ...state , 
                id : action.id,
                School : action.School,
                Passcode : action.Passcode,
            }
        case 'Reports_upload' :
            return {
                ...state,
                Reports_upload : action.bool
            }
        case 'Extra_assessment_files' :
            return {
                ...state,
                Extra_assessment_files : action.bool
            }
        default :
            return state
    }

}

export default backend_reducer
