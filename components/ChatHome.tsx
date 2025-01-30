"use client";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const ChatHome = () => {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    const confirmDelete: boolean = window.confirm("Delete todo item?");
    confirmDelete && client.models.Todo.delete({ id })
  }

  const { signOut } = useAuthenticator();

  return (
    <div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <h1>My todos</h1>
        <button style={{color: "white", borderRadius: "3px", cursor: "pointer", height: "40px", padding: "0.5rem"}} onClick={signOut}>Sign Out</button>
        </div>
      
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div>{todo.content}</div> <div onClick={() => deleteTodo(todo.id)} style={{ cursor: "pointer", padding: "0.5rem", backgroundColor: "red", borderRadius: "5px"}}>🗑️</div>
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </div>
  );
}

export default ChatHome