import { cookies } from "next/headers";
import ContainerForm from "@/components/ContainerForm";
import ArrowReturn from "@/components/ArrowReturn";
import { getUsers } from "../api/users/route";
import Table from "@/components/TableSliders";
import NavBar from "@/components/NavBar";

export default async function Sliders(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  const users = await getUsers(token);

  let table;

  if(users){
    table = <Table users={users.data.data} token={token} link="/sliders/new" >
      <ArrowReturn height={30} width={30} url="/" />
    </Table>
  }else{
    table = <><h1>Error al obtener los datos de los usuarios!!!</h1></>
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="" subtitle="" title="" width="w-7/12 pl-10">
        {table}
      </ContainerForm>
    </>
  )
}