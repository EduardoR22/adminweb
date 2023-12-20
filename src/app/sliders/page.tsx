import { cookies } from "next/headers";
import ContainerForm from "@/components/ContainerForm";
import ArrowReturn from "@/components/ArrowReturn";
import Table from "@/components/sliders/TableSliders";
import NavBar from "@/components/Navigation/NavBar";
import { getSliders } from "../api/sliders/route";

export default async function Sliders(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  let sliders;

  try {
    sliders = await getSliders(token);
  } catch (error) {
    
  }

  let table;

  if(sliders){
    table = <Table sliders={sliders} token={token} link="/sliders/new" >
      <ArrowReturn height={30} width={30} url="/" />
    </Table>
  }else{
    table = <><h1>Error al obtener los sliders!!!</h1></>
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="" subtitle="" title="" width="w-full md:w-9/12 pl-2 md:pl-10">
        {table}
      </ContainerForm>
    </>
  )
}