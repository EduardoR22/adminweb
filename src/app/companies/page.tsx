import { cookies } from "next/headers";
import NavBar from "@/components/NavBar";
import ContainerForm from "@/components/ContainerForm";
import Table from "@/components/companies/Table";
import { getCompanies } from "../api/companies/route";

export default async function companies(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  let companies;

  try {
    companies = await getCompanies(token);
    if(companies === null){
      return <>Ocurrio un error al obtener los datos de las compañias</>
    }
  } catch (error) {
    console.log(error)
  }
  
  return(
    <>
      <NavBar />
      <ContainerForm img="" subtitle="" title="" width="w-7/12 pl-10 pr-5">
        <Table companies={companies} token={token} />
      </ContainerForm>
    </>
  )
}