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
  const [num_rows, setNumRows] = useState(3);
  const [length, setLength] = useState(companies.length); 
  const [filter, setFilter] = useState(companies.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState('')

  useEffect(() => {
    if(search.length === 0){
      setLength(companies.length)
      setFilter(companies.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = companies.filter( (user: any) => user.name.toLowerCase().includes(search.toLowerCase()));
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
  ];

  return(
    <>
      <div className="flex justify-between">
        <Searcher search={search} searchChange={onSearchChange} placeholder="Buscar compañia" />
        <Link href={'/companies/new'}>
          <Button styleB="text-white rounded-full bg-blue-950 hover:bg-blue-500" textB="Nuevo" typeB="Button" />
        </Link>
      </div>
      <div className="flex justify-center mt-10">
        <table>
          <thead>
            <tr className="border-b border-gray-600 text-gray-400">
              <td className="w-12">Status</td>
              <td className="w-20">Logo</td>
              <td className="w-56">Nombre</td>
              <td className="w-56">Telefono</td>
              <td className="w-20">Id</td>
              <td className="w-16">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {filter.map((company: any) => (
              <tr key={company._id}>
                <td>
                  <div className="flex justify-center items-center">
                    <div className="rounded-full bg-green-700 w-4 h-4"></div>
                  </div>
                </td>
                <td>
                  <Image src={company.logo} alt="logo" width={50} height={50} />
                </td>
                <td>
                  <div>
                    <p>{company.name}</p>
                    <p className="text-gray-400 text-xs">{company.email}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{company.phoneNumber[0] === undefined? '': company.phoneNumber[0].phone}</p>
                    <p className="text-gray-400 text-xs">{company.address}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>2323</p>
                    <p className="text-gray-400 text-xs">12 oct</p>
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
      <div className='flex justify-center items-center mt-3 w-9/12'>
        <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
      </div>
    </>
  )
}