"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {CreditCardIcon} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Delete from './Delete';
import Pagination from './Pagination';
import Searcher from './Searcher';
import Button from './Button';

export default function Table({children, users, token, link} : {children:any, users: any, token: string, link:string}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(3);
  const [length, setLength] = useState(users.length); 
  const [filter, setFilter] = useState(users.slice(currentPage, currentPage + num_rows));

  useEffect(() => {
    if(search.length === 0){
      setLength(users.length)
      setFilter(users.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = users.filter( (user: any) => user.name.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage])

  const onSearchChange = (value: string) => {
    setCurrentPage(0);
    setSearch(value);
  }

  const IndexPages = [
    {value: 1, text: '1'},
    {value: 2, text: '2'},
    {value: 3, text: '3'},
    {value: 4, text: '4'},
    {value: 5, text: '5'},
  ]

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex'>
          {children}
          <Searcher search={search} searchChange={onSearchChange} />
        </div>
        <Link href={link} >
          <Button styleB='mr-10 bg-blue-600 text-white hover:bg-blue-500' textB='Nuevo' typeB='button'/>
        </Link>
      </div>
      
      <p className='mt-10 font-semibold'>Usuarios todos</p>

      <table className='mt-5 w-11/12'>
        <thead className='text-gray-400'>
          <tr className='border-b'>
            <th className='w-16 border-b border-slate-400'>Foto</th>
            <th className='w-20 border-b border-slate-400'>Eliminar</th>
            <th className='w-28 text-start border-b border-slate-400'>Nombre / Usuario</th>
            <th className='w-28 text-start border-b border-slate-400'>Perfil / Status</th>
            <th className='w-20 border-b border-slate-400'>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {filter.map( (user: any) => (
            <tr key={user._id}>
              <td>
                <Link href={`/users/${user._id}/details`}>
                  <Image src={user.photo} alt='profile' width={50} height={40} className='rounded-full' />
                </Link>
              </td>
              <td> 
                <div className=' flex justify-center'>
                  <Delete token={token} user={user} />
                </div>
              </td>
              <td>
                <div>
                  <p>{user.name}</p>
                  <p className='text-gray-400'>{user.email}</p>
                </div>
              </td>
              <td>
                <div className='flex items-center'>
                  <div className={`w-4 h-4 ${user.status ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  <p>{user.role}</p>
                </div>
              </td>
              <td>
                <div className='flex justify-center'>
                  <CreditCardIcon width={25} height={25} className='text-gray-300' />
                </div>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>

      <div className='flex justify-center items-center mt-3 w-9/12'>
        <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
      </div>
    </>
  )
}