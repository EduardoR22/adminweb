import { cookies } from "next/headers"
import FormAccount from "@/components/accounts/FormAccount";
import ContainerForm from "@/components/ContainerForm";
import NavBar from "@/components/Navigation/NavBar";
import { getCompanies } from "@/app/api/companies/route";

export default async function New(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let companies;
  try {
    companies = await getCompanies(token);

    if(!companies) return <h1>Error: no se encontraron compañias..</h1>
  } catch (error) {
    return <h1>Ocurrio un error al consultar las compañias..</h1>
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="/account.jpg" subtitle="Creacion de nueva cuenta" 
                      title="Nueva Cuenta" width="w-full md:w-2/3"
      >
        <FormAccount token={token} companies={companies} />
      </ContainerForm>
    </>
  )
}