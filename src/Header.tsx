import React, { ChangeEvent, useState } from "react";

const Header = ({ addTodo }: { addTodo: (todoText: string) => void }) => {
  const [todoText, setTodoText] = useState("");

  function handleSubmit() {
    if (todoText.trim().length > 0) {
      addTodo(todoText.trim());
      setTodoText("");
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        value={todoText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodoText(e.target.value)
        }
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.key === "Enter" && handleSubmit()
        }
        onBlur={handleSubmit}
        placeholder="What needs to be done?"
        autoFocus
      />
    </header>
  );
};

export default Header;
