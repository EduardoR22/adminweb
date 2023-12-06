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

export default function FormSlider({token, slider}: 
                        {token:string, slider: any}){
  
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [features, setFeatures] = useState<string[]>([])
  const [countFiles, setCountFiles] = useState(0);
  const [upFeatures, setUpFeatures] = useState<any[]>([]);

  let titleS: string = '';
  let linkS: string = '';
  
  const pushFeature = (feat: string) => {
    setFeatures((oldFeat) => [...oldFeat, feat])
  }
  
  if(slider !== ''){
    titleS = slider.title;
    linkS = slider.link;
  }

  useEffect(() => {
    if(slider !== ''){
      slider.features.map((feature:string, index:number) => {
        console.log('index= ', index);
        console.log(slider.features.length);
        setUpFeatures((oldArray) => [...oldArray, <SelectText pushText={pushFeature} 
          updateCount={updateCount} valueFeat={feature} bandPlus={index === slider.features.length-1 ? true: false} />])
      })
    }
  },[])

  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    // console.log('count files');
    // console.log(countFiles);
    // console.log(typeof(slider));
    // console.log(slider);
    // if(slider === '')console.log('ifff')
    if((slider === "" && countFiles < 5) || (slider !== '' && (countFiles !== 0 || slider.features.length === 0) && ((countFiles + slider.features.length) < 5)) ){
      setUpFeatures((oldArray) => [...oldArray, <SelectText pushText={pushFeature} 
        updateCount={updateCount} valueFeat="" bandPlus={true} />])
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
        features
      }            
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('link', link);
      formData.append('image', file);

      features.map((feat) => {
        formData.append('features', feat);
      })

      console.log(formData.getAll('features'))

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
        <div className="flex justify-center mt-3">
          <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
        </div>
      </form>
    </>
  )
}