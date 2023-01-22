import {errorsValidatorMiddleware} from "../middlewares/errors-middlewares";
import {
    validBodyDate, validBodyNumber,
    validBodyString, validBoolBody, validIdBody
} from "../utils/validators";
import {Router} from "express";
import {todoService} from "../domain/blog-service";
import {NewTaskT} from "../repository/types";
import {todoDbRepository} from "../repository/todo-db-repository";

const todoRouter = Router({});

todoRouter.get('/',
    async (req, res) => {
        const todos = await todoService.getTodos();
        if(Object.keys(todos).length > 0){res.send(todos)}
        else {res.status(404).send([])}
});


todoRouter.post('/addTask',
    validBodyString('title',1,500),
    validBodyString('task',1,500),
    validBodyDate(),
    errorsValidatorMiddleware,
   async (req, res) => {
        const {task,date,title} = req.body;
        const newTask:NewTaskT = {task,date,title}
        const addedTodo = await todoService.addTodo(newTask)

        addedTodo ? res.status(201).send(addedTodo):res.sendStatus(400)
    })
    

    todoRouter.put('/correctTask',
        validIdBody('id'),
    validBodyString('title',1,500).optional(),
    validBodyString('task',1,500).optional(),
    validBodyString('name',1,15).optional(),
        validBodyNumber('priority',1,3).optional(),
        validBoolBody('success').optional(),
        errorsValidatorMiddleware,
    async (req, res) => {
        const {id, title, task, priority, success} = req.body
        const post = await todoService.correctTask({id, title, task, priority, success})
        post ? res.status(200).send(post): res.sendStatus(404)
    })

todoRouter.delete('/deleteAllTodo',
    async (req, res) => {
        await todoDbRepository.delAllTodo()
        res.sendStatus(204)
    })



export default todoRouter