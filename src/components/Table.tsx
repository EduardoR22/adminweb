"use client"

import { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import {ArrowLeftIcon, MagnifyingGlassIcon, CreditCardIcon} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Delete from './Delete';
import Pagination from './Pagination';
import Searcher from './Searcher';

export default function Table({users, token} : {users: any, token: string}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searcher, setSeacher] = useState(<Searcher search={search} setCurrentPage={setCurrentPage} setSearch={setSearch} />)

  const [num_rows, setNumRows] = useState(3);

  const [length, setLength] = useState(users.length); 

  useEffect(() => {
    setSeacher(<Searcher search={search} setCurrentPage={setCurrentPage} setSearch={setSearch} />);
  }, [search])

  //let length:number = users.length;
  const filteredUsers = () => {
    
    if(search.length === 0)
      return users.slice(currentPage, currentPage + num_rows)
      
    const filtered = users.filter( (user: any) => user.name.toLowerCase().includes(search.toLowerCase()));
    setLength(filtered.length);
    //length = filtered.length;
    return filtered.slice(currentPage, currentPage + num_rows)
  }

  // const onSearchChange = ({target}: ChangeEvent<HTMLInputElement> ) => {
  //   setCurrentPage(0);
  //   setSearch(target.value);
  // }

  const IndexPages = [
    {value: 1, text: '1'},
    {value: 2, text: '2'},
    {value: 3, text: '3'},
    {value: 4, text: '4'},
    {value: 5, text: '5'},
  ]

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className='w-2/3'>
          <div className='flex'>
            <Link href={'/'}>
              <ArrowLeftIcon width={30} height={30} className='text-gray-500' />
            </Link>
            {/* <div className='flex rounded-lg items-center ml-2 border border-gray-300'>
              <MagnifyingGlassIcon height={20} width={20} className='text-gray-500' />
              <input className='ml-2 rounded-xl outline-0 outline-none'
                type="text"
                value={search}
                placeholder='Buscar usuario'
                onChange={ onSearchChange}  
              />
            </div> */}
            {/* <Searcher search={search} setCurrentPage={setCurrentPage} setSearch={setSearch} /> */}
            {searcher}
          </div>

          <p className='mt-10 font-semibold'>Usuarios todos</p>

          <table className='mt-5'>
            <thead className='text-gray-400'>
              <tr className='border-b'>
                <th className='w-16 border-b border-slate-400'>Foto</th>
                <th className='w-16 border-b border-slate-400'>Eliminar</th>
                <th className='w-6 text-start border-b border-slate-400'>Nombre / Usuario</th>
                <th className='w-28 border-b border-slate-400'>Perfil / Status</th>
                <th className='w-20 border-b border-slate-400'>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers().map( (user: any) => (
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

          <div className='flex justify-end items-center mt-3 w-9/12'>
            <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                          setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                          length={length}/>
          </div>

        </div>
      </div>
    </>
  )
}