"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {CreditCardIcon} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Delete from './Delete';
import Pagination from './Pagination';
import Searcher from './Searcher';
import Button from './Button';

export default function Table({children, sliders, token, link} : {children:any, sliders: any, token: string, link:string}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(3);
  const [length, setLength] = useState(sliders.length); 
  const [filter, setFilter] = useState(sliders.slice(currentPage, currentPage + num_rows));

  useEffect(() => {
    if(search.length === 0){
      setLength(sliders.length)
      setFilter(sliders.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = sliders.filter( (user: any) => user.name.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

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
          <Searcher search={search} searchChange={onSearchChange} placeholder='Buscar slider' />
        </div>
        <Link href={link} >
          <Button styleB='mr-10 bg-blue-950 text-white hover:bg-blue-500' textB='Nuevo' typeB='button'/>
        </Link>
      </div>
      <table className='mt-5'>
        <thead className='text-gray-400'>
          <tr className='border-b'>
            <th className='w-16 text-start border-b border-slate-400'>Foto</th>
            <th className='w-8 text-start border-b border-slate-400'>&nbsp;</th>
            <th className='w-48 text-start border-b border-slate-400'>Titulo</th>
            <th className='w-56 text-start border-b border-slate-400'>Descripcion</th>
            <th className='w-40 text-start border-b border-slate-400'>imagen</th>
          </tr>
        </thead>
        <tbody>
          {filter.map( (slider: any) => (
            <tr key={slider._id}>
              <td>
              <Image src={slider.images} alt='profile' width={50} height={40} className='rounded-full' />
                {/* <Link href={`/users/${user._id}/details`}>
                  <Image src={user.photo} alt='profile' width={50} height={40} className='rounded-full' />
                </Link> */}
              </td>
              <td> 
                <div className=' flex justify-center'>
                  {/* <Delete token={token} user={user} /> */}
                  <div className={`w-4 h-4 rounded-full ${slider.status ? 'bg-green-600' : 'bg-red-600'} mr-2`}></div>
                </div>
              </td>
              <td>
                <div>
                  <p>{slider.title}</p>
                </div>
              </td>
              <td>
                <div className='flex items-center'>
                  <p>{slider.description}</p>
                </div>
              </td>
              <td>
                <div className=''>
                  <Link href={`/sliders/${slider._id}`}>
                    <Image 
                      src={slider.images}
                      alt='imagen'
                      width={60}
                      height={30}
                    />
                  </Link>
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