import { AnyAction } from "@reduxjs/toolkit";
import { Add_Todo,Delete_Todo, Edit_Todo } from "../types/todo_types";

export interface Todo{
    id:number,
    task:string,
    date:string,
    note:string,
    status:string
}



const initialState: Todo[] = [];


const todosReducer=(state=initialState,action:AnyAction):Todo[]=>{

    switch(action.type){
        case Add_Todo:
            console.log("Adding")
            return [...state,action.payload];
        case Delete_Todo:
            console.log("Deleting")
            let updatedTodos=state.filter(item=>item.id !== action.payload);
            console.log(updatedTodos)
            return updatedTodos
        case Edit_Todo:
            console.log("Editing")
            let editedTodos=state.map(todo=>{
                if(todo.id===action.payload.id){
                    return(
                        {id:action.payload.id,
                        task:action.payload.task,
                        date:action.payload.date,
                        note:action.payload.note,
                        status:action.payload.status})
                }
                else{
                    return todo
                }
            })
            console.log(editedTodos);
            return editedTodos
        default:
            return state
    }
}

export default todosReducer;