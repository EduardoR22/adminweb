import { getCompany } from "@/app/api/companies/routeCompanies"
import { cookies } from "next/headers";
import NavBar from "@/components/Navigation/NavBar";
import ContainerForm from "@/components/ContainerForm";
import FormCompany from "@/components/companies/FormCompany";

export default async function Edit({params}: {params:{id:string}}){
  
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let company;
  try {
    company = await getCompany(token, id)
    if(typeof(company) === 'string'){
      return <h1>{company}</h1>
    }
  } catch (error) {
    console.log(error);
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="/company.jpg" title="Actualizar empresa" subtitle="Actualizacion de empresa" 
        width="2/3">
          <FormCompany token={token} company={company} />
      </ContainerForm>
    </>
  )
}