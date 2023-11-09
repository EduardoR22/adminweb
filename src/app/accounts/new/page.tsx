// import Image from "next/image"
// import Alert from "@/components/Alert"
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Button from "@/components/Button";
// import { useState} from "react";
// import { showToastMessageError, showToastMessage } from "@/components/Alert";
// import { createUser } from "@/app/api/users/route";
// import { getCookie } from "cookies-next";

import { cookies } from "next/headers"
import FormAccount from "@/components/accounts/FormAccount";
import ContainerForm from "@/components/ContainerForm";

export default function New(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  // const [role, setRol] = useState<string>('');
  // const [file, setFile] : any = useState();
  
  // const token = getCookie('token')?.toString() || '';
  
  // const formikPass = useFormik({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     password:'',
  //     passwordConfirm:'',
  //   }, 
  //   validationSchema: Yup.object({
  //     name: Yup.string()
  //                 .required('El nombre es obligatorio'),
  //     email: Yup.string()
  //                 .required('El email es obligatorio'),
  //     password: Yup.string()
  //                 .required('La contraseña es obligatoria')
  //                 .min(6, 'Contraseña de almenos 6 caracteres'),
  //     passwordConfirm: Yup.string()
  //                 .required('La contraseña es obligatoria')
  //                 .min(6, 'Contraseña de almenos 6 caracteres'),
  //   }),
    
  //   onSubmit: async valores => {            
  //     const {email, name, password, passwordConfirm} = valores;
  //     // const formData = new FormData();
  //     // formData.append('name', name);
  //     // formData.append('email', email);
  //     // formData.append('password', password);
  //     // formData.append('passwordConfirm', passwordConfirm);
  //     // formData.append('rol', rol);
  //     // formData.append("company", "64fc0c23d0cdf022cf6eac3a");
  //     // formData.append('photo', file);
      
  //     const user = {
  //       name,
  //       email,
  //       password,
  //       passwordConfirm,
  //       role,
  //       'company': "64fc0c23d0cdf022cf6eac3a",
  //       'photo': '/public/img/users/default.jpg'
  //     }
      
  //     //let res = await createUser(formData, token);
  //     let res = await createUser(user, token);
  //     if(res.status === 'success') {
  //       showToastMessage(`Password de ${email} modificado exitosamente!`);
  //     } else {
  //       showToastMessageError(res);
  //     }                            
  //   },       
  // });

  // const handleSelect = (event: any) => {
  //   const target = event.target as HTMLButtonElement;
  //   setRol(target.value);
  // }

  // const onFileChange = (e: any) => {

  //   if(e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     if(file.type.includes("image")) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       setFile(file);
  //     } else {
  //       showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
  //     }
  //   }
  // }

  return(
    <>
      <ContainerForm img="/public/algo.jpg" subtitle="Creacion de nueva cuenta" 
                      title="Nueva Cuenta" width="w-2/3"
      >
        <FormAccount token={token} />
      </ContainerForm>
      {/* <Alert></Alert>
      <div className="flex justify-center mt-6">
        <div className="w-2/3 shadow-2xl shadow-slate-300">
          <div className="flex mt-2 pl-7">
            <Image    
              className="rounded-full"                      
              // src={`/img/users/${photo}`}
              src={'/profile'}
              alt={'prifile'}
              width={50}
              height={50}                                    
              priority={true}                                    
            />
            <div>
              <p className="text-xl">{'Nueva Cuenta'}</p>
              <p className="text-gray-500 text-sm">{'Creacion de nueva cuenta'}</p>
            </div>
          </div> */}
          {/* <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" 
            onSubmit={formikPass.handleSubmit}>
            <div className="flex">
              <div className="w-1/2 px-5">
                <div className="mb-4 text-gray-700">
                  <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500" htmlFor="name">
                    Nombre
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="juan Perez"
                    value={formikPass.values.name}
                    onChange={formikPass.handleChange}
                    onBlur={formikPass.handleChange}>
                  </input>
                </div>
                {formikPass.touched.password && formikPass.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>{formikPass.errors.password}</p>
                  </div>
                ) : null}
                <div className="mb-4 text-gray-700">
                  <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500" htmlFor="email">
                    Usuario
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="email@gmail.com"
                    value={formikPass.values.email}
                    onChange={formikPass.handleChange}
                    onBlur={formikPass.handleChange}>
                  </input>
                </div>
                {formikPass.touched.password && formikPass.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>{formikPass.errors.password}</p>
                  </div>
                ) : null}
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-500" htmlFor="email">
                    Perfil
                  </label>
                  <select className="bg-white mt-2 outline-none outline-0 shadow appearance-none 
                          border rounded w-full py-4 px-3 text-base text-gray-500 leading-tight 
                          font-sans font-ligth focus:outline-none focus:shadow-outline"
                    onChange={handleSelect}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-500" htmlFor="password">
                    Contraseña
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-4 px-3 mt-2 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="****"
                    value={formikPass.values.password}
                    onChange={formikPass.handleChange}
                    onBlur={formikPass.handleChange}>
                  </input>
                </div>
                {formikPass.touched.password && formikPass.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>{formikPass.errors.password}</p>
                  </div>
                ) : null}
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-500" htmlFor="passwordConfirm">
                    Confirmar Contraseña
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-4 mt-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                    id="passwordConfirm"
                    type="password"
                    placeholder="****"
                    value={formikPass.values.passwordConfirm}
                    onChange={formikPass.handleChange}
                    onBlur={formikPass.handleChange}>
                  </input>
                </div>
                {formikPass.touched.passwordConfirm && formikPass.errors.passwordConfirm ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>{formikPass.errors.passwordConfirm}</p>
                  </div>
                ) : null}
                <div className="space-y-1 justify-center">
                  <div className="shrink-0 self-center">
                      <label htmlFor="" className='text-gray-500 mb-3'>Foto</label>
                      <div className='flex'>
                        <Image    
                            className="rounded-full"                      
                            src={'/photo'}
                            alt={'nameU'}
                            width={56}
                            height={56}                                    
                            priority={true}                                    
                        />
                        <div className='border rounded-md border-gray-200 relative p-4 w-5/6'>
                          <input 
                            type="file" 
                            id="photo" 
                            name="photo" 
                            //value={formik.values.photo}
                            onChange={onFileChange}
                            //onBlur={formik.handleChange}
                            className="opacity-0 absolute inset-0	">                                            
                          </input>
                          <p className='text-center	'>Cambiar Foto</p>
                        </div>  
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
            </div>
          </form>           */}
        {/* </div>                        
      </div> */}
    </>
  )
}