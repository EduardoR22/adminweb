import axios from "axios";

export async function getSliders(auth_token: string){
  
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sliders`;
  
  const sliders = await axios.get(url, {
    headers: {
      Authorization: `bearer ${auth_token}`,
    }
  })  
  return sliders.data.data.data;
}

export async function getSlider(auth_token: string, id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sliders/${id}`;

  const slider = await axios.get(url, {
    headers: {
      Authorization: `bearer ${auth_token}`,
    }
  })

  if(slider.status === 200){
    return slider;
  }
  
  return 'Error al obtener slider..';
  
}

export async function createSlider(dataSlider: any, auth_token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sliders`;

  const slider = await axios.post(url, JSON.stringify(dataSlider), {
    headers: {
      'Authorization': `bearer ${auth_token}`,
      'content-type': 'application/json'
    }
  })

  return slider.status;
}

export async function updateSlider(auth_token:string, dataSlider: any, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sliders/${id}`;

  const res = await axios.patch(url, JSON.stringify(dataSlider), {
    headers: {
      'Authorization': `bearer ${auth_token}`,
      'Content-Type': 'application/json'
    }
  })

  return res.status;
}

export async function removeSlider(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sliders/${id}`;

  const res = await axios.delete(url, {
    headers: {
      'Authorization': `bearer ${auth_token}`
    }
  })

  return res.status;
}