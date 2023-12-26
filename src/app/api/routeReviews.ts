import axios from "axios";

export async function getProjects() {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  try {
    const res = await axios.get(url);
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al consultar los proyectos!!';
  }
}

export async function getIssues() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/issuelists`;
  try {
    const res = await axios.get(url);
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al consultar los issues';
  }
}

export async function createReview(review:any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews`;
  console.log('backkk')
  console.log(url);
  console.log(JSON.stringify(review));
  try {
    const res = await axios.post(url, JSON.stringify(review));
    if(res.status === 201) return res.status;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un problema al enviar review..';
  }
}