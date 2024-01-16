import axios from "axios";

export async function getServices(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services`;

  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200){
      return res.data.data.data;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un problema al consultar los servicios';
  }
}

export async function createService(auth_token:string, dataService:{name:string}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services`;
  try {
    const res = await axios.post(url, JSON.stringify(dataService), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 201){
      return res.status;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un problema al crear servicio';
  }
}

export async function updateService(auth_token:string, dataService:{name:string}, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/${id}`;

  try {
    const res = await axios.patch(url, JSON.stringify(dataService), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 200){
      return res.status;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un error al actualizar servicio';
  }
}

export async function removeService(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/${id}`;

  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 204){
      return res.status;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un error al eliminar servicio';
  }
}

export async function createServiceImage(auth_token:string, dataService:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/serviceWithLogo`;
  console.log(url);
  console.log(dataService.get('name'));
  console.log(dataService.get('category'));
  try {
    const res = await axios.post(url, dataService, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart-formdata'
      }
    })
    if(res.status === 201) return res.status;
    return 'Error al crear servicio!!';
  } catch (error) {
    return 'Ocurrio un error al crear servicio!!';
  }
}

export async function updateServiceImage(auth_token:string, dataService:FormData, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/updateMeLogo/${id}`;
  try {
    const res = await axios.patch(url, dataService, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart-formdata'
      }
    })
    if(res.status===200) return res.status;
    return 'Error al actualizar servicio!!';
  } catch (error) {
    return 'Ocurrio un error al actualizar servicio!!';
  }
}

export async function getCategorys() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categorys`;
  try {
    const res = await axios.get(url);
    if(res.status===200) return res.data.data.data;
    return 'Error al obtener categorias';
  } catch (error) {
    return 'Ocurrio un error al obtener categorias';
  }
}