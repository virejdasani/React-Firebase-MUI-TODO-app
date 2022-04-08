import React from "react";
import Todo from "./Todo";
import { useState, useEffect } from "react";
import { Input, Stack, Button } from "@mui/material";
import "./todos.css";
import { auth, db } from "../firebase";

function Todos() {
  const ariaLabel = { "aria-label": "description" };

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("useEffect Hook");
    // get the users collection as each user has their own collection
    db.collection("todos")

      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              todoText: doc.data().todoText,
              timestamp: doc.data().timestamp,
            };
          })
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todoText: input,
      timestamp: new Date().toISOString(),
    });
    setInput("");
  };

  const deleteTodo = (id) => {
    db.collection("todos").doc(id).delete();
  };

  return (
    <div className="todosSection">
      <form>
        <Input
          className="todoInput"
          placeholder="Add a todo"
          inputProps={ariaLabel}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" onClick={addTodo} variant="outlined">
          Add
        </Button>
      </form>

      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todoText={todo.todoText}
            timestamp={todo.timestamp}
            deleteTodo={deleteTodo}
            todoID={todo.id}
          />
        );
      })}
    </div>
  );
}

export default Todos;
