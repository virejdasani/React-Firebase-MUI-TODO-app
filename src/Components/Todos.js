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
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser.displayName);

        db.collection(auth.currentUser.uid)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
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
      } else {
        // user logged out
      }
    });
    return () => {
      // cleanup the listener
      unsubscribe();
    };
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection(auth.currentUser.uid).doc(input).set({
      todoText: input,
      timestamp: new Date().toISOString(),
    });
    setInput("");
  };

  const deleteTodo = (id) => {
    try {
      db.collection(auth.currentUser.uid).doc(id).delete();
      console.log("deleted");
    } catch (e) {
      console.log(e);
    }
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
