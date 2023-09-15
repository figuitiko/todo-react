import { usePagination } from '../hooks/usePagination'

const PaginationComponent = () => {
  const { page, pages, handlePage } = usePagination()
  const totalPagesArr = new Array(pages).fill(0).map((_, i) => i)
  return (
    <nav aria-label='Page navigation example' className='mt-8'>
      <ul className='inline-flex -space-x-px text-sm'>
        {
          page !== 1 && (
            <li onClick={() => { handlePage(page - 1) }}>
              <span className='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>Previous</span>
            </li>
          )
        }
        {
          totalPagesArr.map((item) => (
            <li key={item} onClick={() => { handlePage(item + 1) }}>
              <span className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>{item + 1}</span>
            </li>
          ))
        }
        {
          page !== pages && (

            <li onClick={() => { handlePage(page + 1) }}>
              <span className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>Next</span>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default PaginationComponent
