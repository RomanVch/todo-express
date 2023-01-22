import {CorrectTaskT, NewTaskT, TaskSimpleIdT, TaskT, TodoUiT} from "../repository/types";
import {todoDbRepository} from "../repository/todo-db-repository";
import {checkDateWithToday} from "../utils/checkToday";


export const todoService = {
    async getTodos():Promise<TodoUiT> {
     const todos = await todoDbRepository.getTodos()
        const todoForUi:TodoUiT = {}
        todos.forEach((todo)=>{
            const correctTodo:TaskSimpleIdT = {id:""+todo._id,success:todo.success, date:todo.date,priority:todo.priority,task:todo.task,title:todo.title }
            if(checkDateWithToday(todo.date)){
                todoForUi[todo.date] = todoForUi[todo.date]? [...todoForUi[todo.date],correctTodo]:[correctTodo];
            }
        })
        return todoForUi
    },
    async getTodo(id:string):Promise<TaskSimpleIdT|null> {
        const todo = await todoDbRepository.getTodo(id);
        if(!todo){return null}
        return {id,success:todo.success, date:todo.date, priority:todo.priority,task:todo.task,title:todo.title}
    },
    async addTodo(newTask:NewTaskT): Promise<TaskSimpleIdT>{
        const task:TaskT = {
            title: newTask.title,
            task: newTask.task,
            success: false,
            date: newTask.date,
            priority: 3
        }
        return todoDbRepository.addTodo(task)
    },
    async correctTask(correctTask:CorrectTaskT):Promise<TaskSimpleIdT|null> {
        const task = await this.getTodo(correctTask.id)
        if(!task){return null}
        const changestTask = {
            id: task.id,
            title: correctTask.title?correctTask.title:task.title,
            task: correctTask.task?correctTask.task:task.task,
            success: correctTask.success !== null?!!correctTask.success:task.success,
            priority:correctTask.priority ? correctTask.priority:task.priority,
        }
        const checkCorrect = await todoDbRepository.correctTask(changestTask)
        if(!checkCorrect){return null}
        return changestTask as TaskSimpleIdT
        },
/*    async addTask(newTask:NewTaskT): Promise<BlogSimpleIdT>{
        const dateNow = new Date()
        const newBlog:BlogT = {
            name: newTask,
            description: newTask.description,
            websiteUrl: newTask.websiteUrl,
            createdAt:dateNow.toISOString()
        }
        return todoDbRepository.addTodo(newBlog)
    },

    async delTask(id:string){
        return todoDbRepository.delBlog(id)
    }*/
}

