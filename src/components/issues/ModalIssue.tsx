"use client"

import { useState } from "react";
import { StarIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { createIssue, updateIssue } from "@/app/api/issues/routeIssues";
import { useRouter } from "next/navigation";
import Alert, {showToastMessage, showToastMessageError} from "../Alert";

export default function Modal({newIssue, issue, token, id}: {newIssue:boolean, issue:any, token:string, id:string}) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(newIssue? 5 : issue.rating);
  const [valIssue, setValIssue] = useState(newIssue? '': issue.issue)
  const router = useRouter();

  const onRating = (rate:number) => {
    setRating(rate);
  }

  const onChange = (value: string) => {
    setValIssue(value);
  }

  const category = ["muy malo", "malo", "regular", "bueno", "excelente"]

  const sendRequest = async () => {
    
    const issueData = {
      "issue": valIssue,
      "category": category[rating-1],
      rating
    }
    
    if(newIssue){
      try {
        const res = await createIssue(token, issueData);
        if(res === 201){
          setValIssue('');
          setRating(5);
          showToastMessage('Issue creado exitosamente!')
          setTimeout(() => {
            setShowModal(false);
            router.refresh();
          }, 3000)
        }else{
          showToastMessageError(res.toString());
        }
      } catch (error) {
        showToastMessageError('Error al crear issue');  
      }
    }else{
      try {
        const res = await updateIssue(token, issueData, id);
        if(res === 200){
          setValIssue('');
          setRating(5);
          showToastMessage('Issue actualizado exitosamente');
          setTimeout(() => {
            setShowModal(false);
            router.refresh();
          }, 3000)
        }else{
          showToastMessageError(res.toString());
        }
      } catch (error) {
        showToastMessageError('Error al actualizar issue');
      }
    }
  }

  return (
    <>
      {newIssue? (
        <button
          className="bg-blue-950 text-white w-36 hover:bg-blue-500 active:bg-blue-500 font-bold text-sm py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Nuevo
        </button>
      ): (
        <PencilSquareIcon width={20} height={20} 
          className="text-slate-600 cursor-pointer mr-2"
          onClick={() => setShowModal(true)} 
        />
      )}
      {showModal ? (
        <>
          <Alert />
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {newIssue? 'Nuevo issue': 'Actualizar issue'}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex">
                    <StarIcon width={20} height={20} onClick={()=>onRating(1)}
                      className={`cursor-pointer ${rating >= 1? 'text-yellow-500':'text-slate-500'}`} 
                    />
                    <StarIcon width={20} height={20} onClick={()=>onRating(2)}
                      className={`cursor-pointer ${rating >= 2? 'text-yellow-500':'text-slate-500'}`} 
                    />
                    <StarIcon width={20} height={20} onClick={()=>onRating(3)}
                      className={`cursor-pointer ${rating >= 3? 'text-yellow-500':'text-slate-500'}`} 
                    />
                    <StarIcon width={20} height={20} onClick={()=>onRating(4)}
                      className={`cursor-pointer ${rating >= 4? 'text-yellow-500':'text-slate-500'}`} 
                    />
                    <StarIcon width={20} height={20} onClick={()=>onRating(5)}
                      className={`cursor-pointer ${rating >= 5? 'text-yellow-500':'text-slate-500'}`} 
                    />
                  </div>
                  <div className="flex mt-4 items-center">
                    <p className="text-slate-700 mr-2">CATEGORIA:</p>
                    <input type="text" 
                      className="border border-gray-400 outline-none outline-0 p-1 rounded-md" 
                      value={valIssue}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-blue-950 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={sendRequest}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
