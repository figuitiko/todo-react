import axios from 'axios'
import { type UpdateTodoType, type FetcherResponse, type FetchResponsePaginated } from '../types'
const API_URL = import.meta.env.VITE_API_URL

export const fetchTodosRequest = async (page: number, limit: number): Promise<FetchResponsePaginated | FetcherResponse> => {
  try {
    const result = await axios.get(`${API_URL}/todo?page=${page}&limit=${limit}`)
    return {
      message: result.data.message,
      data: result.data.data
    }
  } catch (err) {
    return {
      message: false,
      data: []
    }
  }
}

export const addTodoRequest = async (todo: UpdateTodoType): Promise<FetcherResponse> => {
  try {
    const result = await axios.post(`${API_URL}/todo`, todo,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return {
      ok: true,
      data: result.data.data
    }
  } catch (err) {
    return {
      ok: false,
      data: []
    }
  }
}

export const updateTodoRequest = async (id: string, todo: UpdateTodoType): Promise<FetcherResponse> => {
  try {
    const result = await axios.put(`${API_URL}/todo/${id}`, { name: todo.name, isCompleted: todo.isCompleted })
    return {
      ok: true,
      data: result.data
    }
  } catch (err) {
    return {
      ok: false,
      data: []
    }
  }
}

export const deleteTodoRequest = async (id: string): Promise<FetcherResponse> => {
  try {
    const result = await axios.delete(`${API_URL}/todo/${id}`)
    return {
      ok: true,
      data: result.data
    }
  } catch (err) {
    return {
      ok: false,
      data: []
    }
  }
}
