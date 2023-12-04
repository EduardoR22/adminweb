import ContainerForm from "@/components/ContainerForm";
import FormClient from "@/components/client/FormClient";
import { cookies } from "next/headers"
import { getClient } from "@/app/api/clients/route";
import NavBar from "@/components/Navigation/NavBar";

export default async function Edit({ params }: { params: { id: string } }){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';
  
  const id = params.id;
  let client;

  try {
    const res = await getClient(id, token);
    if(!res){
      return(
        <div className="flex justify-center">
          <h1 className="font-bold text-3xl text-gray-700">Error el cliente no pudo ser encontrado..</h1>
        </div>
      )
    }else{
      client = res.data.data;
    }
  } catch (error) {
    
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="/profile" subtitle="Cambiar contraseña" title="Usuario" width="w-full max-w-sm">
            <FormClient name={client.name} id={id} linkWeb={client.link} token={token} />        
      </ContainerForm>      
    </>
  )
}