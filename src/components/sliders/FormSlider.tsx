"use client"

import Alert from "@/components/Alert"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@/components/Button";
import Upload from "@/components/Upload";
import { useState, useEffect } from "react";
import { createSlider, updateSlider, createSliderImage, updateSliderImage } from "@/app/api/sliders/route";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import {useRouter} from 'next/navigation'
import SelectText from "../SelectText";

export default function FormSlider({token, slider, user, company}: 
                        {token:string, slider: any, user:string, company:string}){
  
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [features, setFeatures] = useState<string[]>([])
  const [countFiles, setCountFiles] = useState(0);
  const [upFeatures, setUpFeatures] = useState<any[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);

  let titleS: string = '';
  let linkS: string = '';
  
  const pushFeature = (feat: string) => {
    setFeatures((oldFeat) => [...oldFeat, feat])
  }
  
  if(slider !== ''){
    titleS = slider.title;
    linkS = slider.link;
  }
  
  const deleteFeature = (index:number) => {
    setIndexDelete(index);
  }

  useEffect(() => {
    if(indexDelete !== -1){
      const arrFeatures = features;
      arrFeatures.splice(indexDelete, 1, '');
      setFeatures(arrFeatures);
      
      const arrElements = upFeatures;
      arrElements.splice(indexDelete, 1, <></>);
      setUpFeatures(arrElements);
      setCountFiles(countFiles - 1);
    }
  }, [indexDelete])

  useEffect(() => {
    if(slider !== ''){
      slider.features.map((feature:string, index:number) => {
        let bandShow = true;
        if(index === 5) bandShow=false;
        setUpFeatures((oldArray) => [...oldArray, <SelectText pushText={pushFeature} index={upFeatures.length} 
          deleteFeature={deleteFeature} updateCount={updateCount} valueFeat={feature} 
          bandPlus={index === slider.features.length-1 ? true: false} bandShow={bandShow} />])
      })
    }
  },[])

  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    let bandShow = true; 
    if((slider === '' && countFiles === 4) || (slider !== '' && (countFiles + slider.features.length === 5)) ) bandShow = false;
    if((slider === "" && countFiles < 5 && (countFiles === features.length)) 
              || (slider !== '' && (countFiles !== 0 || slider.features.length === 0) 
              && (features.length >= slider.features.length) 
              && ((countFiles + slider.features.length) <= 5)) ){
                
      setUpFeatures((oldArray) => [...oldArray, <SelectText pushText={pushFeature} deleteFeature={deleteFeature}
        updateCount={updateCount} valueFeat="" bandPlus={true} index={upFeatures.length} bandShow={bandShow} />])
    }
  }, [countFiles])

  const formikPass = useFormik({
    initialValues: {
      title: titleS,
      link: linkS,
    }, 
    validationSchema: Yup.object({
      title: Yup.string()
                  .required('El cliente es obligatorio'),
      link: Yup.string()
                  .required('La direccion web es obligatoria'),
    }),
    
    onSubmit: async valores => {            
      const {title, link} = valores;
      const data = {
        title,
        link,
        features,
        user,
        company
      }            
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('link', link);
      formData.append('image', file);
      formData.append('user', user);
      formData.append('company', company);

      features.map((feat) => {
        if(feat !== ''){
          formData.append('features', feat);
        }
      })

      if(slider === ''){
        try {
          if(file){
            let res = await createSliderImage(formData, token);
            if(res === 201){
              showToastMessage(`Slider ${title} creado exitosamente!`);
              setTimeout(() => {
                router.refresh();
                router.push('/sliders');
              }, 3000)
            }else{
              showToastMessageError(res.toString());
            }
          }else{
            let res = await createSlider(data, token);
            if(res === 201) {
              showToastMessage(`Slider ${title} creado exitosamente!`);
              setTimeout(() => {
                router.refresh();
                router.push('/sliders');
              }, 3000)
            } else {
              showToastMessageError('Error al crear slider..');
            }
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        try {
          if(file){
            let res = await updateSliderImage(token, formData, slider._id);
            if(res === 200){
              showToastMessage(`Slider ${title} actualizado exitosamente!`);
              setTimeout(() => {
                router.refresh();
                router.push('/sliders');
              }, 3000)
            }else{
              showToastMessageError(res.toString())
            }
          }else{
            let res = await updateSlider(token, data, slider._id);
            if(res === 200) {
              showToastMessage(`Slider ${title} actualizado exitosamente!`);
              setTimeout(() => {
                router.refresh();
                router.push('/sliders');
              }, 3000)
            } else {
              showToastMessageError('Error al actualizar slider..');
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    },       
  });

  return(
    <>
      <Alert></Alert>
      <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" 
        onSubmit={formikPass.handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 md:px-5">
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
            <div className="">
              <p className="text-gray-500 mb-3 font-medium text-sm">Fotografia</p>
              <Upload setFile={setFile} />
            </div>    
          </div>
          <div className="w-full md:w-1/2">
            <div className="mt-2 md:mt-0 mb-4 text-gray-700">
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
            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-500" htmlFor="passwordConfirm">
                Caracteristicas
              </label>
              {upFeatures.map((elements) => (
                elements
              ))}
            </div>            
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-3">
          <p className='text-xs font-sans font-thin mt-5'>Adjunte una fotografia con un aspecto 21:9 (2560x1080píxeles).</p>
          <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500 mt-1" textB="Guardar" typeB="submit" />
        </div>
      </form>
      {/* <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" 
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
                Caracteristicas
              </label>
              {upFeatures.map((elements) => (
                elements
              ))}
            </div>            
          </div>
        </div>
        <div className="px-4">
          <p className="text-gray-500 mb-3 font-medium text-sm">Fotografia</p>
          <Upload setFile={setFile} />
        </div>
        <div className="flex flex-col items-center justify-center mt-3">
          <p className='text-xs font-sans font-thin mt-5'>Adjunte una fotografia con un aspecto 21:9 (2560x1080píxeles).</p>
          <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500 mt-1" textB="Guardar" typeB="submit" />
        </div>
      </form> */}
    </>
  )
}