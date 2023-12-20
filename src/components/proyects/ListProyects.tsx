"use client"
import { useState, useEffect } from "react"
import Searcher from "../Searcher"
import Pagination from "../Pagination";
import Image from "next/image";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import ViewProyect from "./ViewProyect";
import Button from "../Button";
import Link from "next/link";
import { number } from "yup";

export default function ListProyects({proyects, services, token}: {proyects: any, token: string, services:any[]}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(10);
  const [length, setLength] = useState(proyects.length); 
  const [filter, setFilter] = useState(proyects.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState<string>((75 * num_rows).toString());

  useEffect(() => {
    if(search.length === 0){
      setLength(proyects.length)
      setFilter(proyects.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = proyects.filter( (proyect: any) => proyect.title.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

  useEffect(() => {
    setHeight((105 * num_rows).toString());
  }, [num_rows])

  useEffect(() =>{
    setViewProyect(<></>)
  }, [])
  
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
  
  const [viewProyect, setViewProyect] = useState(<></>)
  
  const changeProyect = (value: any) =>{
    setViewProyect(<ViewProyect width="w-full" proyect={value} token={token} services={services} />);
  }
  
  return(
    <div className="flex flex-wrap mt-5">
      <div className="w-full md:w-2/3">
        <div className="flex flex-wrap-reverse justify-between">
          <div className="w-76 space-y-3">
            <Searcher search={search} searchChange={onSearchChange} placeholder="Buscar proyecto" />
          </div>
          <Link href='/proyects/new'>
            <Button textB="Nuevo" typeB="Button" styleB="mb-5 text-white w-36 bg-blue-950 hover:bg-blue-500 mr-10" />
          </Link>
        </div>
        {/* <div style={{height: `${height}px`}}> */}
        <div>  
          <table className="mt-5">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-500 bg-slate-200">
                <th className="w-20">Usr</th>
                <th className="w-20">Activo</th>
                <th className="w-64 text-left">Proyecto / Caracteristica</th>
                <th className="w-44 text-left">Año / Ubicacion</th>
                {/* <th className="w-20 text-left">Foto</th> */}
              </tr>
            </thead>
            <tbody>
              {filter.map((proyect: any, index:number) => (
                <tr key={proyect._id} onClick={() =>changeProyect(proyect)} 
                  className={`${index%2===0? 'cursor-pointer bg-white': 'cursor-pointer bg-blue-100'}`}>
                  <td className="p-0">
                    <div className="flex justify-center m-0">
                      <Image src={proyect.user.photo} alt="profile" width={30} height={30} />
                    </div>
                  </td>
                  <td className="p-0">
                    <div className={`flex justify-center items-center ${proyect.status? 'text-green-600': 'text-red-600'} m-0`}>
                      <EllipsisHorizontalCircleIcon width={40} height={25} />
                    </div>
                  </td>
                  <td className="p-0">
                    <div>
                      <p className="text-gray-800 m-0">{proyect.title}</p>
                      <p className="text-gray-400 m-0">{proyect.subtitle}</p>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="pl-1">
                      <p className="text-gray-800 m-0">{proyect.year? proyect.year: 'Sin año'}</p>
                      <p className="text-gray-400 m-0">{proyect.address}</p>
                    </div>
                  </td>
                  {/* <td><Image src={proyect.images[0]} alt="photo" width={30} height={30} /></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-5 justify-center items-center">
          <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
        </div>
      </div>
      <div className="w-full md:w-1/3 mt-10 md:mt-0">
        {/* <ViewProyect width="w-full" /> */}
        {viewProyect}
      </div>
    </div>
  )
}