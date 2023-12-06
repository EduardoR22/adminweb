import axios from "axios";

export async function createClient(client:{name:string, link:string}, auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients`;
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${auth_token}`
    }
  };
  try {            
    const res = await axios.post(url, client, config)
    
    if(!res){
      throw new Error('Algo salió mal con la solicitud');
    }else{
      if(res.status === 201) {        
          return 201;
        }        
      }          
      return res.data.status;      
    }catch (error:any) {
    return error;    
  }
}

export async function createClientPhoto(client:FormData, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/clientWithLogo`;
  
  try {
    const res = await axios.post(url, client, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status === 201){
      return res.status;
    }else{
      return 'Error al crear usuario con logotipo';
    }
  } catch (error) {
    return 'Ocurrio un error al crear usuario con logotipo';
  }
}

export async function getClients(auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients`;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })
 
  const users = await fetch(url, {headers:headers})

  if(!users.ok) {      
      throw new Error('Failed to fetch data')
    }
    
  return users.json()
}

export async function removeClient(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;

  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    return res.status;
  } catch (error) {
    return 'Ocurrio un problema al eliminar';
  }
}

export async function updateClient(id:string, clientData:{name:string, link:string}, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    },
    onUploadProgress: (event:any) => {        
    },
  };
  try {
    const res = await axios.patch(url, clientData, config);
      return res;    
  } catch (error:any) {
    return error.response.data.message;
  }
}

export async function updateClientLogo(client:FormData, auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/updateMeLogo/${id}`;
  try {
    const res = await axios.patch(url, client, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status === 200){
      return res.status;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un error al actualizar logo cliente';
  }
}

export async function getClient(id:string, auth_token:string) {
      
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })

  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;
  
  const client = await fetch(url, {headers:headers})

    if(!client.ok) {
     // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
  return client.json()
}