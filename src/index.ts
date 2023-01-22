import express from "express"
import bodyParser from "body-parser"
import todoRouter from "./routers/todoRouter";
import {runDb} from "./repository/dataBase";
import cors from "cors";

export const app = express()
const port = 3003

const parserMiddleware = bodyParser.json();

app.use(parserMiddleware)
    .use(cors())
    .use("/date", todoRouter)



app.listen(port, async () => {
    await runDb()
    console.log(`Example app listening on port ${port}`)
})