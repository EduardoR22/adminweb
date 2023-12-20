"use client"

import Image from 'next/image'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "@/components/Alert";
import { updateMeUser} from '@/app/api/users/route';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import Button from '../Button';

export default function FormEditUser({usr, token} : {usr:any, token: string}){
  const photo:string = usr.data.data.photo;
  const nameU:string = usr.data.data.name;
  const emailU:string = usr.data.data.email;
  const _id = usr.data.data._id;
  const [file, setFile] : any = useState();
  
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email:emailU,
      name:nameU,
      photo:'',      
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      //const {email, name, photo } = valores;                        
      const {email, name} = valores;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', file);      
      
      let res = await updateMeUser(_id, formData, token);
      if(res.status === 200) {
        showToastMessage(`Usuario ${name} modificado exitosamente!`);            
        setCookie('user', res.data.data.user);
        setTimeout(() => {
          //setBandUpdate(true);
          router.refresh();
          router.push('/');
        }, 1000)
      } else {
        showToastMessageError(res);
      }                            
    },       
  });
  const onFileChange = (e: any) => {

      if(e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if(file.type.includes("image")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          setFile(file);
        } else {
          showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
        }
      }
  }

  return (
    <form className="bg-white rounded shadow-md px-8 pt-6 pb-3" encType="multipart/form-data" onSubmit={formik.handleSubmit}>                            
      <div className="mb-4">
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500 mb-3" htmlFor="name">
          Nombre
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-xs md:text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
          id="name"
          type="text"                                
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}>
        </input>
      </div>
      {formik.touched.name && formik.errors.name ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{formik.errors.name}</p>
        </div>
      ) : null}
      <div className="mb-4 text-gray-700">
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500 mb-3" htmlFor="email">
          Usuario/Email
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-xs md:text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}>
        </input>
      </div>
      {formik.touched.email && formik.errors.email ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formik.errors.email}</p>
          </div>
      ) : null}
      <div className="space-y-1 justify-center">
        <div className="shrink-0 self-center">
            <label htmlFor="" className='text-gray-500 mb-3'>Foto</label>
            <div className='flex'>
              <Image    
                  className="rounded-full"                      
                  src={photo}
                  alt={nameU}
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
                  onBlur={formik.handleChange}
                  className="opacity-0 absolute inset-0	">                                            
                </input>
                <p className='text-center	'>Cambiar Foto</p>
              </div>  
            </div>
        </div>
      </div>
      <Button textB='Guardar' typeB='submit' 
        styleB='w-36 mt-5 border border-blue-600 bg-blue-600 text-white transition-colors hover:bg-blue-500' 
      />
    </form>      
  );
}
