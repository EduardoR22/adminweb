import ContainerForm from "@/components/ContainerForm";
import FormClient from "@/components/client/FormClient";
import { cookies } from "next/headers"
import { getClient } from "@/app/api/clients/route";
import NavBar from "@/components/Navigation/NavBar";

export default async function Edit({ params }: { params: { id: string } }){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';
  let user;
  user = cookieStore.get('user')?.value;
  if(user) user = JSON.parse(user);
  else return <h1>Error: Inicie sesion para continuar..</h1>

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
      <ContainerForm img="/clients.jpg" subtitle="Actualizar cliente" title="Cliente" 
                    width="w-full max-w-sm">
            <FormClient name={client.name} id={id} linkWeb={client.link} 
                        token={token} user={user._id} company={user.company} /> 
      </ContainerForm>      
    </>
  )
}