"use client"

import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { createService, updateService, createServiceImage, 
  updateServiceImage } from "@/app/api/services/routeServices";
import { useRouter } from "next/navigation";
import Alert, {showToastMessage, showToastMessageError} from "../Alert";
import Upload from "../Upload";
import CategoryList from "./CategoryList";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Modal({newService, service, token, id, categories}: 
      {newService:boolean, service:any, token:string, id:string, categories:any}) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [category, setCategory] = useState(service === ''? categories[0].name: service.category);

  let nameI = '';
  let descriptionI = '';
  if(service !== ''){
    nameI = service.name;
    descriptionI = service.description;
  }
  

  const formik = useFormik({
    initialValues: {
      name: nameI,
      description:descriptionI,
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      description: Yup.string()
                  .required('La descripcion es obligatoria'),
    }),
    
    onSubmit: async valores => {
      const {name, description} = valores;
   
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('logo', file);
      
      const serviceData = {
        name,
        description,
      };

      if(newService){
        try {
          if(file){
            const res = await createServiceImage(token, formData);
            if(res === 201){
              //setValService('');
              showToastMessage('Servicio creado exitosamente!')
              setTimeout(() => {
                setShowModal(false);
                router.refresh();
              }, 100)
            }else{
              showToastMessageError(res.toString());
            }
          }else{
            const res = await createService(token, serviceData);
            if(res === 201){
              //setValService('');
              showToastMessage('Servicio creado exitosamente!')
              setTimeout(() => {
                setShowModal(false);
                router.refresh();
              }, 100)
            }else{
              showToastMessageError(res.toString());
            }
          }
        } catch (error) {
          showToastMessageError('Error al crear servicio');  
        }
      }else{
        try {
          if(file){
            const res = await updateServiceImage(token, formData, id);
            if(res === 200){
              //setValService('');
              showToastMessage('Servicio actualizado exitosamente');
              setTimeout(() => {
                setShowModal(false);
                router.refresh();
              }, 100)
            }else{
              showToastMessageError(res.toString());
            }
          }else{
            const res = await updateService(token, serviceData, id);
            if(res === 200){
              //setValService('');
              showToastMessage('Servicio actualizado exitosamente');
              setTimeout(() => {
                setShowModal(false);
                router.refresh();
              }, 100)
            }else{
              showToastMessageError(res.toString());
            }
          }
        } catch (error) {
          showToastMessageError('Error al actualizar servicio');
        }
      }
    },       
  })

  return (
    <>
      {newService? (
        <button
          className="bg-blue-950 text-white active:bg-blue-500 hover:bg-blue-500 font-bold text-sm w-36 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Nuevo
        </button>
      ): (
        <PencilSquareIcon width={20} height={20} 
          className="text-slate-600 cursor-pointer mr-2"
          onClick={() => setShowModal(true)} 
        />
      )}
      {showModal ? (
        <>
          <Alert />
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto 
              fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <form className="bg-white rounded shadow-md sm:px-8 pt-6 pb-8" 
              onSubmit={formik.handleSubmit}>

              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {newService? 'Nuevo servicio': 'Actualizar servicio'}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="flex mt-4 items-center">
                      <div className="w-28">
                        <p className="text-slate-700 mr-2">NOMBRE:</p>
                      </div>
                      <div className="w-72">
                        <input type="text" 
                          id="name"
                          className="border border-gray-400 outline-none outline-0 p-1 rounded-md w-full" 
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleChange}
                          // value={valService}
                          // onChange={(e) => onChange(e.target.value)}
                        />
                      </div>
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p>{formik.errors.name}</p>
                      </div>
                    ) : null}
                    <div className="flex mt-4 items-center">
                      <div className="w-28">
                        <p className="text-slate-700 mr-2">Descripcion:</p>
                      </div>
                      <div className="w-72">
                        <textarea
                          id="description"
                          className="border border-gray-400 outline-none outline-0 p-1 rounded-md 
                            resize-none overflow-hidden w-full" 
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleChange}
                        />
                      </div>
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p>{formik.errors.description}</p>
                      </div>
                    ) : null}
                    <div className="flex mt-4 items-center">
                      <div className="w-28">
                        <p className="text-slate-700 mr-2">Imagen:</p>
                      </div>
                      <div className="w-72 flex">
                        {file && <img src={URL.createObjectURL(file)} className="w-14 h-14" />}
                        {(!file && !newService) && <img src={`${service.logo}`} className="w-14 h-14" />}
                        <Upload setFile={setFile} />
                      </div>
                    </div>
                    <div className="flex mt-4 items-center">
                      <div className="w-28">
                        <p className="text-slate-700 mr-2">Categoria:</p>
                      </div>
                      <div className="w-72">
                        <CategoryList categories={categories} setCategory={setCategory} category={category} />
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-blue-950 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      //onClick={sendRequest}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
