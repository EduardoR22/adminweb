"use client"
import Image from "next/image";
import Searcher from "../Searcher";
import { useState } from "react";
import Link from "next/link";
import Button from "../Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteCompany from "./DeleteCompany";
//import Pagination from "../Pagination";

export default function Table({companies, token}: {companies:any, token:string}){
  
  const [search, setSearch] = useState<string>();
  
  const onSearchChange = (value: string) => {
    setSearch(value);
  }
  
  return(
    <>
      <div className="flex justify-between">
        <Searcher search={search} searchChange={onSearchChange} />
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
            {companies.map((company: any) => (
              <tr key={company._id}>
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
                    <p>{company.name}</p>
                    <p className="text-gray-400 text-xs">{company.email}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>444 444 4444</p>
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
    </>
  )
}