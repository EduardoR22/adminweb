import ClientsList from "@/components/ClientsList";
import { cookies } from "next/headers";
import ContainerForm from "@/components/ContainerForm";
import ArrowReturn from "@/components/ArrowReturn";
import NavBar from "@/components/Navigation/NavBar";
import { getClients } from "../api/clients/route";

export default async function Clients(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  const clients = await getClients(token);

  let table;

  if(clients){
    table = <ClientsList users={clients.data.data} token={token} link="/clients/new" >
      <ArrowReturn height={30} width={30} url="/" />
    </ClientsList>
  }else{
    table = <><h1>Error al obtener los datos de los usuarios!!!</h1></>
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="" subtitle="" title="" width="w-full md:w-10/12 pl-10">
        {table}
      </ContainerForm>
    </>
  )
}