import {client} from "./dataBase";
import {CorrectTaskT,TaskMongoIdT, TaskSimpleIdT, TaskT} from "./types";
import {InsertOneResult, ObjectId} from "mongodb";

const todoDb = client.db("todo").collection<TaskMongoIdT>("date")

export const todoDbRepository = {
    async getTodos(): Promise<TaskMongoIdT[]> {
        return todoDb.find({}).toArray();
    },
    async getTodo(id:string): Promise<TaskMongoIdT|null> {
        return todoDb.findOne({_id:new ObjectId(id)});
    },
    async getDateTodo(date:string): Promise<TaskMongoIdT[]> {
        return todoDb.find({date}).toArray();
    },
    async addTodo(newTask: TaskT): Promise<TaskSimpleIdT> {
       const task:InsertOneResult  = await client.db("todo").collection("date").insertOne(newTask);
       return {
        title: newTask.title,
        task: newTask.task,
        date: newTask.date,
        success: newTask.success,
        priority: newTask.priority,
        id:""+task.insertedId,
    }
    },
    async correctTask(correctTask: CorrectTaskT): Promise<boolean> {
        const {id, title, task, priority, success}= correctTask;
        const taskDb = await todoDb.updateOne({_id:new ObjectId(id)},{$set: {title, task, priority, success}});
        return taskDb.matchedCount === 1;
    },
    async delAllTodo() {
        await todoDb.deleteMany({})
    },
}

