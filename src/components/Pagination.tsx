import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid"

export default function Pagination({IndexPages, num_rows, currentPage, setCurrentPage, length, 
        setNumRows}: {IndexPages:any, num_rows:number, currentPage:number, setCurrentPage: Function, 
        length: number, setNumRows: Function}){
            
  function handleChange(event : any){
    setCurrentPage(0);
    setNumRows(parseInt(event.target.value));
  }
 
  function nextPage(){
    if(length > currentPage + num_rows) 
      setCurrentPage(currentPage + num_rows)
  }  

  function previousPage(){
    if(currentPage > 0)
      setCurrentPage(currentPage - num_rows)
  }

  return(
    <>
      <p className='mr-2'>Filas por pag</p>

      <select value={num_rows} onChange={handleChange} className='mr-2'>
        {IndexPages.map((index:any) => (
          <option key={index.value} value={index.value}>
            {index.text}
          </option>
        ))}
      </select>

      <p className='mr-2'>{(currentPage / num_rows) + 1 } de {Math.ceil(length/num_rows)}</p>

      <button className='border border-gray-300 p-1 text-blue-600 hover:bg-gray-200'>
        <ChevronLeftIcon 
          width={20}
          height={20}
          onClick={previousPage}
        />
      </button>

      <button className='border border-gray-300 p-1 text-blue-600 hover:bg-gray-200'>
        <ChevronRightIcon 
          width={20}
          height={20}
          onClick={nextPage}
        />
      </button>
    </>
  )
}