"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function Slider(){
  
  const slider = [
    '/cr7.jpg',
    '/CR7_2.jpg'
  ]
  
  const [img, setImg] = useState(slider[0]);
  const [index, setIndex] = useState(0);

  const timer = setTimeout(() => {
    if(index >= slider.length - 1){
      setIndex(0);
    }else{
      setIndex(index + 1);
    }
  }, 3000);

  useEffect(() => {
    setImg(slider[index]);
    return () => clearTimeout(timer);
  }, [index])

  return(
    <>
      <div className="flex justify-center">
        <Image 
          src={img}
          alt="slider"
          width={1200}
          height={800}
          className="ml-20 absolute"
        />
      <p className="relative w-2/3 top-1/2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illo officia dolorum magnam quas dolorem molestias, temporibus unde iste ea explicabo repellendus! Culpa dignissimos eaque accusamus quasi illum tenetur quaerat!</p>
      </div>
    </>
  )
}