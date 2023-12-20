"use client"
//import { useRouter } from "next/navigation"
import Searcher from "../Searcher";
import { useState, useEffect } from "react";
import Pagination from "../Pagination";
import ChangeStatus from "./ChangeStatus";

export default function Table({contacts, token}: {contacts:any, token:string}){
  
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(10);
  const [length, setLength] = useState(contacts.length); 
  const [filter, setFilter] = useState(contacts.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState('')

  //const router = useRouter();
  
  useEffect(() => {
    if(search.length === 0){
      setLength(contacts.length)
      setFilter(contacts.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = contacts.filter( (contact: any) => contact.name.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

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

  useEffect(() => {
    setHeight((num_rows * 100).toString());
  }, [num_rows])

  return(
    <>
      <div className="flex justify-end mr-10 mt-5">
        <div className="w-80">
          <Searcher search={search} searchChange={onSearchChange} placeholder="Buscar contacto" />
        </div>
      </div>
      <div className={'mt-10'} style={{height: `${height}px`}}>
        <div className="flex justify-center">
          <table>
            <thead>
              <tr className="border-b border-gray-600 text-gray-400 bg-slate-200">
                <td className="w-48">Nombre</td>
                <td className="w-32 hidden sm:flex">Telefono</td>
                <td className="w-48">Email</td>
                <td className="w-60">Comentario</td>
                <td className="w-28 hidden sm:flex">&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {filter.map((contact:any, index:number) => (
                <tr key={contact._id} className={`${index%2===0? 'bg-white':'bg-slate-200'}`}>
                  <td className="text-xs sm:text-base text-slate-700">{contact.name}</td>
                  <td className="hidden sm:flex sm:items-center text-xs sm:text-base text-slate-700">{contact.phone}</td>
                  <td className="text-xs sm:text-base text-slate-700">
                    <p>{contact.email}</p>
                  </td>
                  <td className="p-1 text-xs sm:text-base text-slate-700">{contact.message}</td>
                  <td className="pl-3 hidden sm:flex">
                    <ChangeStatus status={contact.statusContact} token={token} idContact={contact._id} />
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