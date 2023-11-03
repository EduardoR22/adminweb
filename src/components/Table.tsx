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
      <div className='flex justify-between flex-wrap'>
        <div className='mt-5'><Image src={'/cr7.jpg'} alt='image' width={300} height={100} /></div>
        <div className='mt-5'><Image src={'/cr7.jpg'} alt='image' width={300} height={100} /></div>
        <div className='mt-5'><Image src={'/cr7.jpg'} alt='image' width={300} height={100} /></div>
        <div className='mt-5'><Image src={'/cr7.jpg'} alt='image' width={300} height={100} /></div>
        <div className='mt-5'><Image src={'/cr7.jpg'} alt='image' width={300} height={100} /></div>
      </div>

      <div className='flex justify-center items-center mt-3 w-9/12'>
        <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
      </div>
    </>
  )
}