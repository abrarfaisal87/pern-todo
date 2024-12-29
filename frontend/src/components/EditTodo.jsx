import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [description, setDescription] = useState(todo.description);
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 w-16 text-white text-xs
                 bg-blue-500 rounded-lg hover:bg-blue-600 
                 transition-colors duration-200"
      >
        edit
      </button>
      {modalOpen && (
        <div
          className="modal-overlay bg-gray-700 bg-opacity-50
        fixed inset-0 flex justify-center items-center"
        onClick={() => {
          closeModal();
          setDescription(todo.description);
        }}
        >
          <div
            className="model-wrapper bg-white
         p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-lg font-semibold mb-4">Edit Todo</h1>

            <div className="modal-content">
              <input
                className="w-full p-2 border outline-none
             border-gray-300 rounded mb-4"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  closeModal();
                  setDescription(todo.description);
                }}
                className="px-4 py-2 w-16 text-white text-xs
                 bg-red-500 rounded-lg hover:bg-red-600 
                 transition-colors duration-200"
              >
                Close
              </button>
              <button
                className="px-4 py-2 w-16 text-white text-xs
                 bg-green-400 rounded-lg hover:bg-green-600
                 transition-colors duration-200"
                onClick={(e) => updateDescription(e)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
