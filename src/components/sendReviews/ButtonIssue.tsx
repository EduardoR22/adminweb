"use client"
import { useState } from "react"

export default function ButtonIssue({issue, index, selectIssue}: 
                                  {issue:any, index:number, selectIssue:Function}){
  
  const [band, setBand] = useState(false);
  
  const onClick = () => {
    setBand(!band)
    selectIssue(index);
  }

  return(
    <>
      <div 
        className={`w-44 py-2 px-2 mb-3 cursor-pointer rounded-md text-xs sm:text-base text-white text-center mx-3
                    ${band? 'bg-green-600 hover:bg-green-500': 
                    'bg-slate-600 hover:bg-slate-500'}`}
          onClick={onClick}
        >
        <p>{issue.issue}</p>
      </div>
    </>
  )
}