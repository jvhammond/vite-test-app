import React from 'react'

export default function Todo({todo, toggleTodo}) {

  const handleToggleTodo = () => {
    toggleTodo(todo.id)
  }


  return (
    <div>
      <label>
      {todo.name}
        <input onChange={handleToggleTodo} type="checkbox" checked={todo.complete}/>
      </label>
    </div>
  )
}
