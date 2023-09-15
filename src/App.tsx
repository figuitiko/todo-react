import './App.css'
import PaginationComponent from './components/pagination-component'
import { TodoList } from './components/todos-component'

function App (): JSX.Element {
  return (
    <div className='flex flex-col'>
      <TodoList />
      <PaginationComponent />
    </div>
  )
}

export default App
