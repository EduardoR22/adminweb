"Use client"
import { StarIcon } from "@heroicons/react/24/solid"

export default function StarElement({selectRating, rating, index}: 
                            {selectRating:Function, rating:number, index:number}){
  
  return(
    <StarIcon 
      className={`w-8 h-8 cursor-pointer ${rating >= index? 'text-yellow-500': 'text-slate-500'}`} 
      onClick={() => selectRating(index)}
    />
  )
}