"use client"
import { useRouter } from "next/navigation"
import Searcher from "../Searcher";
import { useState, useEffect } from "react";
import Pagination from "../Pagination";

export default function Table({contacts}: {contacts:any}){
  
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(3);
  const [length, setLength] = useState(contacts.length); 
  const [filter, setFilter] = useState(contacts.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState('')

  const router = useRouter();
  
  useEffect(() => {
    if(search.length === 0){
      setLength(contacts.length)
      setFilter(contacts.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = contacts.filter( (user: any) => user.name.toLowerCase().includes(search.toLowerCase()));
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

  useEffect(() => {
    setHeight(`h-${num_rows * 12}`);
    console.log(num_rows * 12);
  }, [num_rows])

  return(
    <>
      <div className="flex justify-end mr-10">
        <Searcher search={search} searchChange={onSearchChange} />
      </div>
      <div className={`flex justify-center mt-10 ${height}`}>
        <table>
          <thead>
            <tr className="border-b border-gray-600 text-gray-400">
              <td className="w-12">Leido</td>
              <td className="w-44">Nombre</td>
              <td className="w-28">Telefono</td>
              <td className="w-20">Id</td>
              <td className="w-56">Comentario</td>
            </tr>
          </thead>
          <tbody>
            {filter.map((contact:any) => (
              <tr key={contact._id} className="cursor-pointer" 
                onClick={() => router.push(`/contacts/${contact._id}`)}>
                <td>
                  <div className="flex justify-center items-center">
                    <div className="rounded-full bg-green-700 w-4 h-4"></div>
                  </div>
                </td>
                <td>falta el nombre</td>
                <td>falta el telefono</td>
                <td>
                  <div>
                    <p>{contact.idChat}</p>
                    <p className="text-gray-400 text-xs">{contact.date.substring(0,10)}</p>
                  </div>
                </td>
                <td>{contact.messages[0].message}</td>
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