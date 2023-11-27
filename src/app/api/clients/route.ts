import axios from "axios";

export async function createClient(user:any, auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients`;
  const config = {
    headers: { 
      //'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${auth_token}`
    }
  };
  try {            
    const res = await axios.post(url, user, config)
    
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
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }
  };
  try {            
    const res = await fetch(url, requestOptions)
    .then( (response) => {      
      if(!response.ok){          
        throw new Error('Algo salió mal con la solicitud');                      
      } else {
        if(response.status === 204) {        
            return 204;
          }        
        }          
        return response.status;
      })
      .catch( (err) => {          
        console.log(err);
      });
  } catch (error:any) {
    return error;    
  }
}

export async function updateClient(id:string, userData:any, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients/${id}`;
  const config = {
    headers: { 
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    },
    onUploadProgress: (event:any) => {        
    },
  };
  try {
    const res = await axios.patch(url, userData, config);
      return res;    
  } catch (error:any) {
    return error.response.data.message;
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