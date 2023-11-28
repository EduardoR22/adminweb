"use client"
import Upload from "../Upload"
import { useState, useEffect } from "react"
import InputText from "../InputText";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AddImage({updateCount, pushFile, pushCategory}:
                                {updateCount: Function, pushFile:Function, pushCategory: Function}){
  
  const [file, setFile] = useState();
  const [category, setCategory] = useState();
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);

  const onPlus = () =>{
    setAdd(true);
    updateCount();
  }

  const save = () => {
    setSaved(true);
    pushFile(file);
    pushCategory(category);
  }

  // useEffect(() => {
  //   if(file !== undefined && !saved){
  //     pushFile(file);
  //   }
  // }, [file])

  return(
    <>
      <div className="flex items-center">
        <Upload setFile={setFile} />
        <InputText setText={setCategory} />
        <PlusCircleIcon width={70} height={70} className={`text-green-500 cursor-pointer ${add? 'invisible': ''}`} onClick={onPlus} />
        <CheckCircleIcon width={70} height={70} className={`text-green-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
      </div>
    </>
  )
}