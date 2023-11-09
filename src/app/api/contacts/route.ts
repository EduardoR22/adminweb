export async function getContacts(auth_token:string){
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats`;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })
 
  const contacts = await fetch(url, {headers:headers})

  if(!contacts.ok) {      
      throw new Error('Failed to fetch data')
    }
    
  return contacts.json()
}

export async function getContact(id:string, auth_token:string) {
      
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })

  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/${id}`;
  
  const contact = await fetch(url, {headers:headers})

    if(!contact.ok) {
     // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
  return contact.json()
}