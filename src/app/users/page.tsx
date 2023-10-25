import Table from "@/components/Table"
import { getUsers } from "../api/users/route";
import { cookies } from "next/headers";

export default async function Users(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  const users = await getUsers(token);

  let table;

  if(users){
    table = <Table users={users.data.data} token={token} />
  }else{
    table = <><h1>Error al obtener los datos de los usuarios!!!</h1></>
  }

  return(
    table
  )
}