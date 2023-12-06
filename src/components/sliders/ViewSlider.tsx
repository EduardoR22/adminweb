"use client"

import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import Delete from "./Delete"

export default function ViewSlider({slider, token}: {slider:any, token:string}){
  
  const sliderP = [
    '/cr7.jpg',
    '/CR7_2.jpg'
  ]
  
  const [img, setImg] = useState(sliderP[0]);
  const [index, setIndex] = useState(0);

  const timer = setTimeout(() => {
    if(index >= sliderP.length - 1){
      setIndex(0);
    }else{
      setIndex(index + 1);
    }
  }, 5000);

  useEffect(() => {
    setImg(sliderP[index]);
    return () => clearTimeout(timer);
  }, [index])

  const Previous = () => {
    if(index > 0){
      setIndex(index -1);
    }
  }

  const Next = () => {
    if(index < sliderP.length - 1){
      setIndex(index+1)
    }
  }

  return(
    <>
      <div className="pt-20">
        <div className="flex justify-center h-80 w-full">
          <img src={img} alt="slider" className="w-full h-full" />
          {slider.features.map((feature:string, index:number) => (
            <p className={`w-2/3 absolute text-xl text-white font-bold`} style={{top:`${(index * 50)+140}px`}} 
              key={index}>{feature}</p>
          ))}
          {/* <p className="w-2/3 absolute top-96">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illo officia dolorum magnam quas dolorem molestias, temporibus unde iste ea explicabo repellendus! Culpa dignissimos eaque accusamus quasi illum tenetur quaerat!</p> */}
          <ChevronLeftIcon width={40} height={40} onClick={Previous}
            className="absolute left-4 top-60 text-white cursor-pointer"
          />
          <ChevronRightIcon width={40} height={40} onClick={Next}
            className="absolute right-4 top-60 text-white cursor-pointer"
          />
          <Link href={`/sliders/${slider._id}/edit`}>
            <PencilSquareIcon width={30} height={30} 
              className="absolute right-16" 
            />
          </Link>
          <Delete token={token} slider={slider} />
        </div>
      </div>
    </>
  )
}