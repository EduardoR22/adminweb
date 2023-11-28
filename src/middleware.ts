// //aqui se van a hacer las validaciones de autenticacion de rutas 

import { NextResponse, NextRequest } from "next/server";
//import { jwtVerify } from "jose";

 export async function middleware(request: NextRequest){
   
  const token = request.cookies.get('token');
  let user: any = request.cookies.get('user')?.value || '';
  
  if(token === undefined || user === undefined){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  user = JSON.parse(user);
  
  if(user.role !== 'admin' && (request.url.includes('companies') || request.url.includes('accounts'))){
    return NextResponse.redirect(new URL('/', request.url))
  }

//    try{
//     const {payload} = await jwtVerify(
//         token,
//         new TextEncoder().encode('secret')
//     );

//     return NextResponse.next();
//    }
//    catch(error){
//     console.error(error);
//     return NextResponse.redirect(new URL('/login', request.url))
//    }

    //return NextResponse.next();
 }

 export const config = {
   matcher: ['/', '/accounts/:path*', '/clients/:path*', '/companies/:path*',
              '/contacts/:path*', '/profile/:path*', '/proyects/:path*', '/sliders/:path*'],
 }