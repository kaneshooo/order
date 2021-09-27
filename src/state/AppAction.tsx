import { Action } from 'redux';

export const UPDATE_MESSAGE='UPDATE_MESSAGE';

export interface UpdateMessageAction extends Action{
    user:string;
}

export const createUpdateMessageAction=(user:string):UpdateMessageAction=>{
    return {
        user,
        type:UPDATE_MESSAGE,
    }
}