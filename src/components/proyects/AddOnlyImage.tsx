"use client"
import Upload from "../Upload"
import { useState } from "react"
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AddOnlyImage({services, addImage}: 
                              {services:any[], addImage:Function}){
  
  const [file, setFile] = useState();
  const [ok, setOk] = useState<boolean>(true);
  const [option, setOption] = useState(services[0]._id);

  const save = () => {
    if(file && option){
      addImage(file, option);
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
        <div className="w-1/2 flex mr-2">
          {file && <img src={URL.createObjectURL(file)} className="w-14 h-14" />}
          <Upload setFile={setFile} />   
        </div>
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
        <CheckCircleIcon width={50} height={50} className={`text-red-500 cursor-pointer`} onClick={save} />
      </div>
      {!ok? (
              <p className="text-red-500">* El campo no debe estar vacio</p>
            ): ''}
    </>
  )
}