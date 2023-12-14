import axios from "axios";

export async function getReviews(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al consultar reviews';
  }
}

export async function getReviewsByProyect(auth_token:string, idProyect:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews/getReviewsByProject/${idProyect}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un error al consultar los reviews del proyecto';
  }
}

export async function updateReview(auth_token:string, id:string, data:any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews/${id}`;

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
    return 'Ocurrio un problema al actualizar review';   
  }
}