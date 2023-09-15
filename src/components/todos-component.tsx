import { useTodoList } from '../hooks/useTodoList'
import { useTodoItem } from '../hooks/useTodoItem'

interface TodoItemProps {
  name: string
  isCompleted: boolean
  id: string
}

export const TodoItem = ({ id, name, isCompleted }: TodoItemProps) => {
  const { isEditable, inputRef, handleIsEditable, handleKeyDown, handleOnBlur, handleIsCompleted, handleDeleteTodo } = useTodoItem({ _id: id, name, isCompleted })
  return (
    <div id={id} className='flex gap-4  items-center px-8 py-4 border w-full'>
      {
        isEditable
          ? (
            <>
              <span className='cursor-pointer w-[30px]' onClick={() => { handleIsCompleted(id) }} >
                {isCompleted ? '✅' : '❌'}
              </span>
              <input type='text' onDoubleClick={handleIsEditable} ref={inputRef} defaultValue={name} onBlur={handleOnBlur} onKeyDown={(e) => { handleKeyDown(e, id) }} />
            </>
            )
          : (
            <>
              <span className='cursor-pointer' onClick={() => { handleIsCompleted(id) }}>
                {isCompleted ? '✅' : '❌'}
              </span>
              <span className={`${isCompleted && 'line-through'}`} onDoubleClick={handleIsEditable}>
                {name}
              </span>
              <span className='ml-auto cursor-pointer' onClick={() => { handleDeleteTodo(id) }}>
                ➖
              </span>
            </>
            )
      }
    </div>
  )
}

export const TodoList = () => {
  const { total, isNew, handleSetNew, handleAddTodoEnter, handleAddTodoOnBlur, todoList, isLoading } = useTodoList()
  return (
    <div className='flex flex-col w-[300px] h-[412px]'>
      {
        <div className='flex gap-4  items-center px-8 py-4 border w-full'>
          {total} {total === 1 ? 'todo' : 'todos'}
          <span className='ml-auto  cursor-pointer' onClick={handleSetNew}>➕</span>
        </div>
      }
      {
        isLoading
          ? <div>Loading...</div>
          : todoList.map(todo => (
        <TodoItem key={todo._id} name={todo.name} isCompleted={todo.isCompleted} id={todo._id} />
          ))}
      {
        isNew && (
          <div className='flex gap-4 justify-center items-center px-8 py-4 border w-full'>
            <input type='text' placeholder='Enter a new todo...' onKeyDown={handleAddTodoEnter} onBlur={handleAddTodoOnBlur}/>
          </div>
        )
      }
    </div>
  )
}
