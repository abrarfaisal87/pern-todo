import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      window.location="/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="mt-10 mb-4 text-center text-4xl">TaskTidy</h1>
      <form
        className="mt-5 flex flex-row justify-center items-center"
        onSubmit={submitForm}
      >
        <input
          className="w-[560px] outline-none border-none 
           bg-gray-300 p-2 rounded-l-md hover:shadow-md
            hover:shadow-gray-300 text-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add your task"
          type="text"
        />
        <button className="w-16 p-2 hover:shadow-sm hover:shadow-green-600 rounded-r-md bg-green-600 text-white">
          Add
        </button>
      </form>
    </>
  );
};

export default InputTodo;
