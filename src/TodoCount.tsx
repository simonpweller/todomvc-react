import React from "react";

const TodoCount = (props: { count: number }) => (
  <span className="todo-count">
    <strong>{props.count}</strong> {props.count === 1 ? "item" : "items"} left
  </span>
);

export default TodoCount;
