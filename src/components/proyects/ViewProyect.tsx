"use client"

import Image from "next/image"
import { PencilIcon } from "@heroicons/react/24/solid"
import Upload from "../Upload"
import Button from "../Button"
import { useState } from "react"
import Link from "next/link"
import DeleteProyect from "./Delete"

export default function ViewProyect({width, proyect, token}: {width:string, proyect:any, token: string}){
  
  const [file, setFile] = useState();
  
  return(
    <div className="flex flex-col">
      <div className={`${width} flex justify-between`}>
        <Image src={'/image'} alt="image" width={30} height={30} />
        <Link href={`/proyects/${proyect._id}`}>
          <div>
            <p className="text-gray-800">{proyect.title}</p>
            <p className="text-gray-400 text-xs">{proyect.address}</p>
            <p className="text-gray-400 text-xs">{proyect.subtitle}</p>
          </div>
        </Link>
        <Link href={`/proyects/${proyect._id}/edit`}>
          <PencilIcon width={20} height={20} className="text-green-500" />
        </Link>
        {/* <TrashIcon width={20} height={20} className="text-red-500" /> */}
        <DeleteProyect proyect={proyect} token={token} />
      </div>

      <div className={`${width} flex justify-between mt-10`}>
        <div className="w-5/12 flex">
          <Image src={'/image'} alt="image" width={30} height={30} />
          <div className="ml-5">
            <p className="text-gray-800 text-xs">{proyect.segment}</p>
            <p className="text-gray-400 text-xs">Año 2023</p>
          </div>
        </div>
        <div className="w-7/12">
          <p className="text-gray-400 uppercase text-xs">{proyect.features}</p>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-5">
        {proyect.images.map((img: string, index: number) => (
          <div className="w-1/3 flex justify-center items-center" key={index}>
            <Image src={img} alt="img" width={50} height={50} />
          </div>
        ))}
        {/* <div className="w-1/3 flex justify-center items-center">
          <Image src={'/img'} alt="img" width={50} height={50} />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <Image src={'/img'} alt="img" width={50} height={50} />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <Image src={'/img'} alt="img" width={50} height={50} />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <Image src={'/img'} alt="img" width={50} height={50} />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <Image src={'/img'} alt="img" width={50} height={50} />
        </div> */}
      </div>

      <div className={`${width} mt-5`}>
        <p className="text-gray-600">Agregar foto</p>
        <form onSubmit={(e) => {e.preventDefault}} className="pt-3">
          <Upload setFile={setFile} />
          <div className="flex justify-center">
            <Button styleB="mt-3 bg-blue-600 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
          </div>
        </form>
      </div>

    </div>
  )
}