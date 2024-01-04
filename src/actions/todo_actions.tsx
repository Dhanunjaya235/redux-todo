import { Add_Todo,Delete_Todo,Edit_Todo } from "../types/todo_types";
import { Todo } from "../reducers/todo_reducer";

export const addTodo=(todo:Todo)=>{
    return{
        type:Add_Todo,
        payload:todo
    }
}

export const deleteTodo=(id:number)=>{
    return {
        type:Delete_Todo,
        payload:id
    }
}

export const editTodo=(todo:Todo)=>{
    return{
        type:Edit_Todo,
        payload:todo
    }
}