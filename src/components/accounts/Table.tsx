"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Delete from '../Delete';
import Pagination from '../Pagination';
import Searcher from '../Searcher';
import Button from '../Button';

export default function Table({children, users, token, link} : {children:any, users: any, token: string, link:string}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(10);
  const [length, setLength] = useState(users.length); 
  const [filter, setFilter] = useState(users.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState<string>(((60 * num_rows) + 50).toString());

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
    setHeight(((60 * num_rows)+ 50).toString());
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
      <div className='flex justify-between'>
        <div className='flex'>
          {children}
          <Searcher search={search} searchChange={onSearchChange} placeholder='Buscar usuario' />
        </div>
        <Link href={link} >
          <Button styleB='mr-10 bg-blue-600 text-white hover:bg-blue-500' textB='Nuevo' typeB='button'/>
        </Link>
      </div>
      
      <p className='mt-10 font-semibold'>Usuarios todos</p>

      <div className='' style={{height: `${height}px`}}>
        <table className='mt-5 w-11/12'>
          <thead className='text-gray-400'>
            <tr className='border-b'>
              <th className='w-16 border-b border-slate-400'>Foto</th>
              <th className='w-20 border-b border-slate-400'>Eliminar</th>
              <th className='w-28 text-start border-b border-slate-400'>Nombre / Usuario</th>
              <th className='w-28 text-start border-b border-slate-400'>Perfil / Status</th>
            </tr>
          </thead>
          <tbody>
            {filter.map( (user: any) => (
              <tr key={user._id} className=''>
                <td className='pt-3'>
                  <Link href={`/users/${user._id}/details`}>
                    {user.photo? 
                        <Image src={user.photo} alt={user.name.split(' ')[0]} width={50} height={40} className='rounded-full' /> 
                        : <p>{user.name.split(' ')[0]}</p>}
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
              </tr>
            ) )}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center mt-3 w-9/12'>
        <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
      </div>
    </>
  )
}