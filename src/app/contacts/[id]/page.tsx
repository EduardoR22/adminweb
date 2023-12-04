import { cookies } from "next/headers";
import { getContact } from "@/app/api/contacts/route";
import Chat from "@/components/contacts/Chat";
import NavBar from "@/components/Navigation/NavBar";

export default async function Contact({params}: {params:{id:string}}){
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = JSON.parse(cookieStore.get('user')?.value || '');
  const idU = user._id;
  
  let contact;
  try {
    contact = await getContact(id, token);
    if(!contact){
      return(
        <h1 className="">Ocurrio un error al buscar contacto...</h1>
      )
    }
  } catch (error) {
    return(
      <h1 className="">Ocurrio un error al buscar contacto..</h1>
    )
  }

  return(
    <>
      <Chat chatR={contact} idU={idU} token={token} />
    </>
  )
}