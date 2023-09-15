import { useState, useRef } from 'react'
import { useTodoStore } from '../store/todos'
import { type Todo } from '../types'
export const useTodoItem = (item: Todo) => {
  const [isEditable, setIsEditable] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const updateTodo = useTodoStore(state => state.updateTodo)
  const deleteTodo = useTodoStore(state => state.deleteTodo)

  const handleIsEditable = () => {
    setIsEditable(!isEditable)
  }

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    updateTodo(item._id, {
      name: e.target.value,
      isCompleted: item.isCompleted
    })
    setIsEditable(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      console.log(inputRef?.current?.value)
      updateTodo(id, {
        name: inputRef?.current?.value ?? '',
        isCompleted: item.isCompleted
      })
      setIsEditable(false)
    }
  }

  const handleIsCompleted = (id: string) => {
    updateTodo(id, { name: item.name, isCompleted: !item.isCompleted })
  }

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id)
  }
  return {
    isEditable,
    handleIsEditable,
    handleOnBlur,
    handleKeyDown,
    handleIsCompleted,
    inputRef,
    handleDeleteTodo
  }
}
