"use client"

import Image from "next/image"
import Alert from "@/components/Alert"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@/components/Button";
import Upload from "@/components/Upload";

export default function New(){
  const formikPass = useFormik({
    initialValues: {
      title: '',
      link: '',
      description: ''
    }, 
    validationSchema: Yup.object({
      title: Yup.string()
                  .required('El cliente es obligatorio'),
      link: Yup.string()
                  .required('La direccion web es obligatoria'),
      description: Yup.string()
                  .required('La descripcion es obligatoria'),
    }),
    
    onSubmit: async valores => {            
      // const {passwordCurrent, password, passwordConfirm} = valores;            
      // let res = await updateMePassword(_id, passwordCurrent, password, passwordConfirm, token);
      // if(res.status === 'success') {
      //   showToastMessage(`Password de ${email} modificado exitosamente!`);
      //   setTimeout(() => {
      //     logOut();
      //   }, 2000)
      // } else {
      //   showToastMessageError(res);
      // }                            
    },       
  });
  
  return(
    <>
      <Alert></Alert>
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
              <p className="text-xl">{'Nuevo slider'}</p>
              <p className="text-gray-500 text-sm">{'Imagenes de slider'}</p>
            </div>
          </div>
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" 
            onSubmit={formikPass.handleSubmit}>
            <div className="flex">
              <div className="w-1/2 px-5">
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-500" htmlFor="name">
                    Titulo
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Honda planta celaya"
                    value={formikPass.values.title}
                    onChange={formikPass.handleChange}
                    onBlur={formikPass.handleChange}>
                  </input>
                </div>
                {formikPass.touched.title && formikPass.errors.title ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>{formikPass.errors.title}</p>
                  </div>
                ) : null}
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-500" htmlFor="name">
                    Link
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
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
              <div className="w-1/2">
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-500" htmlFor="passwordConfirm">
                    Descripcion
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-4 mt-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                    id="link"
                    type="text"
                    placeholder="https://dominio.com"
                    value={formikPass.values.description}
                    onChange={formikPass.handleChange}
                    onBlur={formikPass.handleChange}>
                  </input>
                </div>
                {formikPass.touched.description && formikPass.errors.description ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p>{formikPass.errors.description}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="px-4">
              <p className="text-gray-500 mb-3 font-medium text-sm">Fotografias</p>
              <Upload />
            </div>
            <div className="flex justify-center mt-3">
              <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
            </div>
          </form>          
        </div>                        
      </div>
    </>
  )
}