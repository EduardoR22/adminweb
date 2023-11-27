import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { ChangeEvent } from 'react';

export default function Searcher({search, searchChange}: 
  {search:any, searchChange:Function}){

  function onSearchChange({target}: ChangeEvent<HTMLInputElement>){
    searchChange(target.value);
  }

  return(
    <div className='flex rounded-full items-center ml-2 border border-gray-300 py-2'>
      <MagnifyingGlassIcon height={20} width={20} className='text-gray-500 ml-2' />
      <input className='ml-2 rounded-xl outline-0 outline-none'
        type="text"
        value={search}
        placeholder='Buscar usuario'
        onChange={(e) => {searchChange(e.target.value)}}  
      />
    </div>
  )
}