"use client"

import Image from "next/image"
import ShowReview from "./ShowReviews";
import Reviews from "./Reviews";

export default function ViewReview({width, reviews, token, image}: 
                          {width:string, reviews:any, token:string, image:string}){
  
  if(!reviews)
    return <h1>No se encuentran reviews del proyecto..</h1>
  
  return(
    <div className="flex flex-col mx-1">
      <div className={`${width} flex`}>
        <Image src={image} alt="image" width={30} height={30} />
        <div className="ml-5">
          <p className="text-gray-800">{reviews[0].project.title}</p>
          <p className="text-gray-400 text-xs">{reviews[0].project.subtitle}</p>
        </div>
      </div>
        {reviews.map((review:any) => (
          <div key={review._id}>
            <div className="flex justify-between mt-7 mb-2 text-slate-700">
              <p>{review.name}</p>
              <p>{review.email}</p>
            </div>
            <ShowReview width={width} review={review} token={token} />
            <Reviews review={review} />
          </div>
        ))}
    </div>
  ) 
}