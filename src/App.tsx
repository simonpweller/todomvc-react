import React, { useEffect, useState } from "react";
import { Router } from "director/build/director";
import TodoList from "./TodoList";

function App() {
  const [filter, setFilter] = useState<null | "active" | "completed">(null);
  useEffect(() => {
    const router = new Router({
      "/active": () => setFilter("active"),
      "/completed": () => setFilter("completed"),
      "/": () => setFilter(null),
    });
    router.init();
  }, []);

  return <TodoList filter={filter} />;
}

export default App;
