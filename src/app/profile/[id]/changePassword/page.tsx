import { cookies } from "next/headers"
import {getUser} from '@/app/api/users/routeUsers'
import ContainerHeaderForm from "@/components/ContainerHeaderForm"
import FormChangePassword from "@/components/profile/FormChangePassword";
import ContainerForm from "@/components/ContainerForm";
import NavBar from "@/components/Navigation/NavBar";

export default async function ChangePassword({ params }: { params: { id: string } }) {

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
      <ContainerForm img="/profile" subtitle="Cambiar contraseña" title="Usuario" width="w-full max-w-sm">
            <FormChangePassword usr={user} token={token} />        
      </ContainerForm>
    </>
  ) 
}