import { useState } from 'react';

export default function TodoItem({ todo, dispatch }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () =>  setIsEditing(true)

    const handleExitEditing = () => setIsEditing(false)

    function handleCheckboxChange() {
        dispatch({ type: "CHECKBOX_TOGGLE", taskId: todo.id });
      }
    
      function handleTodoDelete(task) {
        dispatch({ type: "DELETE_TODO", taskId: todo.id });
      }
    
      function handleEditTextChange(e) {
        dispatch({ type: "EDIT_TEXT", taskId: todo.id, newText: e.target.value });
      }

        return (
            <li style={{
                display: "flex",
                gap: "20px",
                padding: "1rem",
                color: todo.completed ? "darkgray" : "black",
            }}>
                <input type="checkbox" checked={todo.completed} onChange={handleCheckboxChange} />
                {isEditing ? (
                    <>
                         <input type="text" value={todo.text} onChange={handleEditTextChange} />
                         <button onClick={handleExitEditing}>Save</button>
                    </>
                ) : (
                    <span>{todo.text}</span>
                )}
                
                {!isEditing && !todo.completed && (
                    <button onClick={handleEditClick}>Edit</button>
                )}

                {!isEditing && (
                    <button onClick = {handleTodoDelete}>Delete</button> 
                )}

            </li>
        )
}