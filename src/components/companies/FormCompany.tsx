"use client"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastMessageError, showToastMessage } from "@/components/Alert";
import { useState} from "react";
import Upload from "../Upload";

export default function FormCompany({token}: {token:string}){
  const [role, setRol] = useState<string>('admin');
  const [file, setFile] : any = useState();

  const formikPass = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address:'',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      email: Yup.string()
                  .required('El email es obligatorio'),
      phone: Yup.string()
                  .required('El telefono es obligatorio'),
      address: Yup.string()
                  .required('La direccion es obligatoria'),
    }),
    
    onSubmit: async valores => {            
      const {email, name, address, phone} = valores;
      // const formData = new FormData();
      // formData.append('name', name);
      // formData.append('email', email);
      // formData.append('password', password);
      // formData.append('passwordConfirm', passwordConfirm);
      // formData.append('rol', rol);
      // formData.append("company", "64fc0c23d0cdf022cf6eac3a");
      // formData.append('photo', file);
      
      const company = {
        name,
        email,
        address,
        phone,
        role,
        'company': "64fc0c23d0cdf022cf6eac3a",
        'photo': '/public/img/users/default.jpg'
      }
      
      //let res = await createUser(formData, token);
      // let res = await createUser(user, token);
      // if(res.status === 'success') {
      //   showToastMessage(`Password de ${email} modificado exitosamente!`);
      // } else {
      //   showToastMessageError(res);
      // }                            
    },       
  });
  
  const handleSelect = (event: any) => {
    const target = event.target as HTMLButtonElement;
    setRol(target.value);
  }

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

  return(
    <form className="bg-white rounded shadow-md px-8 pt-6 pb-8" 
      onSubmit={formikPass.handleSubmit}>
      <div className="flex">
        <div className="w-1/2 px-5">
          <div className="mb-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-500" htmlFor="name">
              Nombre
            </label>
            <input 
              className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nombre empresa"
              value={formikPass.values.name}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleChange}>
            </input>
          </div>
          {formikPass.touched.name && formikPass.errors.name ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formikPass.errors.name}</p>
            </div>
          ) : null}
          <div className="mb-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-500" htmlFor="email">
              Email
            </label>
            <input 
              className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email@empresa.com"
              value={formikPass.values.email}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleChange}>
            </input>
          </div>
          {formikPass.touched.email && formikPass.errors.email ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formikPass.errors.email}</p>
            </div>
          ) : null}
          <div className="mb-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-500" htmlFor="phone">
              Telefono
            </label>
            <input 
              className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="444 4444 444"
              value={formikPass.values.phone}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleChange}>
            </input>
          </div>
          {formikPass.touched.phone && formikPass.errors.phone ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formikPass.errors.phone}</p>
            </div>
          ) : null}
        </div>
        <div className="w-1/2">
          <div className="mb-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-500" htmlFor="address">
              Direccion
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-4 px-3 mt-2 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="calle #?? colonia"
              value={formikPass.values.address}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleChange}>
            </input>
          </div>
          {formikPass.touched.address && formikPass.errors.address ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formikPass.errors.address}</p>
            </div>
          ) : null}
          <div className="mb-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="">
              Logotipo
            </label>
            <Upload setFile={setFile} />
          </div>          
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
      </div>
    </form>
  )
}