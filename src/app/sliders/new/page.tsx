import ContainerForm from "@/components/ContainerForm"
import FormSlider from "@/components/sliders/FormSlider"
import NavBar from "@/components/Navigation/NavBar";
import { cookies } from "next/headers";

export default function New(){
  
  const cookiStore = cookies();
  const token = cookiStore.get('token')?.value || '';

  return(
    <>
      <NavBar />
      <ContainerForm title="Nuevo slider" subtitle="Imagenes de slider" width="w-2/3" img="/profile">
        <FormSlider token={token} slider='' />
      </ContainerForm>
    </>
  )
}