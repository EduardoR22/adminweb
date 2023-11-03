"use client"

import Image from "next/image"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import Upload from "../Upload"
import Button from "../Button"

export default function ViewProyect({width}: {width:string}){
  return(
    <div className="flex flex-col">
      <div className={`${width} flex justify-between`}>
        <Image src={'/image'} alt="image" width={30} height={30} />
        <div>
          <p className="text-gray-800">Honda planta de celeya Gto.</p>
          <p className="text-gray-400 text-xs">Celaya Guanajuato</p>
          <p className="text-gray-400 text-xs">45,000m2</p>
        </div>
        <PencilIcon width={20} height={20} className="text-green-500" />
        <TrashIcon width={20} height={20} className="text-red-500" />
      </div>

      <div className={`${width} flex justify-between mt-10`}>
        <div className="w-5/12 flex">
          <Image src={'/image'} alt="image" width={30} height={30} />
          <div className="ml-5">
            <p className="text-gray-800 text-xs">Industrial</p>
            <p className="text-gray-400 text-xs">Año 2023</p>
          </div>
        </div>
        <div className="w-7/12">
          <p className="text-gray-400 uppercase text-xs">Muros y lambrines de tablaroca, 
              porcelanato en piso, plafon ciego y reticular, pintura</p>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-5">
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
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <Image src={'/img'} alt="img" width={50} height={50} />
        </div>
      </div>

      <div className={`${width} mt-5`}>
        <p className="text-gray-600">Agregar foto</p>
        <form onSubmit={(e) => {e.preventDefault; console.log('holla')}} className="pt-3">
          <Upload />
          <div className="flex justify-center">
            <Button styleB="mt-3 bg-blue-600 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
          </div>
        </form>
      </div>

    </div>
  )
}