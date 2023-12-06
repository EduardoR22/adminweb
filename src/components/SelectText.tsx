"use client"
import { useState } from "react"
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SelectText({updateCount, pushText, valueFeat, bandPlus}:
                                {updateCount: Function, pushText:Function, valueFeat:string, bandPlus:boolean}){
  
  const [text, setText] = useState<string>(valueFeat);
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);

  const onPlus = () =>{
    setAdd(true);
    updateCount();
  }

  const save = () => {
    setSaved(true);
    pushText(text);
  }

  return(
    <>
      <div className="flex items-center mt-2">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} 
          className="border border-slate-300 p-3 rounded-md outline-none outline-0"
        />
        <CheckCircleIcon width={40} height={40} className={`text-green-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        <PlusCircleIcon width={40} height={40} className={`text-green-500 cursor-pointer ${add? 'invisible': ''} ${bandPlus? '': 'invisible'}`} onClick={onPlus} />
      </div>
    </>
  )
}