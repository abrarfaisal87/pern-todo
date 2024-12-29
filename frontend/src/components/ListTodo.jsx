import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);


  const deleteTodo =async (id)=>{
     try {
      const deleteTodo =  await fetch(`http://localhost:5000/todos/${id}`,{
        method:"DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id));
     } catch (error) {
      console.log(error.message)
     }
  }


  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  
  console.log(todos);

  return (
    <>
      <table className="mt-2 mx-auto text-center p-5 w-[640px] border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300 rounded-l-md">Description</th>
            <th className="p-2 border border-gray-300">Edit</th>
            <th className="p-2 border border-gray-300 rounded-r-md">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id} className="hover:bg-gray-100 transition-colors duration-200 border-b border-gray-300">
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo}/>
              </td>
              <td>
                <button className="px-4 py-2 w-16 text-xs text-white bg-red-500 rounded-lg
                 hover:bg-red-600 transition-colors  duration-200" 
                 onClick={()=>deleteTodo(todo.todo_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
