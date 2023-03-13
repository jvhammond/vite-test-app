import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todos'

function App() {
  const [todos, setTodos] = useState([])
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const todoNameRef = useRef()


  useEffect(()=>{
    setLoading(true)
    fetch('https://randomuser.me/api')
      .then(response => {
        if (response.ok){
          return response.json()
        }
        else {
          throw response
        }
      })
      .then(data => {
        console.log('setting data')
        console.log('data: ' + JSON.stringify(data))
        console.log('data: ' + data?.results[0]?.name?.first)
        setData(data)
      })
      .catch(error => {
        console.log('error: ' + error)
        setError(error)
      })
      .finally(()=>{
        setLoading(false)
      })
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(todos)
  }, [])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    let found = newTodos.find(element => element.id === id);
    console.log('jhammond')
    console.log(found)
    found.completed = !found.completed

    setTodos(newTodos)
  }


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
      <div>
        {loading ? 'Loading...' : 'hello ' + data?.results[0]?.name?.first}
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button>Clear Todo</button>
      <div>{todos.filter(todo => !todo.completed).length} left todo</div>
    </>
  )
}

export default App
