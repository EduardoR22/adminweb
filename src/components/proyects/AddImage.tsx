"use client"
import Upload from "../Upload"
import { useState } from "react"
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AddImage({updateCount, pushFile, pushService, services}:
                                {updateCount: Function, pushFile:Function, 
                                pushService: Function, services:any[]}){
  
  const [file, setFile] = useState();
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const [ok, setOk] = useState<boolean>(true);
  const [option, setOption] = useState(services[0]._id);

  const onPlus = () =>{
    if(saved){
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
    if(file && option){
      setSaved(true);
      pushFile(file);
      pushService(option);
    }else{
      setOk(false);
      setTimeout(() => {
        setOk(true);
      }, 2000);
    }
  }

  const onChange = (value:any) => {
    setOption(value);
  }

  return(
    <>
      <div className="flex items-center mt-2">
        <div className="flex w-1/2 mr-2">
          {file && <img src={URL.createObjectURL(file)} className="w-14 h-14" />}
          <Upload setFile={setFile} />  
          {!ok? (
            <p className="text-red-500">* El campo no debe estar vacio</p>
          ): ''}
        </div>
        {/* <InputText setText={setCategory} /> */}
        <select name="" id="" 
            className="bg-white outline-none outline-0 shadow appearance-none border 
            rounded w-1/2 py-4 px-3 text-base text-gray-500 leading-tight font-sans 
            font-ligth focus:outline-none focus:shadow-outline" 
            onChange={(e) => onChange(e.target.value) }
        >
          {services.map((service:any, index:number) => (
            <option value={service._id} key={index}
              //className="outline-none outline-0 border-0"
            >{service.name}</option>
          ))}
        </select>
        <CheckCircleIcon width={50} height={50} className={`text-red-500 cursor-pointer ${saved? 'invisible': ''}`} onClick={save} />
        <PlusCircleIcon width={50} height={50} className={`text-green-500 cursor-pointer ${add? 'invisible': ''}`} onClick={onPlus} />        
      </div>
    </>
  )
}