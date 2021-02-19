import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    type todoListsType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "active"},
    ])

    type TaskType = {
        id: string
        title: string
        isDone : boolean
    }

    type tasksObjType = {
        [key: string] : Array<TaskType>
    }

    let [tasksObj, setTasksObj] = useState<tasksObjType>({
        [todoListId1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId1] : [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},

        ]
    })


    function removeTask(id: string, todoListId:string) {
        let task = tasksObj[todoListId]
        let filteredTasks = task.filter(t => t.id != id);
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todoListId:string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasksObj];
        setTasksObj(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId:string) {
        let task = tasksObj.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasksObj([...tasksObj]);
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let findTodoList = todoLists.find(tl => tl.id === todoListId)
        if(findTodoList){
            findTodoList.filter = value
            setTodoLists([...todoLists])
        }
    }


    return (
        <div className="App">

            {todoLists.map(tl => {

                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })

            }


        </div>
    );
}

export default App;
