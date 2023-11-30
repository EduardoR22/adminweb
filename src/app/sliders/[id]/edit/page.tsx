import NavBar from "@/components/NavBar";
import ContainerForm from "@/components/ContainerForm";
import FormSlider from "@/components/sliders/FormSlider";
import { cookies } from "next/headers";
import { getSlider } from "@/app/api/sliders/route";

export default async function Edit({params}: {params: {id: string}}){
  
  const id = params.id;
  const cookiStore = cookies();
  const token = cookiStore.get('token')?.value || '';

  let slider

  try {
    slider = await getSlider(token, id);
    
    if(slider.status !== 200 ){
      return (
        <h1>Error al obtener registro del slider...</h1>
      )
    }
    
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <NavBar />
      <ContainerForm title="Actualizar slider" subtitle="Imagenes de slider" img="/profile" width="w-2/3">
        <FormSlider token={token} slider={slider.data.data.data} />
      </ContainerForm>
    </>
  )
}