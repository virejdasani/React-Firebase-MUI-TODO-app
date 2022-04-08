import React from "react";
import { Card } from "@mui/material";

function Todo({ todoText, todoComplete, deleteTodo, updateTodo, todoID }) {
  return (
    <>
      <Card variant="outlined">
        <p>{todoText}</p>
        <p>{todoComplete}</p>
        <button onClick={() => deleteTodo(todoID)}>Delete</button>
      </Card>
    </>
  );
}

export default Todo;
