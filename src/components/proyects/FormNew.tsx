"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@/components/Button";
import { createProyect, updateProyect } from "@/app/api/proyects/route";
import Alert, { showToastMessage, showToastMessageError } from '../Alert';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddImage from './AddImage';

export default function FormNew({token, tittle, subtitle, address, features, seg, id}: 
                                {token:string, tittle:string, subtitle:string, 
                                address:string, features:string, seg:string, id:string}){
  
  //const [segment, setSegment] = useState<string>('industrial');
  const [segment, setSegment] = useState<string>(seg === ''? 'INDUSTRIAL': seg);
  const [upFiles, setUpFiles] = useState([]);
  const [countFiles, setCountFiles] = useState(0);
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([])

  const pushFile = (file: any) => {
    setFiles(((oldFile) => [...oldFile, file] ));
  }

  const pushCategory = (cat: string) => {
    setCategories((oldCat) => [...oldCat, cat])
  }

  const printFiles = () => {
    files.map(f => {
      console.log('ffff');
      console.log(f);
    })
    console.log(categories);
    //console.log(files);
  }

  const router = useRouter();
  
  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    setUpFiles((oldArray) => [...oldArray, <AddImage updateCount={updateCount} 
                                pushFile={pushFile} pushCategory={pushCategory}
                              />])
  }, [countFiles])

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
          console.log('create proyect')
          let res = await createProyect(proyect, token);
          if(res === 201){
            showToastMessage('Proyecto creado exitosamente!');
            setTimeout(() => {
              router.refresh();
              router.push('/proyects');
            }, 2000);
          }
        }catch{
          showToastMessageError('Error al crear proyecto..');
        }
      }else{
        console.log('update proyect')
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
      <button onClick={printFiles}>print</button>
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
          {upFiles.map((elements) => (
            elements
          ))}
          {/* <AddImage /> */}
          {/* <label htmlFor="" className='text-gray-500 mb-3'>Fotografias</label>
          <div className='border-2 border-dashed rounded-md border-gray-200 relative p-4 w-full'>
            <input 
              type="file" 
              id="photo" 
              name="photo" 
              multiple
              className="opacity-0 absolute inset-0	">                                            
            </input>
            <p className='text-center	'>Subir fotos</p>
          </div> */}
        </div>
        <div className="flex justify-center mt-3">
          <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
        </div>
      </form>
    </>
  )
}