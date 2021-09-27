import clone from 'clone'
import {Action,Reducer} from 'redux'
import { UpdateMessageAction,UPDATE_MESSAGE } from './AppAction'
import AppState from './AppState'

const initState:AppState={
    user:'',
}

const appReducer:Reducer<AppState>=
    (state:AppState=initState,action:Action)=>{
        let newState=state;
        switch(action.type){
            case UPDATE_MESSAGE:
                {
                    newState=clone(state);
                    const _action=action as UpdateMessageAction;
                    newState.user=_action.user;
                }
                break;
            default:
                break;
        }
        return newState;
    }

    export default appReducer;