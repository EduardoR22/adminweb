"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '../Pagination';
import Searcher from '../Searcher';
import Button from '../Button';

export default function Table({children, sliders, token, link} : {children:any, sliders: any, token: string, link:string}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(10);
  const [length, setLength] = useState(sliders.length); 
  const [filter, setFilter] = useState(sliders.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState<string>((90 * num_rows).toString());

  useEffect(() => {
    if(search.length === 0){
      setLength(sliders.length)
      setFilter(sliders.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = sliders.filter( (slider: any) => slider.title.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

  useEffect(() => {
    setHeight((170 * num_rows).toString());
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
      <div className='flex flex-wrap-reverse justify-between'>
        <div className='flex flex-wrap'>
          {children}
          <div className='w-76'>
            <Searcher search={search} searchChange={onSearchChange} placeholder='Buscar slider' />
          </div>
        </div>
        <Link href={link} >
          <Button styleB='md:mr-5 mb-5 w-36 bg-blue-950 text-white hover:bg-blue-500' textB='Nuevo' typeB='button'/>
        </Link>
      </div>
      <div style={{height: `${height}px`}}>
        <table className='mt-5'>
          <thead className='text-gray-400'>
            <tr className='border-b bg-slate-200'>
              <th className='hidden sm:flex w-16 text-start border-b border-slate-400'>Foto</th>
              <th className='w-8 text-start border-b border-slate-400'>&nbsp;</th>
              <th className='w-20 sm:w-48 text-start border-b border-slate-400'>Titulo</th>
              <th className='w-56 text-start border-b border-slate-400'>Caracteristicas</th>
              <th className='w-40 text-start border-b border-slate-400'>imagen</th>
            </tr>
          </thead>
          <tbody>
            {filter.map( (slider: any, index:number) => (
              <tr key={slider._id} className={`${index%2===0? 'bg-white':'bg-blue-100'}`}>
                <td className='hidden sm:flex'>
                <Image src={slider.user? slider.user.photo : '/images.jpg'} alt={slider.user? slider.user.name.split(' ')[0]: 'user'} width={50} height={40} className='rounded-full' />
                </td>
                <td> 
                  <div className=' flex justify-center'>
                    <div className={`w-4 h-4 rounded-full ${slider.status ? 'bg-green-600' : 'bg-red-600'} mr-2`}></div>
                  </div>
                </td>
                <td>
                  <div>
                    <p className='text-slate-800 text-xs sm:text-base'>{slider.title}</p>
                  </div>
                </td>
                <td>
                  <div className='p-3'>
                    <ul className='list-disc text-slate-700 text-xs sm:text-base'>
                      {slider.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td>
                  <div className=''>
                    <Link href={`/sliders/${slider._id}`}>
                      <img src={slider.image} alt='image' className='w-full' />
                      {/* <Image 
                        src={slider.image}
                        alt='imagen'
                        width={60}
                        height={30}
                      /> */}
                    </Link>
                  </div>
                </td>
              </tr>
            ) )}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center mt-3 w-full sm:w-9/12'>
        <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
      </div>
    </>
  )
}