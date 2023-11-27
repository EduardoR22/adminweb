import { cookies } from "next/headers";
import NavBar from "@/components/NavBar";
import ContainerForm from "@/components/ContainerForm";
import Table from "@/components/companies/Table";

export default function companies(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  let companies;

  // let table;

  // if(companies){
  //   table = <Table companies={companies} />
  // }else{
  //   table = <><h1>Error al obtener los datos de las compañias!!!</h1></>
  // }

  return(
    <>
      <NavBar />
      <ContainerForm img="" subtitle="" title="" width="w-7/12 pl-10 pr-5">
        <Table companies={companies} />
      </ContainerForm>
    </>
  )
}