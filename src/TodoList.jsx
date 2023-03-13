import React, {useState} from 'react'
import Todo from './Todo'

export default function TodoList({ todos }) {

  return (
    todos.map((todo =>{
      return (
        <>
        {todo.id}
          <Todo key={todo.id} todo={todo}/>
        </>
      )
    }))
  )
}
