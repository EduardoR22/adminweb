import ContainerForm from "@/components/ContainerForm";
import FormClient from "@/components/client/FormClient";
import { cookies } from "next/headers"
import NavBar from "@/components/Navigation/NavBar";

export default function New(){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';
  let user;
  user = cookieStore.get('user')?.value;
  if(user) user = JSON.parse(user);
  else return <h1>Error: Por favor inicie sesion para continuar..</h1>

  return(
    <>
      <NavBar />
      <ContainerForm img="/profile" subtitle="Cambiar contraseña" title="Usuario" width="w-full max-w-sm">
            <FormClient name="" id="" linkWeb="" token={token} user={user._id} company={user.company} />        
      </ContainerForm>
    </>
  )
}