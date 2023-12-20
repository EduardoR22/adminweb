"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@/components/Button";
import { createProyect, updateProyect, createProyectImage } from "@/app/api/proyects/route";
import Alert, { showToastMessage, showToastMessageError } from '../Alert';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddImage from './AddImage';

export default function FormNew({token, tittle, subtitle, address, features, seg, id, services, 
                                  user, company, segments, year}: 
                                {token:string, tittle:string, subtitle:string, address:string, 
                                features:string, seg:string, id:string, services:any, 
                                user:string, company:string, segments:any, year:string}){
  
  const [segment, setSegment] = useState<string>(seg === ''? segments[0]._id: seg);
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
        pushFile={pushFile} pushService={pushService} key={countFiles}
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
      year: year
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
      year: Yup.string()
                  .required('El año es obligatorio'),
    }),
    
    onSubmit: async valores => {
      const {features, location, subtitle, title, year} = valores;
   
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('address', location);
      formData.append('segment', segment);
      formData.append('features', features);
      formData.append('user', user);
      formData.append('company', company);
      formData.append('year', year);

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
        user,
        company,
        year        
      };

      if(tittle === ''){
        try{
          if(files){
            console.log('new proyect');
            console.log(formData.getAll('photos'))
            let res = await createProyectImage(formData, token);
            if(res === 201){
              showToastMessage('Proyecto creado exitosamente!');
              router.push('/proyects');
              setTimeout(() => {
                //router.refresh();
                //router.push('/proyects');
                window.location.reload();
              }, 2000);
            }
          }else{
            let res = await createProyect(proyect, token);
            if(res === 201){
              showToastMessage('Proyecto creado exitosamente!');
              setTimeout(() => {
                //router.refresh();
                router.push('/proyects');
              }, 2000);
              setTimeout(() => {
                window.location.reload();
              }, 2500);
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
            //router.refresh();
            router.push('/proyects');
          }, 2000);
          setTimeout(() => {
            window.location.reload();
          }, 2500);
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
      <form className="bg-white rounded shadow-md sm:px-8 pt-6 pb-8" 
        onSubmit={formikPass.handleSubmit}>
        <div className='flex flex-wrap'>
          <div className="w-full sm:w-1/2 px-3 sm-px-5">
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
          </div>
          <div className="w-full sm:w-1/2 px-3 sm-px-5">
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
          </div>
        </div>
        <div className='flex flex-wrap'>
          <div className="w-full sm:w-1/2 px-3 sm-px-5">
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="subtitle">
                Subtitulo
              </label>
              <input 
                className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="subtitle"
                type="text"
                placeholder="Subtitulo"
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
          <div className="w-full sm:w-1/2 px-3 sm-px-5">
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="segment">
                Segmento
              </label>
              <select className="bg-white mt-2 outline-none outline-0 shadow appearance-none border 
                      rounded w-full py-4 px-3 text-base text-gray-500 leading-tight font-sans 
                      font-ligth focus:outline-none focus:shadow-outline"
                onChange={handleSelect}
                value={segment}
              >
                {segments.map((segmen:any, index:number) => (
                  <option value={segmen._id} key={index}>{segmen.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-full sm:w-1/2 px-3 sm-px-5">
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="year">
                Año
              </label>
              <input 
                className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="year"
                type="text"
                placeholder="2015"
                value={formikPass.values.year}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}>
              </input>
            </div>
            {formikPass.touched.year && formikPass.errors.year ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.year}</p>
              </div>
            ) : null}
          </div>
          {/* <div className="w-1/2"></div> */}
        </div>
        <div className="px-3 sm-px-5">
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
        <div className="px-3 sm-px-5">
          {selectFiles}
        </div>
        <div className="flex flex-col items-center justify-center">
        {tittle===''? <p className='text-xs font-sans font-thin mt-5'>Adjunte una fotografia con un aspecto 16:9 (1920×1080 píxeles o 1280×720 píxeles).</p>: ''}
          <Button styleB="rounded-full bg-blue-600 w-36 text-white hover:bg-blue-500 mt-1" textB="Guardar" typeB="submit" />
        </div>
      </form>
      {/* <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" 
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
                placeholder="Subtitulo"
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
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="year">
                Año
              </label>
              <input 
                className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                id="year"
                type="text"
                placeholder="2015"
                value={formikPass.values.year}
                onChange={formikPass.handleChange}
                onBlur={formikPass.handleChange}>
              </input>
            </div>
            {formikPass.touched.year && formikPass.errors.year ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formikPass.errors.year}</p>
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
                {segments.map((segmen:any) => (
                  <option value={segmen._id}>{segmen.name}</option>
                ))}
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
        <div className="flex flex-col items-center justify-center">
        {tittle===''? <p className='text-xs font-sans font-thin mt-5'>Adjunte una fotografia con un aspecto 16:9 (1920×1080 píxeles o 1280×720 píxeles).</p>: ''}
          <Button styleB="rounded-full bg-blue-600 w-36 text-white hover:bg-blue-500 mt-1" textB="Guardar" typeB="submit" />
        </div>
      </form> */}
    </>
  )
}