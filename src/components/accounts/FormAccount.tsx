"use client"
import Button from "../Button"
import Image from "next/image"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastMessageError, showToastMessage } from "@/components/Alert";
import { createUser } from "@/app/api/users/route";
import { useState} from "react";

export default function FormAccount({token, companies}: {token:string, companies:any}){
  const [role, setRol] = useState<string>('admin');
  const [file, setFile] : any = useState();
  const [company, setCompany] = useState<string>(companies[0]._id);

  const formikPass = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:'',
      passwordConfirm:'',
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      email: Yup.string()
                  .required('El email es obligatorio'),
      password: Yup.string()
                  .required('La contraseña es obligatoria')
                  .min(6, 'Contraseña de almenos 6 caracteres'),
      passwordConfirm: Yup.string()
                  .required('La contraseña es obligatoria')
                  .min(6, 'Contraseña de almenos 6 caracteres'),
    }),
    
    onSubmit: async valores => {            
      const {email, name, password, passwordConfirm} = valores;
      // const formData = new FormData();
      // formData.append('name', name);
      // formData.append('email', email);
      // formData.append('password', password);
      // formData.append('passwordConfirm', passwordConfirm);
      // formData.append('rol', rol);
      // formData.append("company", company);
      // formData.append('photo', file);
      
      const user = {
        name,
        email,
        password,
        passwordConfirm,
        role,
        company,
        'photo': '/public/img/users/default.jpg'
      }
      
      //let res = await createUser(formData, token);
      let res = await createUser(user, token);
      if(res.status === 'success') {
        showToastMessage(`Password de ${email} modificado exitosamente!`);
      } else {
        showToastMessageError(res);
      }                            
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

  const onCompanyChange = (value:string) => {
    console.log('company', value);
    setCompany(value);
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
              placeholder="juan Perez"
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
              Usuario
            </label>
            <input 
              className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email@gmail.com"
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
            <label className="block text-sm font-medium text-gray-500" htmlFor="">
              Perfil
            </label>
            <select className="bg-white mt-2 outline-none outline-0 shadow appearance-none 
                    border rounded w-full py-4 px-3 text-base text-gray-500 leading-tight 
                    font-sans font-ligth focus:outline-none focus:shadow-outline"
              onChange={handleSelect}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="space-y-1 justify-center">
            <div className="shrink-0 self-center">
                <label htmlFor="" className='text-gray-500 mb-3'>Foto</label>
                <div className='flex'>
                  <Image    
                      className="rounded-full"                      
                      src={'/photo'}
                      alt={'nameU'}
                      width={56}
                      height={56}                                    
                      priority={true}                                    
                  />
                  <div className='border rounded-md border-gray-200 relative p-4 w-5/6'>
                    <input 
                      type="file" 
                      id="photo" 
                      name="photo" 
                      //value={formik.values.photo}
                      onChange={onFileChange}
                      //onBlur={formik.handleChange}
                      className="opacity-0 absolute inset-0	">                                            
                    </input>
                    <p className='text-center	'>Cambiar Foto</p>
                  </div>  
                </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="mb-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-500" htmlFor="password">
              Contraseña
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-4 px-3 mt-2 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="****"
              value={formikPass.values.password}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleChange}>
            </input>
          </div>
          {formikPass.touched.password && formikPass.errors.password ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formikPass.errors.password}</p>
            </div>
          ) : null}
          <div className="mb-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-500" htmlFor="passwordConfirm">
              Confirmar Contraseña
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-4 mt-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
              id="passwordConfirm"
              type="password"
              placeholder="****"
              value={formikPass.values.passwordConfirm}
              onChange={formikPass.handleChange}
              onBlur={formikPass.handleChange}>
            </input>
          </div>
          {formikPass.touched.passwordConfirm && formikPass.errors.passwordConfirm ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formikPass.errors.passwordConfirm}</p>
            </div>
          ) : null}
          <div className="space-y-1 justify-center">
            <div className="shrink-0 self-center">
                <label htmlFor="" className='text-gray-500'>Compañias</label>
                <div>
                  <select name="" id="" className="bg-white mt-1 outline-none outline-0 shadow appearance-none 
                    border rounded w-full py-4 px-3 text-base text-gray-500 leading-tight 
                    font-sans font-ligth focus:outline-none focus:shadow-outline"
                    onChange={(e) => onCompanyChange(e.target.value)}
                  >
                    {companies.map((company:any) => (
                      <option value={company._id} key={company._id}>{company.name}</option>
                    ))}
                  </select>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <Button styleB="rounded-full bg-blue-600 w-1/5 text-white hover:bg-blue-500" textB="Guardar" typeB="submit" />
      </div>
    </form>
  )
}