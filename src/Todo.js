import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  } 

export default function Todo({
    index,
    name,
    checked,
    toggleTaskCompleted,
    deleteTask,
    editTask,
  }) {
    const [isEditing, setEditing] = useState(false);
    const wasEditing = usePrevious(isEditing);
    const [newName, setNewName] = useState("");
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    function handleChange(e) {
      setNewName(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      editTask(index, newName);
      setNewName("");
      setEditing(false);
    }
  
    const editingTemplate = (
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={index}>
            New name for {name}
          </label>
          <input
            id={index}
            value={newName}
            className="todo-text"
            type="text"
            onChange={handleChange}
            ref={editFieldRef}
          />
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            onClick={() => setEditing(false)}
          >
            Cancel
            <span className="visually-hidden">renaming {name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {name}</span>
          </button>
        </div>
      </form>
    );
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={index}
            type="checkbox"
            defaultChecked={checked}
            onChange={() => toggleTaskCompleted(index)}
          />
          <label className="todo-label" htmlFor={index}>
            {name}
          </label>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn"
            onClick={() => setEditing(true)}
            ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => deleteTask(index)}
          >
            Delete <span className="visually-hidden">{name}</span>
          </button>
        </div>
      </div>
    );
  
    useEffect(() => {
        if (!wasEditing && isEditing) {
          editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
          editButtonRef.current.focus();
        }
      }, [wasEditing, isEditing]);
  
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
  }