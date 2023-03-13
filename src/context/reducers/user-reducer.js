import { SET_USER } from "../actions/action-types";

export default function userReducer(state, action){
    const{user}=action.payload
    let newState={...state}
    switch (action.type){
        case SET_USER:
            if(user.username==='Guest'){
                if(typeof window !=='undefined'){
                window.localStorage.removeItem('user')}
            }else{
                if(typeof window !=='undefined'){
                window.localStorage.setItem('user',JSON.stringify(user))}
                
            }
            newState=user
            
            return newState;
        default:
            return state
    }
}