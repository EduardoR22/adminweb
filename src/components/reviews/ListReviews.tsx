"use client"
import { useState } from "react"
import Searcher from "../Searcher"
import Pagination from "../Pagination";
import Image from "next/image";
import { EllipsisHorizontalCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import ViewReview from "./ViewReview";

export default function ListReviews(){
  
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
          <div className="w-1/3"><Searcher search={search} searchChange={onSearchChange} placeholder="Buscar review" /></div>
        </div>
        <table className="mt-5">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-500">
              <th className="w-20">&nbsp;</th>
              <th className="w-20">Estatus</th>
              <th className="w-56 text-left">Nombre / Telefono</th>
              <th className="w-40 text-left">Total reseñas</th>
              <th className="w-20 text-left">Reseñas</th>
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
                  <p className="text-gray-800">3</p>
                  <p className="text-gray-400">2023-07-20</p>
                </div>
              </td>
              <td>
                <div className="flex">
                  <StarIcon width={20} height={20} className="text-yellow-500" />
                  <StarIcon width={20} height={20} className="text-yellow-500" />
                  <StarIcon width={20} height={20} className="text-yellow-500" />
                  <StarIcon width={20} height={20} className="text-yellow-500" />
                  <StarIcon width={20} height={20} className="text-gray-500" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <Pagination currentPage={currentPage}/> */}
      </div>
      <div className="w-1/3">
        <ViewReview width="w-full" />
      </div>
    </div>
  )
}