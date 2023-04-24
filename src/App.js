import { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.checked,
  Completed: (task) => task.checked,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
  const [list, setList] = useState([
    { index: "todo-0", name: "Eat", checked: true },
    { index: "todo-1", name: "Sleep", checked: false },
    { index: "todo-2", name: "Repeat", checked: false },
  ]);

  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { index: `todo-${nanoid()}`, name, checked: false };
    setList([...list, newTask]);
  }

  function deleteTask(index) {
    const remainingTasks = list.filter((task) => index !== task.index);
    setList(remainingTasks);
  }

  function editTask(index, newName) {
    const editedTaskList = list.map((task) => {
      // if this task has the same ID as the edited task
      if (index === task.index) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setList(editedTaskList);
  }

  function toggleTaskCompleted(index) {
    const updatedList = list.map((task) => {
      // if this task has the same ID as the edited task
      if (index === task.index) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setList(updatedList);
  }

  const filterList = FILTER_NAMES.map((name) => (
    <ButtonFilter key={name} name={name} press={false} setFilter={setFilter}/>
  ));
  const newList = list.filter(FILTER_MAP[filter]);
  const tasklist = newList.map((item) => (
    <Todo
      index={item.index}
      name={item.name}
      checked={item.checked}
      key={item.index}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{newList.length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasklist}
      </ul>
    </div>
  );
}


function ButtonFilter({ name, press, setFilter }) {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed={press} onClick={() => setFilter(name)}>
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

function Form(props) {
  const [name, setName] = useState("");
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") return;
    props.addTask(name);
    setName("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

function Todo({
  index,
  name,
  checked,
  toggleTaskCompleted,
  deleteTask,
  editTask,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

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
        <button type="button" className="btn" onClick={() => setEditing(true)}>
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

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
// but everytime I look at you i just dont care
