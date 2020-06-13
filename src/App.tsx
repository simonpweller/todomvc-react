import React from "react";
import Todo from "./Todo";
import Header from "./Header";
import TodoCount from "./TodoCount";
import ClearCompletedButton from "./ClearCompletedButton";
import { v4 as uuid } from "uuid";
import useLocalStorage from "./useLocalStorage";
import { NavLink, useParams } from "react-router-dom";

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useLocalStorage<Array<TodoItem>>("todos", []);
  const { filter } = useParams();

  const hasTodos = todos.length > 0;
  const anyCompleted = todos.some((todo) => todo.completed);
  const allCompleted = todos.every((todo) => todo.completed);
  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = filter
    ? todos.filter((todo) =>
        filter === "completed" ? todo.completed : !todo.completed
      )
    : todos;

  const addTodo = (todoText: string) => {
    setTodos([...todos, { id: uuid(), text: todoText, completed: false }]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const updateTodoItem = (todoItem: TodoItem) => {
    const nextTodos = [...todos];
    const todoItemIndex = todos.findIndex((todo) => todo.id === todoItem.id);
    nextTodos.splice(todoItemIndex, 1, todoItem);
    setTodos(nextTodos);
  };

  const deleteCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const toggleAll = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  return (
    <>
      <section className="todoapp">
        <Header addTodo={addTodo} />
        <section
          className="main"
          style={{ display: hasTodos ? "block" : "none" }}
        >
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={toggleAll}
            checked={allCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {visibleTodos.map((todoItem) => (
              <Todo
                key={todoItem.id}
                todoItem={todoItem}
                toggleCompleted={toggleCompleted}
                updateTodoItem={updateTodoItem}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </section>
        <footer
          className="footer"
          style={{ display: hasTodos ? "block" : "none" }}
        >
          <TodoCount count={activeTodoCount} />
          <ul className="filters">
            <li>
              <NavLink exact to={"/"} activeClassName="selected">
                All
              </NavLink>
            </li>
            <li>
              <NavLink to={"/active"} activeClassName="selected">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to={"/completed"} activeClassName="selected">
                Completed
              </NavLink>
            </li>
          </ul>
          {anyCompleted && <ClearCompletedButton onClick={deleteCompleted} />}
        </footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        <p>
          Created by <a href="https://www.sweller.de">Simon Weller</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
