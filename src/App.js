import { useState } from "react";
import { nanoid } from "nanoid";
export default function App(props) {
  const [list, setList] = useState([
    { index: "todo-0", name: "Eat", checked: true },
    { index: "todo-1", name: "Sleep", checked: false },
    { index: "todo-2", name: "Repeat", checked: false },
  ]);
  function addTask(name){
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setList([...list, newTask]);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <Filters />
      <h2 id="list-heading">{list.length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {list.map((item) => (
          <Todo index={item.index} name={item.name} checked={item.checked} />
        ))}
      </ul>
    </div>
  );
}

function Filters() {
  return (
      <div className="filters btn-group stack-exception">
        <ButtonFilter name="All" press="true" />
        <ButtonFilter name="Active" press="false" />
        <ButtonFilter name="Completed" press="false" />
      </div>

  );
}
function ButtonFilter({ name, press }) {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed={press}>
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

function Form(props) {
  const [name, setName] = useState("");
  function handleChange(e){
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
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

function Todo({ index, name, checked }) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input id={index} type="checkbox" defaultChecked={checked} />
        <label className="todo-label" htmlFor={index}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn">
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button type="button" className="btn btn__danger">
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </li>
  );
}
