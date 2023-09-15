import { deleteTodoRequest, updateTodoRequest, fetchTodosRequest, addTodoRequest } from './../util/request'
import { create } from 'zustand'
import { type UpdateTodoType, type Todo } from '../types'
import { persist, devtools } from 'zustand/middleware'

interface State {
  todoList: Todo[]
  isLoading: boolean
  error: boolean
  limit: number
  page: number
  pages: number
  total: number
  getSkipped: () => number
  fetchTodos: () => Promise<void>
  addTodo: (todo: UpdateTodoType) => Promise<void>
  updateTodo: (id: string, todo: UpdateTodoType) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  setPage: (page: number) => void
  reset: () => void
}
export const useTodoStore = create<State>()(devtools(persist((set, get) => {
  return {
    todoList: [],
    isLoading: false,
    error: false,
    limit: 5,
    page: 1,
    pages: 1,
    total: 0,
    getSkipped: () => {
      return get().limit * (get().page - 1)
    },
    fetchTodos: async () => {
      const { limit, page } = get()
      set({ isLoading: true })
      const result = await fetchTodosRequest(page, limit)
      console.log({ result })
      if (result.ok === false) {
        set({ error: true })
        return
      }
      set({ todoList: result.data.docs })
      set({ pages: result.data.pages })
      set({ total: result.data.total })
      set({ isLoading: false })
    },
    addTodo: async (todo: UpdateTodoType) => {
      const { todoList } = get()
      const result = await addTodoRequest(todo)
      if (result.ok !== false) {
        set({ todoList: [...todoList, result.data] })
      } else {
        set({ error: true })
      }
    },
    updateTodo: async (id: string, todo: UpdateTodoType) => {
      const { todoList } = get()
      const newItems = [...todoList]
      const indexItem = newItems.findIndex((item) => item._id === id)
      newItems[indexItem] = { ...newItems[indexItem], ...todo }
      const result = await updateTodoRequest(id, {
        name: todo.name,
        isCompleted: todo.isCompleted
      })
      if (result.ok !== false) {
        set({ todoList: newItems })
      } else {
        set({ error: true })
        set({ todoList })
      }
    },
    deleteTodo: async (id: string) => {
      const { todoList } = get()
      const restItems = todoList.filter((item) => item._id !== id)
      const result = await deleteTodoRequest(id)
      if (result !== false) {
        set({ todoList: restItems })
      } else {
        set({ error: true })
      }
    },
    setPage: (page: number) => {
      set({ page })
    },
    reset: () => {
      set({
        todoList: [],
        isLoading: false,
        error: false,
        limit: 10,
        page: 1
      })
    }
  }
}, { name: 'todos' })))
