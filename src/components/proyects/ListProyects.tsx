"use client"
import { useState } from "react"
import Searcher from "../Searcher"
import Pagination from "../Pagination";
import Image from "next/image";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import ViewProyect from "./ViewProyect";

export default function ListProyects(){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(3);
  //const [length, setLength] = useState(users.length); 
  //const [filter, setFilter] = useState(users.slice(currentPage, currentPage + num_rows));

  const onSearchChange = (value: string) => {
    setSearch(value);
  }
  
  return(
    <div className="flex mt-5">
      <div className="w-2/3">
        <div className="flex">
          <div className="w-1/3"><Searcher search={search} searchChange={onSearchChange} /></div>
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
            <tr>
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
                  <p className="text-gray-800">Honda Celaya Gto</p>
                  <p className="text-gray-400">45,000 m2</p>
                </div>
              </td>
              <td>
                <div>
                  <p className="text-gray-800">2023</p>
                  <p className="text-gray-400">Celaya Gto</p>
                </div>
              </td>
              <td><Image src={'/foto'} alt="photo" width={30} height={30} /></td>
            </tr>
          </tbody>
        </table>
        {/* <Pagination currentPage={currentPage}/> */}
      </div>
      <div className="w-1/3">
        <ViewProyect width="w-full" />
      </div>
    </div>
  )
}