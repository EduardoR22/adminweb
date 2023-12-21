import axios from "axios";

export async function getProyects(auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })
 
  const proyects = await fetch(url, {headers:headers})

  if(!proyects.ok) {      
      //throw new Error('Failed to fetch data')
      return 'Error al consultar proyectos..'
    }
    
  return proyects.json()
}

export async function createProyect(project:any, auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${auth_token}`
    }
  };

  try {            
    const res = await axios.post(url, JSON.stringify(project), config)
    
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

export async function createProyectImage(project:FormData, auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/projectWithImage`;
  
  const config = {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${auth_token}`
    }
  };

  // console.log('url');
  // console.log(url);
  // console.log('data');
  // //console.log(project.get('client'));
  // console.log('service send')
  // console.log(project.getAll('services'));
  //return 300;
  try {            
    const res = await axios.post(url, project, config)
    
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

export async function getProyect(id:string, auth_token:string) {
      
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })

  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  
  const proyect = await fetch(url, {headers:headers})

    if(!proyect.ok) {
     // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
  return proyect.json()
}

export async function removeProyect(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;

  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    return res.status;
  } catch (error) {
    return error
  }
}

export async function removeImageProyect(id:string, auth_token:string, idProyect:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/deleteImageOfProject/${idProyect}/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })

    if(res.status === 204) return res.status;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al eliminar imagen';
  }
}

export async function updateProyect(id:string, data:any, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  
  console.log(url);
  console.log(data);
  
  const config = {
    headers: { 
      'content-type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${auth_token}`
    },
    onUploadProgress: (event:any) => {        
    },
  };
  try {
    const res = await axios.patch(url, data, config);
      return res;    
  } catch (error:any) {
    return error.response.data.message;
  }
}

export async function insertImage(auth_token:string, idProyect:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/insertImageOfProject/${idProyect}`;
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status=== 200) return res.status;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al guardar imagen';
  }
}

export async function getSegments(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/segments`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    console.log(res.status);
    if(res.status === 200){
      return res.data.data.data;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un problema al consultar segmentos';
  }
}