"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './Pagination';
import Searcher from './Searcher';
import Button from './Button';
import { PencilIcon } from '@heroicons/react/24/solid';
import DeleteClient from './client/Delete';

export default function ClientsList({children, users, token, link} : {children:any, users: any, token: string, link:string}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(10);
  const [length, setLength] = useState(users.length); 
  const [filter, setFilter] = useState(users.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState<string>((160 * Math.ceil(num_rows / 3)).toString());

  useEffect(() => {
    if(search.length === 0){
      setLength(users.length)
      setFilter(users.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = users.filter( (user: any) => user.name.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

  useEffect(() => {
    setHeight((200 * num_rows).toString());
  }, [num_rows])

  const onSearchChange = (value: string) => {
    setCurrentPage(0);
    setSearch(value);
  }

  const IndexPages = [
    {value: 10, text: '10'},
    {value: 25, text: '25'},
    {value: 50, text: '50'},
    {value: 100, text: '100'},
  ]

  return (
    <>
      {/* <div className='flex justify-between flex-wrap-reverse'> */}
      <div className='flex flex-row flex-wrap-reverse justify-between p-1 mb-3'>
        <div className='flex flex-wrap'>
          {children}
          <div className='w-76'>
            <Searcher search={search} searchChange={onSearchChange} placeholder='Buscar cliente' />
          </div>
        </div>
        <Link href={link} >
          <Button styleB='mb-5 md:mt-0 mr-10 w-36 bg-blue-600 text-white hover:bg-blue-500' textB='Nuevo' typeB='button'/>
        </Link>
      </div>
      {/* <div className='flex flex-wrap mt-10' style={{height: `${height}px`}}> */}
      <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  mt-10'>
        {filter.map((client: any) => (
          <div key={client._id} className='mt-2 mx-5'>
            <div className='flex justify-center space-x-2'>
              <p className='font-ligth text-base text-cyan-700 text-center'>{client.name}</p>
              <Link href={`/clients/${client._id}/edit`}>
                <PencilIcon width={20} height={20} className='text-green-500' />
              </Link>
              <DeleteClient client={client} token={token}/>
            </div>
            <Image src={client.logo} alt='logo' width={200} height={200} />
          </div>
        ))}
      </div>

      {/* <div className='flex justify-center items-center mt-3 w-9/12'> */}
      <div className='flex justify-center items-center pb-2 space-y-6'>  
        <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
      </div>
    </>
  )
}