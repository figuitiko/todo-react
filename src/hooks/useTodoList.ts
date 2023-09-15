import { useEffect, useState } from 'react'
import { useTodoStore } from '../store/todos'

export const useTodoList = () => {
  const todoList = useTodoStore((state) => state.todoList)
  const isLoading = useTodoStore((state) => state.isLoading)
  const error = useTodoStore((state) => state.error)
  const limit = useTodoStore((state) => state.limit)
  const page = useTodoStore((state) => state.page)
  const total = useTodoStore((state) => state.total)
  const addTodo = useTodoStore((state) => state.addTodo)
  const getSkipped = useTodoStore((state) => state.getSkipped)
  const fetchTodos = useTodoStore((state) => state.fetchTodos)
  const [isNew, setIsNew] = useState(false)
  const handleSetNew = () => {
    setIsNew(!isNew)
  }

  const handleAddTodoEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo({
        name: e.currentTarget.value,
        isCompleted: false
      })
      e.currentTarget.value = ''
      setIsNew(false)
    }
  }

  const handleAddTodoOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    addTodo({
      name: e.currentTarget.value,
      isCompleted: false
    })
    e.currentTarget.value = ''
    setIsNew(false)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    total,
    todoList,
    isLoading,
    error,
    limit,
    page,
    getSkipped,
    fetchTodos,
    isNew,
    handleSetNew,
    handleAddTodoEnter,
    handleAddTodoOnBlur
  }
}
