import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todos'

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
  const todoNameRef = useRef()

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(todos)
  }, [])

  const addTodo = (e) => {
    const name = todoNameRef.current.value
    const id = uuidv4()
    if (name === '') return
    console.log(name)
    setTodos(prevTodos=>{
      return [...prevTodos, {id, name, completed:false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
      <TodoList todos={todos}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button>Clear Todo</button>
      <div>{todos.length} left todo</div>
    </>
  )
}

export default App
