import { cookies } from "next/headers"
//import { getContacts } from "../api/contacts/route";
import Table from "@/components/contact-us/Table";
import NavTab from "@/components/contact-us/NavTab";
import ContainerForm from "@/components/ContainerForm";
import NavBar from "@/components/Navigation/NavBar";
import { getContactUs } from "../api/contact-us/route";

export default async function ContactUs({searchParams}: {searchParams: {[opc:string]: string}}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  let status;
  switch(searchParams.opc){
    case '2': status = 'EN ATENCION'; break;
    case '3': status = 'SOLUCIONADO'; break;
    case '4': status = 'ANULADO'; break;
  }
  
  if(!status){
    status='PENDIENTE';
  }

  let contacts;

  try {
    contacts = await getContactUs(token, status);
    if(typeof(contacts) === 'string') return <h1 className="text-center text-red-500">Ocurrio un error al obtener los contactos..</h1>
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
      <ContainerForm title="Reportes de contactos" subtitle="Atencion de reportes por contacto" 
        img="/contacts.jpg" width="w-full md:w-3/4">
        <Table contacts={contacts} token={token} />
      </ContainerForm>
    </>
  )
}