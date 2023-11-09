import ContainerForm from "@/components/ContainerForm";
import FormClient from "@/components/client/FormClient";
import { cookies } from "next/headers"

export default function New(){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';
  
  return(
    <>
      <ContainerForm img="/profile" subtitle="Cambiar contraseña" title="Usuario" width="w-full max-w-sm">
            <FormClient name="" id="" linkWeb="" token={token} />        
      </ContainerForm>
    </>
  )
}