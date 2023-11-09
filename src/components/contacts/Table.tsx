"use client"
import { useRouter } from "next/navigation"

export default function Table({contacts}: {contacts:any}){
  
  const router = useRouter();
  return(
    <>
      <div className="flex justify-center mt-10">
        <table>
          <thead>
            <tr className="border-b border-gray-600 text-gray-400">
              <td className="w-12">Leido</td>
              <td className="w-44">Nombre</td>
              <td className="w-28">Telefono</td>
              <td className="w-20">Id</td>
              <td className="w-56">Comentario</td>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact:any) => (
              <tr key={contact._id} className="cursor-pointer" 
                onClick={() => router.push(`/contacts/${contact._id}`)}>
                <td>
                  <div className="flex justify-center items-center">
                    <div className="rounded-full bg-green-700 w-4 h-4"></div>
                  </div>
                </td>
                <td>falta el nombre</td>
                <td>falta el telefono</td>
                <td>
                  <div>
                    <p>{contact.idChat}</p>
                    <p className="text-gray-400 text-xs">{contact.date.substring(0,10)}</p>
                  </div>
                </td>
                <td>{contact.messages[0].message}</td>
              </tr>            
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}