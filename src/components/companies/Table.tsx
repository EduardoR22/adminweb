"use client"
import { useRouter } from "next/navigation"
import Image from "next/image";
import Searcher from "../Searcher";
import { useState } from "react";
import Link from "next/link";
import Button from "../Button";
//import Pagination from "../Pagination";

export default function Table({companies}: {companies:any}){
  
  const [search, setSearch] = useState<string>();
  const router = useRouter();
  
  const onSearchChange = (value: string) => {
    setSearch(value);
  }
  
  return(
    <>
      <div className="flex justify-between">
        <Searcher search={search} searchChange={onSearchChange} />
        <Link href={'/companies/new'}>
          <Button styleB="text-white rounded-full bg-blue-600 hover:bg-blue-500" textB="Nuevo" typeB="Button" />
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
            </tr>
          </thead>
          <tbody>
            <tr className="cursor-pointer" 
              onClick={() => router.push(`/contacts/id`)}>
              <td>
                <div className="flex justify-center items-center">
                  <div className="rounded-full bg-green-700 w-4 h-4"></div>
                </div>
              </td>
              <td>
                <Image src={'/logo.jpg'} alt="logo" width={50} height={50} />
              </td>
              <td>
                <div>
                  <p>Nombre company</p>
                  <p className="text-gray-400 text-xs">email@company.com</p>
                </div>
              </td>
              <td>
                <div>
                  <p>444 444 4444</p>
                  <p className="text-gray-400 text-xs">San Luis Potosi, S.L.P</p>
                </div>
              </td>
              <td>
                <div>
                  <p>2323</p>
                  <p className="text-gray-400 text-xs">12 oct</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}