import { cookies } from "next/headers"
import { getContacts } from "../api/contacts/route";
import Table from "@/components/contacts-whith-chat/Table";
import NavTab from "@/components/contacts-whith-chat/NavTab";
import ContainerForm from "@/components/ContainerForm";
import NavBar from "@/components/Navigation/NavBar";

export default async function Contacts({searchParams}: {searchParams: {[opc:string]: string}}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let contacts;

  try {
    contacts = await getContacts(token);
    if(!contacts){
      return(
        <h1 className="text-center text-red-500">Ocurrio un error al obtener los contactos..</h1>
      )
    }
  } catch (error) {
    return(
      <h1 className="text-center text-red-500">Ocurrio un error al obtener los contactos..</h1>
    )
  }
  
  return(
    <>
      <NavBar />
      <div className="flex justify-center mt-2">
        <div className="flex px-4 shadow-lg shadow-gray-400">
          <NavTab opt={searchParams.opc} />
        </div>
      </div>
      <ContainerForm title="Reportes de contactos" subtitle="Atencion de reportes por contacto" img="/reportes.jpg" width="w-2/3">
        <Table contacts={contacts.data.data} />
      </ContainerForm>
    </>
  )
}