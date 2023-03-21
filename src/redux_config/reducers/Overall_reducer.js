let overall_reducer = (state = {
    frontend : false
} , action) => {
    switch(action.type){
        case "switch_end" :
            return {
                ...state , frontend : action.bool
            }
        default :
            return state
    }

}

export default overall_reducer