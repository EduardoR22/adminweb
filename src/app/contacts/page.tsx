import { cookies } from "next/headers"
import { getContacts } from "../api/contacts/route";
import Table from "@/components/contacts/Table";

export default async function Contacts(){
  
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
      <Table contacts={contacts.data.data} />
    </>
  )
}