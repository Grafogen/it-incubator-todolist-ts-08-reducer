import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type AddTodolistAT={
    type:'ADD_TODOLIST'
    payload:{
        title:string
        todolistId:string
    },
}
 type RemoveTodolistAT={
    type:'REMOVE_TODOLIST'
     payload:{
         todolistId: string
     }
 }
 export type ChangeTodolistTypeAT={
    type:"CHANGE_TODOLIST-TITLE"
     payload:{
         todolistId: string,
         todolistTitle: string
     }
 }

 export type ChangeTodolistFilter={
    type:'CHANGE_FILTER'
     payload:{
        todolistId:string
         filter:FilterValuesType
     }
 }
 type ActionType=AddTodolistAT|RemoveTodolistAT|ChangeTodolistTypeAT|ChangeTodolistFilter

export const todolistsReducer=(todolists:Array<TodolistType>, action:ActionType):Array<TodolistType>=>{
    switch (action.type){
        case 'ADD_TODOLIST':{
            const {title,todolistId}=action.payload
            let newTodolist: TodolistType = {id: todolistId, title , filter: 'all'};
            return [newTodolist, ...todolists]}

        case 'REMOVE_TODOLIST':{
            const {todolistId}=action.payload
            return todolists.filter(tl => tl.id != todolistId)}

        case "CHANGE_TODOLIST-TITLE": {
            const {todolistId, todolistTitle} = action.payload
            return todolists.map(el => el.id === todolistId ? {...el, title:todolistTitle} : el)
        }

        case "CHANGE_FILTER":{
        const {todolistId, filter} = action.payload
        return todolists.map(el => el.id === todolistId ? {...el, filter} : el)
    }
        default:
            return todolists
    }
}


export const AddTodolistAC = (title:string, todolistId:string):AddTodolistAT=>{
    return {
        type:'ADD_TODOLIST',
        payload:{
            title:title,
            todolistId:todolistId
        }
    }
}

export const RemoveTodolistAC=(todolistId:string):RemoveTodolistAT=>{
    return {
        type:'REMOVE_TODOLIST',
        payload:{
            todolistId:todolistId
        }
    }
}
export const ChangeTodolistTypeAC=(todolistId:string,todolistTitle:string):ChangeTodolistTypeAT=>{
    return {
        type:'CHANGE_TODOLIST-TITLE',
        payload:{
            todolistId: todolistId,
            todolistTitle: todolistTitle
        }
    }
}
