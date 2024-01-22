"use client"
import { useState } from "react"
import { PlusCircleIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function SelectText({updateCount, pushText, valueFeat, bandPlus, deleteFeature, index, bandShow}:
                                {updateCount: Function, pushText:Function, valueFeat:string, 
                                bandPlus:boolean, deleteFeature:Function, index:number, bandShow:boolean}){
  
  const [text, setText] = useState<string>(valueFeat);
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const [ok, setOk] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const onPlus = () =>{
    if(text !== '' && saved){
      setAdd(true);
      updateCount();
    }else{
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const save = () => {
    if(text !== ''){
      if(text.length > 10){
        setSaved(true);
        pushText(text);
      }else{
        setMessage('* Las caracteristica debe ser mayor a 10 caracteres');
        setOk(false);
        setTimeout(() => {
          setOk(true);
        }, 2000);
      }
    }else{
      setMessage('* El campo no debe estar vacio');
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const deleteFeat = () => {
    deleteFeature(index);
  }

  return(
    <>
      <div className="flex items-center mt-2">
        <div className="w-full">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} 
              className="shadow appearance-none border rounded w-full py-4 px-3 text-base
               text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
            />
        </div>
        <CheckCircleIcon width={40} height={40} className={`text-red-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        <PlusCircleIcon width={40} height={40} className={`text-green-500 cursor-pointer ${add? 'invisible': ''} ${bandPlus? '': 'invisible'} ${bandShow? '': 'invisible'}`} onClick={onPlus} />
        <TrashIcon width={40} height={40} onClick={deleteFeat} className={`text-red-500 cursor-pointer ${saved? '': 'invisible'}`} />
      </div>
      {!ok? (
            <p className="text-red-500">{message}</p>
          ): ''}
    </>
  )
}