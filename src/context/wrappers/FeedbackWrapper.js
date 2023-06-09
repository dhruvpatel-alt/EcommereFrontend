import React,{useReducer,createContext} from 'react'
import Snackbar from '@mui/material/Snackbar'
import { setSnackbar } from '../actions/feedback-actions'
import feedbackReducer from '../reducers/feedback-reducer'
export const FeedbackContext=createContext()
const FeedbackProvider=FeedbackContext.Provider
export function FeedbackWrapper({children}){

    const [feedback,dispatchFeedback]=useReducer(feedbackReducer,{
        open:false,backgroundColor:'',message:'',
    })
    return(
        <FeedbackProvider value={{feedback,dispatchFeedback}}>
            {children}
        <Snackbar open={feedback.open} message={feedback.message} anchorOrigin={{
            vertical:'top',horizontal:'center'
        }}
        ContentProps={{style:{backgroundColor:feedback.backgroundColor,
        fontSize:'1.25rem'}}} autoHideDuration={6000} onClose={()=>dispatchFeedback(setSnackbar({open:false}))}/>
        </FeedbackProvider>
    )
}