import todosReducer,{Todo} from "./reducers/todo_reducer";
import {combineReducers} from 'redux';
import { legacy_createStore as createStore} from 'redux'
export interface RootState{
    todos:Todo[]
}

const rootReducer=combineReducers({
    todos:todosReducer
})
// const store=configureStore({
//     reducer:{
//         todos:todosReducer
//     }
// })

const store=createStore(rootReducer)

export default store;