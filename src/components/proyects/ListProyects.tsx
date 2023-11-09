"use client"
import { useState, useEffect } from "react"
import Searcher from "../Searcher"
import Pagination from "../Pagination";
import Image from "next/image";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import ViewProyect from "./ViewProyect";
import Button from "../Button";
import Link from "next/link";

export default function ListProyects({proyects, token}: {proyects: any, token: string}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(3);
  const [length, setLength] = useState(proyects.length); 
  const [filter, setFilter] = useState(proyects.slice(currentPage, currentPage + num_rows));

  useEffect(() => {
    if(search.length === 0){
      setLength(proyects.length)
      setFilter(proyects.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = proyects.filter( (proyect: any) => proyect.name.toLowerCase().includes(search.toLowerCase()));
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
  
  const [viewProyect, setViewProyect] = useState(<></>)
  
  const changeProyect = (value: any) =>{
    setViewProyect(<ViewProyect width="w-full" proyect={value} token={token} />);
  }
  
  return(
    <div className="flex mt-5">
      <div className="w-2/3">
        <div className="flex justify-between">
          <div className="w-1/3"><Searcher search={search} searchChange={onSearchChange} /></div>
          <Link href='/proyects/new'>
            <Button textB="Nuevo" typeB="Button" styleB="text-white bg-blue-600 hover:bg-blue-500 mr-10" />
          </Link>
        </div>
        <table className="mt-5">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-500">
              <th className="w-20">Usr</th>
              <th className="w-20">Activo</th>
              <th className="w-56 text-left">Proyecto / Caracteristica</th>
              <th className="w-40 text-left">Año / Ubicacion</th>
              <th className="w-20 text-left">Foto</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((proyect: any) => (
              <tr key={proyect._id} onClick={() =>changeProyect(proyect)} className="cursor-pointer">
                <td>
                  <div className="flex justify-center">
                    <Image src={'/pro'} alt="profile" width={30} height={30} />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center items-center text-green-600">
                    <EllipsisHorizontalCircleIcon width={40} height={25} />
                  </div>
                </td>
                <td>
                  <div>
                    <p className="text-gray-800">{proyect.title}</p>
                    <p className="text-gray-400">{proyect.subtitle}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p className="text-gray-800">2023</p>
                    <p className="text-gray-400">{proyect.address}</p>
                  </div>
                </td>
                <td><Image src={proyect.images[0]} alt="photo" width={30} height={30} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-5 justify-center items-center">
          <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
        </div>
      </div>
      <div className="w-1/3">
        {/* <ViewProyect width="w-full" /> */}
        {viewProyect}
      </div>
    </div>
  )
}