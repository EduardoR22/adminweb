import axios from "axios";

export async function getIssues(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/issuelists`;
  try {
    const issues = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })

    return issues.data.data.data;
  } catch (error) {
    return error;
  }
}

export async function createIssue(auth_token:string, dataIssue:any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/issuelists`;

  try {
    const issue = await axios.post(url, JSON.stringify(dataIssue), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    return issue.status;
  } catch (error) {
    return "Ocurrio un error al crear issue";
  }
}

export async function updateIssue(auth_token:string, dataIssue:any, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/issuelists/${id}`;

  console.log(url);
  console.log(JSON.stringify(dataIssue));
  try {
    const res = await axios.patch(url, JSON.stringify(dataIssue), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(res.status);
    console.log(res);
    return res.status;
  } catch (error) {
    return 'Ocurrio un error al actualizar issue';
  }
}

export async function removeIssue(id:string, auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/issuelists/${id}`;

  try {
    console.log(url);
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    console.log(res);
    if(res.status === 204) return res.status;
    return 'Error al eliminar usuario';
  } catch (error) {
    return 'Ocurrio un error al eliminar issue';
  }

}