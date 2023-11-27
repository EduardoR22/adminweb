import ContainerForm from "@/components/ContainerForm"
import FormCompany from "@/components/companies/FormCompany"
import { cookies } from "next/headers"
import NavBar from "@/components/NavBar";

export default function New(){
  
  const cookiStore = cookies();
  const token = cookiStore.get('token')?.value || '';
  
  return(
    <>
      <NavBar />
      <ContainerForm img="/company.jpg" title="Nueva empresa" subtitle="Creacion de nueva empresa" 
        width="2/3">
          <FormCompany token={token} />
      </ContainerForm>
    </>
  )
}