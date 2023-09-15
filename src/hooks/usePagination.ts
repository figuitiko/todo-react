import { useTodoStore } from '../store/todos'

export const usePagination = () => {
  const total = useTodoStore(state => state.total)
  const page = useTodoStore(state => state.page)
  const pages = useTodoStore(state => state.pages)
  const fetchTodos = useTodoStore(state => state.fetchTodos)
  const setPage = useTodoStore(state => state.setPage)

  const handlePage = (page: number) => {
    setPage(page)
    fetchTodos()
  }

  return {
    total,
    page,
    pages,
    fetchTodos,
    handlePage
  }
}
