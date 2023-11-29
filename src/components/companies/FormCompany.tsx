"use client"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert, { showToastMessageError, showToastMessage } from "@/components/Alert";
import { useState} from "react";
import Upload from "../Upload";
import { createCompany, updateCompany } from "@/app/api/companies/route";
import { useRouter } from "next/navigation";

export default function FormCompany({token, company}: 
        {token:string, company: any}){

  const [file, setFile] : any = useState();

  const router = useRouter();

  let nameC = ''; 
  let emailC = ''; 
  let phoneC = ''; 
  let addressC = '';

  if(company !== ''){
    nameC = company.name;
    emailC = company.email;
    phoneC = '4444444444';
    addressC = company.address;
  }

  const formikPass = useFormik({
    initialValues: {
      name: nameC,
      email: emailC,
      phone: phoneC,
      address: addressC,
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
      
      const companyData = {
        name,
        email,
        address,
        //phone,
        logo: '/public/edit/img.png'
      }
      
      if(company === ''){
        try {
          let res = await createCompany(token, companyData);
          if(res === 201) {
            showToastMessage(`Compañia creada exitosamente!`);
            setTimeout(() =>{
              router.refresh();
              router.push('/companies')
            }, 2000)
          } else {
            showToastMessageError(res.toString());
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        try {
          let res = await updateCompany(token, company._id, JSON.stringify(companyData));
          if(res === 200){
            showToastMessage(`Compañia actualizada exitosamente!`);
            setTimeout(() =>{
              router.refresh();
              router.push('/companies')
            }, 2000)
          } else {
            showToastMessageError(res.toString());
          }
        } catch (error) {
          console.log(error);
        }
      }                            
    },       
  });

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
    <>
      <Alert />
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
    </>
  )
}