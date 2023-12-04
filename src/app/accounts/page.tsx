import Table from "@/components/accounts/Table"
import { getUsers } from "../api/users/route";
import { cookies } from "next/headers";
import ContainerForm from "@/components/ContainerForm";
import ArrowReturn from "@/components/ArrowReturn";
import NavBar from "@/components/Navigation/NavBar";

export default async function Users(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  let users

  try {
    users = await getUsers(token);
  } catch (error) {
    console.log(error);
  }

  let table;

  if(users){
    table = <Table users={users.data.data} token={token} link="/accounts/new" >
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