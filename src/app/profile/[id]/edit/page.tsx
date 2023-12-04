import { cookies } from "next/headers"
import {getUser} from '@/app/api/users/route'
import ContainerHeaderForm from "@/components/ContainerHeaderForm"
import ContainerForm from "@/components/ContainerForm";
import FormEditUser from "@/components/profile/FormEditUser";
import NavBar from "@/components/Navigation/NavBar";

export default async function EditUser({ params }: { params: { id: string } }) {

  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const id:string = params.id
  const user: any = await getUser(id, token? token : '')

  if(user === undefined || typeof(user) === "string")
    return <><p>Error al obtener los datos del usuario</p></>

  const photo=user.data.data.photo
  const name=user.data.data.name
  const email=user.data.data.email

  return(
    <>
      <NavBar />
      <ContainerHeaderForm email={email} photo={photo} name={name} />
      <ContainerForm img="/profile" subtitle="Configuraci&oacute;n de su cuenta" title="Usuario" width="w-full max-w-sm">
            <FormEditUser usr={user} token={token} />        
      </ContainerForm>
    </>
  ) 
}