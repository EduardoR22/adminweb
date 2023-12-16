import { getSlider, getSliders } from "@/app/api/sliders/route";
import { cookies } from "next/headers";
import ViewSlider from "@/components/sliders/ViewSlider";
import NavBar from "@/components/Navigation/NavBar";

export default async function Slider({params}: {params:{id:string}}){
  
  const id = params.id;
  
  const cookiStore = cookies();
  const token = cookiStore.get('token')?.value || '';

  let sliders;
  try {
    sliders = await getSliders(token);
    if(typeof(sliders) !== 'string'){
      const index = sliders.findIndex((slider:any) => slider._id === id);
      return(
        <>
          <NavBar />
          <ViewSlider sliders={sliders} token={token} indexStart={index} />
        </>
      )    
    }else{
      return <h1 className="text-center text-red-500">{sliders}</h1>
    }
  } catch (error) {
    return <h1 className=" text-center text-red-500">Error al consulta sliders</h1>
  }

  // let slider;
  // try {
  //   slider = await getSlider(token, id);
  //   if(typeof(slider) !== 'string'){
  //     return(
  //       <>
  //         <NavBar />
  //         <ViewSlider slider={slider.data.data.data} token={token} />
  //       </>
  //     )    
  //   }else{
  //     console.log(slider);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
}