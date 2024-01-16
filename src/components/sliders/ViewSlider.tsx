"use client"

import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import Delete from "./Delete"

export default function ViewSlider({sliders, token, indexStart}: 
              {sliders:any, token:string, indexStart:number}){
  
  const [index, setIndex] = useState(indexStart);
  const [slider, setSlider] = useState<any>(sliders[indexStart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(index >= sliders.length - 1){
        setIndex(0);
      }else{
        setIndex(index + 1);
      }
    }, 5000);
    
    setSlider(sliders[index]);
    return () => clearTimeout(timer);
  }, [index])

  const Previous = () => {
    if(index > 0){
      setIndex(index -1);
    }else{
      setIndex(sliders.length -1);
    }
  }

  const Next = () => {
    if(index < sliders.length - 1){
      setIndex(index+1)
    }else{
      setIndex(0);
    }
  }

  return(
    <>
      <div className="pt-20">
        <div className="flex justify-center relative w-full">
          <img src={slider.image} alt="slider" className="w-full h-auto" />
          {slider.features.map((feature:string, index:number) => (
            <p className={`w-2/3 absolute text-xl text-white font-bold`} style={{top:`${(index * 50)}px`}} 
              key={index}>{feature}</p>
          ))}
          <ChevronLeftIcon onClick={Previous}
            className="absolute w-8 h-8 bg-slate-700 rounded-md hover:bg-slate-500 left-4 top-16 sm:top-28 lg:top-44 text-white cursor-pointer"
          />
          <ChevronRightIcon onClick={Next}
            className="absolute w-8 h-8 bg-slate-700 rounded-md hover:bg-slate-500 right-4 top-16 sm:top-28 lg:top-44 text-white cursor-pointer"
          />
          <Link href={`/sliders/${slider._id}/edit`}>
            <PencilSquareIcon width={30} height={30} 
              className="absolute right-16 hover:text-slate-500" 
            />
          </Link>
          <Delete token={token} slider={slider} />
        </div>
      </div>
    </>
  )
}