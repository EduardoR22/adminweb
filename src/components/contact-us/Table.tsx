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
      const filtered = contacts.filter( (user: any) => user.name.toLowerCase().includes(search.toLowerCase()));
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
    setHeight(`h-${num_rows * 12}`);
  }, [num_rows])

  return(
    <>
      <div className="flex justify-end mr-10">
        <Searcher search={search} searchChange={onSearchChange} placeholder="Buscar contacto" />
      </div>
      <div className={`flex justify-center mt-10 ${height}`}>
        <table>
          <thead>
            <tr className="border-b border-gray-600 text-gray-400">
              <td className="w-48">Nombre</td>
              <td className="w-32">Telefono</td>
              <td className="w-48">Email</td>
              <td className="w-60">Comentario</td>
              <td className="w-28">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {filter.map((contact:any) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>
                  <p>{contact.email}</p>
                </td>
                <td>{contact.message}</td>
                <td className="pl-3">
                  <ChangeStatus status={contact.statusContact} token={token} idContact={contact._id} />
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