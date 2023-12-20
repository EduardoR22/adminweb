import { Rating } from "@mui/material"
import { useState } from "react"
import { updateReview } from "@/app/api/reviews/route";
import Alert, {showToastMessageError} from "../Alert";

export default function ShowReview({width, review, token}: {width:string, review:any, token:string}){
  
  const [isChecked, SetIsChecked] = useState(review.status);
  
  const handleCheckboxChange = () => {
    const aux = !isChecked;
    updateStatus(aux);
    SetIsChecked(!isChecked)
  }

  const updateStatus = async (value:boolean) => {
    
    const data = {status: value}
    try {
      const res = await updateReview(token, review._id, data);
      if(res !== 200){
        showToastMessageError('Error al actualizar review!!');
      }
    } catch (error) {
      //agregar mensaje de error
      //return <h1>Error al obtener las reviews del proyecto...</h1>
    }
  }

  return(
    <>
      <Alert />
      <div className={`${width} flex justify-between`} key={review._id}>
        <div className="flex">
          <Rating defaultValue={review.ratingAverage} precision={0.5} readOnly />
        </div>
        <div>
          <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className='sr-only'
            />
            <span className='label flex items-center text-sm font-medium text-black'>
              Ocultar
            </span>
            <span
              className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                isChecked ? 'bg-blue-950' : 'bg-[#CCCCCE]'
              }`}
            >
              <span
                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                  isChecked ? 'translate-x-[28px]' : ''
                }`}
              ></span>
            </span>
            <span className='label flex items-center text-sm font-medium text-black'>
              Mostrar
            </span>
          </label>
        </div>
      </div>
    </>
  )
}