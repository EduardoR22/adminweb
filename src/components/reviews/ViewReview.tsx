"use client"

import Image from "next/image"
import { PencilIcon, TrashIcon, StarIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid"
import Upload from "../Upload"
import Button from "../Button"
import { useState } from "react"

export default function ViewReview({width}: {width:string}){
  
  const [btn1, setBtn1] = useState<boolean>(false)
  const [btn2, setBtn2] = useState<boolean>(false)
  const [btn3, setBtn3] = useState<boolean>(false)
  const [btn4, setBtn4] = useState<boolean>(false)
  const [btn5, setBtn5] = useState<boolean>(true)

  function onClick(btn: number){
    
    switch(btn){
      case 1: setBtn1(btn1? false : true);
            break;
      case 2: setBtn2(btn2? false : true);
            break;
      case 3: setBtn3(btn3? false : true);
            break;
      case 4: setBtn4(btn4? false : true);
            break;
      case 5: setBtn5(btn5? false : true);
            break; 
    }
  }
  
  return(
    <div className="flex flex-col">
      <div className={`${width} flex`}>
        <Image src={'/image'} alt="image" width={30} height={30} />
        <div className="ml-5">
          <p className="text-gray-800">Honda planta de celeya Gto.</p>
          <p className="text-gray-400 text-xs">Celaya Guanajuato</p>
          <p className="text-gray-400 text-xs">45,000m2</p>
        </div>
        {/* <PencilIcon width={20} height={20} className="text-green-500" />
        <TrashIcon width={20} height={20} className="text-red-500" /> */}
      </div>

      <div className={`${width} flex justify-between mt-10`}>
        <div className="flex">
          <StarIcon width={20} height={20} className="text-yellow-500" />
          <StarIcon width={20} height={20} className="text-yellow-500" />
          <StarIcon width={20} height={20} className="text-yellow-500" />
          <StarIcon width={20} height={20} className="text-yellow-500" />
          <StarIcon width={20} height={20} className="text-gray-500" />
        </div>
        <p className="text-gray-400 text-sm">2023-07-23/98873</p>
      </div>

      <div className="w-full flex flex-wrap mt-5">
        <div className='flex justify-around flex-wrap'>
          <button 
            //onClick={() => onClick(1)} 
            className={`w-40 text-sm md:text-base pl-2 md:pl-0.5 h-auto py-1 m-3 text-gray-500 shadow-gray-400 shadow-md rounded-lg flex justify-between items-center ${btn1 ? 'bg-green-600 text-white': 'bg-gray-100'}`}  
          >
            Acabados           
            <CurrencyDollarIcon width={15} height={15} />         
          </button>
          <button 
            //onClick={() => onClick(2)} 
            className={`w-40 text-sm md:text-base pl-2 md:pl-0.5 h-auto py-1 m-3 text-gray-500 shadow-gray-400 shadow-md rounded-lg flex justify-between items-center ${btn2 ? 'bg-green-600 text-white': 'bg-gray-100'}`}  
          >
            Comunicacion           
            <CurrencyDollarIcon width={15} height={15} />         
          </button>
          <button 
            //onClick={() => onClick(3)} 
            className={`w-40 text-sm md:text-base pl-2 md:pl-0.5 h-auto py-1 m-3 text-gray-500 shadow-gray-400 shadow-md rounded-lg flex justify-between items-center ${btn3 ? 'bg-green-600 text-white': 'bg-gray-100'}`}  
          >
            Personal           
            <CurrencyDollarIcon width={15} height={15} />         
          </button>
          <button 
            //onClick={() => onClick(4)} 
            className={`w-40 text-sm md:text-base pl-2 md:pl-0.5 h-auto py-1 m-3 text-gray-500 shadow-gray-400 shadow-md rounded-lg flex justify-between items-center ${btn4 ? 'bg-green-600 text-white': 'bg-gray-100'}`}  
          >
            <p className=''>Activacion internet</p>           
            <CurrencyDollarIcon width={15} height={15} />         
          </button>
          <button 
            //onClick={() => onClick(5)} 
            className={`w-40 text-sm md:text-base pl-2 md:pl-0.5 h-auto py-1 m-3 text-gray-500 shadow-gray-400 shadow-md rounded-lg flex justify-between items-center ${btn5 ? 'bg-green-600 text-white': 'bg-gray-100'}`}  
          >
            Tiempo de entrega           
            <CurrencyDollarIcon width={15} height={15} />         
          </button>
        </div>
      </div>
    </div>
  )
}