export interface Todo {
  _id: string
  name: string
  isCompleted: boolean
}
export type UpdateTodoType = Pick<Todo, 'name' | 'isCompleted'>
interface RequesType {
  ok: boolean
  data: Todo[] | Todo
}

export type FetcherResponse = ReturnType<typeof RequesType>

export interface FetchResponsePaginated {
  message: string
  data: {
    docs: Todo[]
    total: number
    pages: number
    limit: string
    page: string
  }
}
