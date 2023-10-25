import axios from "axios";

export async function setLogin(email:string, password:string) {    
  
  const userData = {
    email,
    password
  };      
  const url=`${process.env.NEXT_PUBLIC_API_URL}/login`;
  try {
    const response = await axios.post(url, userData);
    
    return response.data;

  } catch (error:any) {
    
    const errorMsg : string = error.message;

    if(errorMsg.includes('401'))
      return "El usuario o contrasena son incorrectos";

    return error.message;
  }   
}

export async function forgotPassword(email:string) {
  
  const userData = {
    email,
  };
  const url=`${process.env.NEXT_PUBLIC_API_URL}/forgotPassword`;
  try {
    const res = await axios.post(url, userData);    
    return res.data;    
  } catch (error:any) {
    return error.response.data.message;
  }   
}

export async function resetPassword(id:string, data:any) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/resetPassword/${id}`;
  const config = {
    headers: { 
      'Content-Type': 'application/json',
    },
    onUploadProgress: (event:any) => {        
    },
  };
  
  try {
    const res = await axios.patch(url, JSON.stringify(data), config);
    
    return res.status;    
  } catch (error:any) {
    return 'Error al cambiar la contraseña...';
  }
}

export async function getUser(id:string, auth_token:string) {
      
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })

  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
  
  const user = await fetch(url, {headers:headers})

    if(!user.ok) {
     // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
  return user.json()
}

export async function updateMePassword(id:string, passwordCurrent:string, password:string, passwordConfirm:string, auth_token:string) {
    
  const userData = {
    passwordCurrent,
    password,    
    passwordConfirm    
  };

  const config = {headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  }}

  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/updatePassword/${id}`;
  try {
    const res = await axios.patch(url, userData, config);
      return res.data;    
  } catch (error:any) {
    return error.response.data.message;
  }
}

export async function updateMeUser(id:string, userData:any, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/updateMe/${id}`;
  const config = {
    headers: { 
      'Content-Type': 'multipart/form-data',
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

export async function getUsers(auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`;

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

export async function removeUser(id:string, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
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