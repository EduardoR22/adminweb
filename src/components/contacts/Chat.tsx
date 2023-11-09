"use client"
import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { PaperAirplaneIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
//import { updateChat } from "@/app/api/chats/route";
import ContainerForm from "../ContainerForm";

export default function Chat({chatR, idU, token}: {chatR:any, idU: string, token:string}){
  
  const [msg, setMsg] = useState<string>();
  const handleChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(target.value);
  }

  return (
    <> 
      <ContainerForm img="/image.png" subtitle="Detalle del reporte" 
                  title={`Seguimiento a contacto ${chatR.data.data.idChat}`} width="w-1/2"
      >
        {/* <div className="bg-white h-screen flex flex-col justify-between"> */}
        <div className="bg-white flex flex-col justify-between">
          <div>
            {chatR.data.data.messages.map((message: any) => (
              <div className={`flex p-3 items-center ${message.sender === idU? 'justify-end': ''}`}
                key={message._id}
              >
                {message.sender !== idU? <Image src={'/profile.png'} alt="image" width={50} height={50} />: <></>}
                <div className="ml-3 w-3/4">
                  <div className=" flex justify-between text-gray-500 text-sm">
                    {message.sender !== idU? <p className="ml-2">John Doe</p>: <p></p>}
                    <p className="mr-2">{message.time.substring(11, 16)}</p>
                  </div>
                  <div 
                    className={`${message.sender === idU ? 'bg-purple-400 text-white':'bg-blue-100 text-gray-600'} p-3 rounded-full mt-1`}
                  >
                    <p>{message.message}</p>  
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4 flex items-center">
            <textarea id="message" 
              value={msg}
              onChange={handleChange}
              className="bg-green-300 rounded-lg p-3 text-gray-700 w-11/12 h-16 
                        resize-none overflow-y-hidden outline-0"
            />
            <PaperAirplaneIcon 
              className="text-blue-500 cursor-pointer" width={30} height={30}
              onClick={() => {
                const sendMessage = new Promise(async (resolve, reject) => {
                  if(msg !== ''){
                    const chatData = {'messages':msg}
                    
                    // try{
                    //   const chat = await updateChat(chatR.data.data._id, chatData, token);
                    //   if(chat != undefined)
                    //   {
                    //     resolve(chat);
                    //   }
                    //   else
                    //     reject('Error al mandar mensaje');
                    // }catch{
                    //   reject('Error al mandar mensaje..');
                    // }
                  }
                });
                sendMessage.then(() => {
                  // promiseA.then((val: any) => {
                  //   setBanRequest(true);
                  //   setChatR(val)
                  // });
                })
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-green-600 rounded-2xl p-3 mb-3 cursor-pointer hover:bg-green-400">
            <HandThumbUpIcon width={50} height={50} className="text-white" />
          </div>
        </div>
      </ContainerForm>
    </>
  )
}