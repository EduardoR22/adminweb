import { getSlider } from "@/app/api/sliders/route";
import { cookies } from "next/headers";
import ViewSlider from "@/components/sliders/ViewSlider";

export default async function Slider({params}: {params:{id:string}}){
  
  const id = params.id;
  
  const cookiStore = cookies();
  const token = cookiStore.get('token')?.value || '';

  let slider;
  try {
    slider = await getSlider(token, id);
    if(typeof(slider) !== 'string'){
      return(
        // <ViewSlider slider={"lll"} />
        <ViewSlider slider={slider.data.data.data} token={token} />
      )    
    }else{
      console.log(slider);
    }
  } catch (error) {
    console.log(error);
  }

  // return(
  //   <ViewSlider slider={slider} />
  // )
}