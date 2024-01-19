import ContainerForm from "@/components/ContainerForm"
import FormSlider from "@/components/sliders/FormSlider"
import NavBar from "@/components/Navigation/NavBar";
import { cookies } from "next/headers";
import { getCategorys } from "@/app/api/services/routeServices";

export default async function New(){
  
  const cookiStore = cookies();
  const token = cookiStore.get('token')?.value || '';

  let user;
  user = cookiStore.get('user')?.value;
  if(user) user = JSON.parse(user);
  else return <h1>Error: Inicie sesion para continuar..</h1>

  let categories;
  try {
    categories = await getCategorys();
  } catch (error) {
    return <h1>Error al consultar categorias!!</h1>
  }

  return(
    <>
      <NavBar />
      <ContainerForm title="Nuevo slider" subtitle="Imagenes de slider" width="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 2xl:w-1/3" img="/image.jpg">
        <FormSlider token={token} slider='' user={user._id} company={user.company} categories={categories} />
      </ContainerForm>
    </>
  )
}