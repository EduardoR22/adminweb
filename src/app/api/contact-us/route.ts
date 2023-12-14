import axios from "axios";

export async function getContactUs(auth_token:string, status:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts/get-contacts-by-status/${status}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al consultar los mensajes..';
  }
}

export async function updateContactUs(auth_token:string, data:any, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts/${id}`;
  console.log(url);
  console.log(JSON.stringify(data));
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    })
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al actualizar estado del contacto..';
  }
}