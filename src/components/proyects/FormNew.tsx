"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@/components/Button";
import { createProyect, updateProyect, createProyectImage } from "@/app/api/proyects/route";
import Alert, { showToastMessage, showToastMessageError } from '../Alert';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddImage from './AddImage';

export default function FormNew({token, tittle, subtitle, address, features, seg, id, services}: 
                                {token:string, tittle:string, subtitle:string, address:string, 
                                features:string, seg:string, id:string, services:any}){
  
  const [segment, setSegment] = useState<string>(seg === ''? 'INDUSTRIAL': seg);
  const [upFiles, setUpFiles] = useState<any[]>([]);
  const [countFiles, setCountFiles] = useState(0);
  const [files, setFiles] = useState<any[]>([]);
  const [arrServices, setArrServices] = useState<string[]>([])

  const pushFile = (file: any) => {
    setFiles(((oldFile) => [...oldFile, file] ));
  }

  const pushService = (serv: string) => {
    setArrServices((oldServ) => [...oldServ, serv])
  }

  const router = useRouter();
  
  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    if(services !== ''){
      setUpFiles((oldArray) => [...oldArray, <AddImage updateCount={updateCount} 
        pushFile={pushFile} pushService={pushService}
        services={services}
      />])
    }
  }, [countFiles])

  const selectFiles = upFiles.map((elements) => (
    elements
  ))

  const formikPass = useFormik({
    initialValues: {
      title: tittle,
      subtitle: subtitle,
      location:address,
      features: features,
    }, 
    validationSchema: Yup.object({
      title: Yup.string()
                  .required('El titulo es obligatorio'),
      subtitle: Yup.string()
                  .required('El subtitle es obligatorio'),
      location: Yup.string()
                  .required('La ubicacion es obligatoria'),
      features: Yup.string()
                  .required('Las caracteristicas son obligatorias'),
    }),
    
    onSubmit: async valores => {
      const {features, location, subtitle, title} = valores;
   
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('address', location);
      formData.append('segment', segment);
      formData.append('features', features);
      
      files.map((file:any) => {
        formData.append('photos', file);
      })
      
      arrServices.map((service:string) => {
        formData.append('services', service);
      })

      const proyect = {
        title,
        subtitle,
        'address': location,
        segment,
        features,
        'images': '/public/prject.jpg'
      };

      if(tittle === ''){
        try{
          if(files){
            let res = await createProyectImage(formData, token);
            if(res === 201){
              showToastMessage('Proyecto creado exitosamente!');
              setTimeout(() => {
                router.refresh();
                router.push('/proyects');
              }, 2000);
            }
          }else{
            let res = await createProyect(proyect, token);
            if(res === 201){
              showToastMessage('Proyecto creado exitosamente!');
              setTimeout(() => {
                router.refresh();
                router.push('/proyects');
              }, 2000);
            }
          }
        }catch{
          showToastMessageError('Error al crear proyecto..');
        }
      }else{
        let res = await updateProyect(id, JSON.stringify(proyect), token)
        if(res.status === 200){
          showToastMessage('Proyecto modificado exitosamente!');
          setTimeout(() => {
            router.refresh();
            router.push('/proyects');
          }, 2000);
        }
      }                                  
    },       
  });
  
  const handleSelect = (event: any) => {
    const target = event.target as HTMLButtonElement;
    setSegment(target.value);
  }

  return(
    <>
      <Alert/>
      <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" 
        onSubmit={formikPass.handleSubmit}>
        <div className="flex">
          <div className="w-1/2 px-5">
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="title">
                Titulo
              </label>
              <input 
                className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Honda Planta Celaya"
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
              <label className="block text-sm font-medium text-gray-500" htmlFor="subtitle">
                Subtitulo
              </label>
              <input 
                className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="subtitle"
                type="text"
                placeholder="45,000 m2"
                value={formikPass.values.subtitle}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}>
              </input>
            </div>
            {formikPass.touched.subtitle && formikPass.errors.subtitle ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.subtitle}</p>
              </div>
            ) : null}
          </div>
          <div className="w-1/2">
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="location">
                Ubicacion
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-4 px-3 mt-2 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="Celaya Gto."
                value={formikPass.values.location}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}>
              </input>
            </div>
            {formikPass.touched.location && formikPass.errors.location ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.location}</p>
              </div>
            ) : null}
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="segment">
                Segmento
              </label>
              <select className="bg-white mt-2 outline-none outline-0 shadow appearance-none border 
                      rounded w-full py-4 px-3 text-base text-gray-500 leading-tight font-sans 
                      font-ligth focus:outline-none focus:shadow-outline"
                onChange={handleSelect}
              >
                <option value="INDUSTRIAL">Industrial</option>
                <option value="OTRO">Algun otro</option>
              </select>
            </div>
          </div>
        </div>
        <div className="pl-5">
          <label className="block text-sm font-medium text-gray-500" htmlFor="features">
            Caracteristicas
          </label>
          <textarea name="features" id="features" 
            value={formikPass.values.features}
            onChange={formikPass.handleChange}
            onBlur={formikPass.handleChange} 
            className="w-full resize-none border border-gray-300 outline-none outline-0 mt-2 p-3 overflow-hidden " 
          />
        </div>
        {formikPass.touched.features && formikPass.errors.features ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formikPass.errors.features}</p>
          </div>
        ) : null}
        <div className="pl-5">
          {selectFiles}
        </div>
        <div className="flex justify-center mt-3">
          <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
        </div>
      </form>
    </>
  )
}