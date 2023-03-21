let frontend_reducer = (state = {
    Sign_alert_switch : false
} , action) => {
    switch(action.type){
        case 'Sign_alert' :
            return {
                ...state , Sign_alert_switch : state.Sign_alert_switch ? (false) : (true)
            }
        default :
            return state
    }

}

export default frontend_reducer
