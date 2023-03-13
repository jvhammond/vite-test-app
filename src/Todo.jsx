import React from 'react'

export default function Todo({todo}) {
  return (
    <div>
      <label>
      {todo.name}
        <input onChage={()=>{}} type="checkbox" checked={todo.complete}/>
      </label>
    </div>
  )
}
