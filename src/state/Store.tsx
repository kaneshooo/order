import { combineReducers,createStore } from "redux";
import IState from "./IState";
import appReducer from "./AppReducer";

const reducers=combineReducers<IState>({
    app:appReducer
})

const store =createStore(reducers)

export default store;