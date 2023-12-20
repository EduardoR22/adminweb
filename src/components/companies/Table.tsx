"use client"
import Image from "next/image";
import Searcher from "../Searcher";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteCompany from "./DeleteCompany";
import Pagination from "../Pagination";

export default function Table({companies, token}: {companies:any, token:string}){
  
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(10);
  const [length, setLength] = useState(companies.length); 
  const [filter, setFilter] = useState(companies.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState((90 * num_rows).toString())

  useEffect(() => {
    if(search.length === 0){
      setLength(companies.length)
      setFilter(companies.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = companies.filter( (company: any) => company.name.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

  useEffect(() => {
    setHeight((90 * num_rows).toString());
  }, [num_rows]);

  const onSearchChange = (value: string) => {
    setCurrentPage(0);
    setSearch(value);
  }

  const IndexPages = [
    {value: 10, text: '10'},
    {value: 25, text: '25'},
    {value: 50, text: '50'},
    {value: 100, text: '100'},
  ];

  return(
    <>
      <div className="flex flex-wrap-reverse justify-between">
        <div className="w-76">
          <Searcher search={search} searchChange={onSearchChange} placeholder="Buscar compañia" />
        </div>
        <Link href={'/companies/new'}>
          <Button styleB="text-white w-36 mb-5 rounded-full bg-blue-950 hover:bg-blue-500" textB="Nuevo" typeB="Button" />
        </Link>
      </div>
      {/* <div className="mt-10" style={{height:`${height}px`}}> */}
      <div className="mt-10" >
        <div className="flex justify-center">
          <table>
            <thead>
              <tr className="bg-slate-200 border-b border-gray-600 text-gray-400">
                <td className="w-12">Status</td>
                <td className="w-20">Logo</td>
                <td className="w-56">Nombre</td>
                <td className="w-56 hidden sm:flex">Telefono/Direccion </td>
                <td className="w-16">&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {filter.map((company: any, index:number) => (
                <tr key={company._id} className={`${index%2===0? 'bg-white': 'bg-slate-200'}`}>
                  <td>
                    <div className="flex justify-center items-center">
                      <div className="rounded-full bg-green-700 w-4 h-4"></div>
                    </div>
                  </td>
                  <td>
                    <Image src={company.logo} alt="logo" width={50} height={50} />
                  </td>
                  <td>
                    <div className="p-1">
                      <p className="text-sm text-slate-800">{company.name}</p>
                      <p className="text-gray-400 text-xs">{company.email}</p>
                    </div>
                  </td>
                  <td className="hidden sm:flex">
                    <div>
                      <p className="text-sm text-slate-700" >{company.phoneNumber? company.phoneNumber: ''}</p>
                      <p className="text-gray-400 text-xs">{company.address}</p>
                    </div>
                  </td>                  
                  <td>
                    <div className="flex items-center justify-center">
                      <Link href={`/companies/${company._id}/edit`}>
                        <PencilSquareIcon width={30} height={30} className="text-gray-400" />
                      </Link>
                      <DeleteCompany company={company} token={token} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-center items-center mt-3 w-full sm:w-9/12'>
        <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
      </div>
    </>
  )
}