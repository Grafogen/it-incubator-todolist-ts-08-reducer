import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    Paper,
    Typography
} from "@mui/material";
import ButtonGroupContext from "@mui/material/ButtonGroup/ButtonGroupContext";
import {Delete, Favorite, FavoriteBorder, HighlightAlt, HighlightOff, } from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <Typography variant={"h5"} fontWeight={'bold'}> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    // @ts-ignore
                    return(

                        <Paper sx={{m: '5px'}} elevation={1}><ListItem key={t.id} className={t.isDone ? "is-done" : ""} sx={{padding: '0'}}>

                            <Checkbox onChange={onChangeHandler} checked={t.isDone}
                                      icon={<FavoriteBorder color={'error'}/>}
                                      checkedIcon={<Favorite color={'error'}/>}/>
                            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={onClickHandler}>
                                    <HighlightOff color={'error'}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem></Paper>

                    )})
            }
        </List>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                    variant={props.filter === 'all' ?'contained': 'outlined'} color={'secondary'} size={'small'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button
                    variant={props.filter === 'active' ?'contained': 'outlined'} color={'secondary'} size={'small'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                    variant={props.filter === 'completed' ?'contained' : 'outlined'} color={'secondary'} size={'small'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


