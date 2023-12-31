"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createClient, updateClient, createClientPhoto, updateClientLogo } from "@/app/api/clients/routeClient";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Button from "@/components/Button";
import Upload from "@/components/Upload";
import { useState } from 'react';
import Alert from '@/components/Alert';
import { useRouter } from 'next/navigation';

export default function FormClient({name, linkWeb, id, token, user, company}: 
                                    {name:string, linkWeb:string, id:string, 
                                    token: string, user:string, company:string}){
  const [file, setFile] = useState<any>();
  
  const formikPass = useFormik({
    initialValues: {
      client: name,
      link: linkWeb,
    }, 
    validationSchema: Yup.object({
      client: Yup.string()
                  .required('El cliente es obligatorio'),
      link: Yup.string()
                  .required('La direccion web es obligatoria'),
    }),
    
    onSubmit: async valores => {            
      const {client, link} = valores;
      
      const formData = new FormData();
      formData.append("name", client);
      formData.append("link", link);
      formData.append("logo", file);
      formData.append('user', user);
      formData.append('company', company);
      
      const data = {
        "name": client,
        link,
        user,
        company
      }

      if(id === ''){
        try{
          if(file){
            let res = await createClientPhoto(formData, token);
            if(res === 201){
              showToastMessage(`Cliente ${client} creado exitosamente!`);
              setTimeout(() => {
                router.push('/clients');
              }, 2000)
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            }else{
              showToastMessageError(res.toString());
            }
          }else{
            let res = await createClient(data, token);
            if(res === 201 || res === 'success') {
              showToastMessage(`Cliente ${client} creado exitosamente!`);
              setTimeout(() => {
                router.push('/clients')
              }, 2000)
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            } else {
              showToastMessageError(res);
            }
          }
        }catch(e){
          showToastMessageError('Error al agregar cliente..')
        }
      }else{
        try {
          if(file){
            let res = await updateClientLogo(formData, token, id);
            if(res === 200){
              showToastMessage(`El cliente ha sido modificado exitosamente!`);
              setTimeout(() => {
                router.push('/clients')       
              }, 2000)
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            }else{
              showToastMessageError(res.toString());
            }
          }else{
            let res = await updateClient(id, data, token);
            if(res.status === 200 || res.data.status === 'success'){
              showToastMessage(`El cliente ha sido modificado exitosamente!`);
              setTimeout(() => {
                router.push('/clients')       
              }, 2000)
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }else{
              showToastMessageError(res);
            }
          }
        } catch (error) {
          showToastMessageError('Error al modificar cliente..');
        }
      }                            
    },       
  });

  const router = useRouter();

  return(
    <>
      <Alert />
      <form className="w-full bg-white rounded shadow-md sm:px-2 px-4 pt-6 pb-8" 
        onSubmit={formikPass.handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="mb-4 text-gray-700">
              <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500" htmlFor="name">
                Cliente
              </label>
              <input 
                className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="client"
                type="text"
                placeholder="Honda planta celaya"
                autoFocus
                value={formikPass.values.client}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}>
              </input>
            </div>
            {formikPass.touched.client && formikPass.errors.client ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.client}</p>
              </div>
            ) : null}
          </div>
          <div className="w-full">
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="passwordConfirm">
                Sitio Web
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-4 mt-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="link"
                type="text"
                placeholder="https://dominio.com"
                value={formikPass.values.link}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}>
              </input>
            </div>
            {formikPass.touched.link && formikPass.errors.link ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.link}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="">
          <p className="text-gray-500 mb-3 font-medium text-sm">Logotipo</p>
          <Upload setFile={setFile} />
        </div>
        <div className="flex flex-col items-center justify-center mt-3 space-y-3">
          <p className='text-xs font-sans font-thin mt-5'>Adjunte una fotografia con un aspecto cuadrado (640x640 píxeles).</p>
          <Button styleB="rounded-full bg-blue-600 w-36 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
        </div>
      </form>
    </>
  )
}