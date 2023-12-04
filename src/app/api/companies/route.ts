import axios from "axios";

export async function createCompany(auth_token:string, companyData:any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys`;
  
  try {
    const res = await axios.post(url, JSON.stringify(companyData), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    return res.status;
  } catch (error) {
    return 'Ocurrio un problema al crear compania';
  }
}

export async function createCompanyLogo(formCompany:FormData, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/companyWithLogo`;
  try {
    const res = await axios.post(url, formCompany, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    if(res.status === 201){
      return res.status;
    }else{
      return res.statusText;
    }
  } catch (error) {
    return 'Ocurrio un error al crear compañia con logo..';
  }
}

export async function getCompanies(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys`;

  try {
    const companies = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    return companies.data.data.data;
  } catch (error) {
    return 'Error al consultar companies';
  }
}

export async function getCompany(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/${id}`;

  const company = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${auth_token}`
    }
  })

  if(company.status === 200){
    return company.data.data.data;
  }
  return 'No se pudieron obtener los datos de la compañia';
}

export async function updateCompany(auth_token:string, id:string, companyData: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/${id}`;

  console.log(url);
  console.log(auth_token);
  console.log(companyData);

  try {
    const res = await axios.patch(url, companyData, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })

    return res.status;

  } catch (error) {
    return "Ocurrio un problema al actualizar la empresa";
  }
}

export async function updateCompanyLogo(auth_token:string, id:string, companyData:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/updateMeLogo/${id}`;
  try {
    const res = await axios.patch(url, companyData, {
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
    return 'Ocurrio un error al actualiazar logo de la compañia..';
  }
}

export async function removeCompany(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/${id}`;
  
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    return res.status;
  } catch (error) {
    return 'Ocurrio un problema al eliminar compañia';
  }
}