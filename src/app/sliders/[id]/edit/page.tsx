import NavBar from "@/components/Navigation/NavBar";
import ContainerForm from "@/components/ContainerForm";
import FormSlider from "@/components/sliders/FormSlider";
import { cookies } from "next/headers";
import { getSlider } from "@/app/api/sliders/routeSliders";

export default async function Edit({params}: {params: {id: string}}){
  
  const id = params.id;
  const cookiStore = cookies();
  const token = cookiStore.get('token')?.value || '';

  let user;
  user = cookiStore.get('user')?.value;
  if(user) user = JSON.parse(user);
  else return <h1>Error: Inicie sesion para continuar..</h1>

  let slider

  try {
    slider = await getSlider(token, id);
    
    if(typeof(slider) !== 'string'){
      if(slider.status !== 200 ){
        return (
          <h1>Error al obtener registro del slider...</h1>
        )
      }
    }else{
      return <h1>{slider}</h1>
    }    
  } catch (error) {
    console.log(error)
    return <h1>Error al obtener los datos del slider</h1>
  }

  return (
    <>
      <NavBar />
      <ContainerForm title="Actualizar slider" subtitle="Imagenes de slider" img="/image.jpg" width="w-full sm:w-10/12">
        <FormSlider token={token} slider={slider.data.data.data} user={user._id} company={user.company} />
      </ContainerForm>
    </>
  )
}