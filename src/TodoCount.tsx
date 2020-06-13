import React from "react";

const TodoCount = ({ count }: { count: number }) => (
  <span className="todo-count">
    <strong>{count}</strong> {count === 1 ? "item" : "items"} left
  </span>
);

export default TodoCount;
