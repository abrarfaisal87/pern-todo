import express from "express";
import cors from "cors";
import { pool } from "./config/db.js";

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
//create a todo
app.post("/todos",async(req,res)=>{
    try {
       const {description} = req.body;
       const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description])
       res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})
//get all todos

app.get("/todos",async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }

})

//get a todo
app.get("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo where todo_id = $1",[id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message); 
    }
})
//update a todo
app.put("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {description}= req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 where todo_id = $2",
            [description,id]);
            res.json("todo was updated")
    } catch (error) {
        console.log(error.message); 
    }
})
//delete a todo
app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("todo deleted");
    } catch (error) {
        console.log(error.message)
    }

})

app.listen(5000,()=>console.log(`server running on 5000`));
