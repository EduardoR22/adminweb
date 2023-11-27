"use client"

import Alert from "@/components/Alert"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@/components/Button";
import Upload from "@/components/Upload";
import { useState } from "react";
import { createSlider, updateSlider } from "@/app/api/sliders/route";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import {useRouter} from 'next/navigation'

export default function FormSlider({token, slider}: 
                        {token:string, slider: any}){
  
  const router = useRouter();

  let titleS: string = '';
  let linkS: string = '';
  let descriptionS: string = '';

  if(slider !== ''){
    titleS = slider.title;
    linkS = slider.link;
    descriptionS = slider.description;
  }

  const formikPass = useFormik({
    initialValues: {
      title: titleS,
      link: linkS,
      description: descriptionS
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
      const {title, link, description} = valores;
      const data = {
        title,
        link,
        description
      }            
      
      if(slider === ''){
        try {
          let res = await createSlider(data, token);
          if(res === 201) {
            showToastMessage(`Slider ${title} creado exitosamente!`);
            setTimeout(() => {
              router.refresh();
              router.push('/sliders');
            }, 2000)
          } else {
            showToastMessageError('Error al crear slider..');
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        try {
          let res = await updateSlider(token, data, slider._id);
          if(res === 200) {
            showToastMessage(`Slider ${title} actualizado exitosamente!`);
            setTimeout(() => {
              router.refresh();
              router.push('/sliders');
            }, 2000)
          } else {
            showToastMessageError('Error al actualizar slider..');
          }
        } catch (error) {
          console.log(error);
        }
      }
    },       
  });
  
  const [file, setFile] = useState();

  return(
    <>
      <Alert></Alert>
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
                id="description"
                type="text"
                placeholder="Describa el slider"
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
          <Upload setFile={setFile} />
        </div>
        <div className="flex justify-center mt-3">
          <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
        </div>
      </form>
    </>
  )
}