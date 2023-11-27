import { cookies } from "next/headers"
import FormAccount from "@/components/accounts/FormAccount";
import ContainerForm from "@/components/ContainerForm";
import NavBar from "@/components/NavBar";

export default function New(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  return(
    <>
      <NavBar />
      <ContainerForm img="/public/algo.jpg" subtitle="Creacion de nueva cuenta" 
                      title="Nueva Cuenta" width="w-2/3"
      >
        <FormAccount token={token} />
      </ContainerForm>
    </>
  )
}