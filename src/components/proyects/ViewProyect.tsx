//"use client"

import Image from "next/image"
import { PencilIcon} from "@heroicons/react/24/solid"
import ShowImage from "./ShowImage"
import Link from "next/link"
import DeleteProyect from "./Delete"
import AddImageProyect from "./AddImageProject"

export default function ViewProyect({width, proyect, token, services}: 
                        {width:string, proyect:any, token: string, services:any[]}){
  
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
        {proyect.images.map((img: any, index: number) => (
          <ShowImage img={img} token={token} key={index} idProyect={proyect._id} />
        ))}
      </div>

      <AddImageProyect services={services} token={token} idProyect={proyect._id} />
    </div>
  )
}