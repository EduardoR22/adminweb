import FormNew from "@/components/proyects/FormNew";
import ContainerForm from "@/components/ContainerForm";
import { cookies } from "next/headers";
import NavBar from "@/components/NavBar";

export default function New(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  return(
    <>
      <NavBar />
      <ContainerForm img="/img" subtitle="Proyecto a publicar" title="Nuevo Proyecto" width="w-2/3">
        <FormNew token={token} address="" features="" id="" seg="" subtitle="" title="" />
      </ContainerForm>
    </>
  )
}