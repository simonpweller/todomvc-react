import React, { useEffect, useRef, useState } from "react";
import { TodoItem } from "./TodoList";

type TodoProps = {
  todoItem: TodoItem;
  toggleCompleted: (id: string) => void;
  updateTodoItem: (todoItem: TodoItem) => void;
  deleteTodo: (id: string) => void;
};

const Todo = ({
  todoItem,
  toggleCompleted,
  updateTodoItem,
  deleteTodo,
}: TodoProps) => {
  const input = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedText, setEditedText] = useState(todoItem.text);
  const finishEditing = () => {
    setIsEditMode(false);
    if (editedText.trim().length > 0) {
      updateTodoItem({ ...todoItem, text: editedText.trim() });
      setEditedText(editedText.trim());
    } else {
      deleteTodo(todoItem.id);
    }
  };
  const cancelEditing = () => {
    setIsEditMode(false);
    setEditedText(todoItem.text);
  };

  useEffect(() => {
    if (isEditMode) {
      input?.current?.focus();
    }
  }, [isEditMode]);
  return (
    <li
      className={`${todoItem.completed ? "completed" : ""} ${
        isEditMode ? "editing" : ""
      }`.trim()}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todoItem.completed}
          onChange={toggleCompleted.bind(null, todoItem.id)}
        />
        <label onDoubleClick={setIsEditMode.bind(null, true)}>
          {todoItem.text}
        </label>
        <button
          className="destroy"
          onClick={deleteTodo.bind(null, todoItem.id)}
        />
      </div>
      <input
        className="edit"
        value={editedText}
        ref={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEditedText(e.target.value)
        }
        onBlur={finishEditing}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            finishEditing();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            cancelEditing();
          }
        }}
      />
    </li>
  );
};

export default Todo;
