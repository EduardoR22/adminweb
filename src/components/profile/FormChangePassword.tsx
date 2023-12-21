"use client"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "@/components/Alert";
import {updateMePassword} from '@/app/api/users/routeUsers'
import { useRouter } from 'next/navigation';
import RemoveCookies from '../RemoveCookies';
import Button from '../Button';

export default function FormChangePassword({usr, token} : {usr: any, token: string}){
  const {email, _id } = usr.data.data

  const formikPass = useFormik({
    initialValues: {
        password:'',
        passwordCurrent:'',
        passwordConfirm:'',
    }, 
    validationSchema: Yup.object({
      password: Yup.string()
                  .required('El password es obligatorio')
                  .min(6, 'Password de almenos 6 caracteres'),
      passwordConfirm: Yup.string()
                  .required('El password es obligatorio')
                  .min(6, 'Password de almenos 6 caracteres'),
      passwordCurrent: Yup.string()
                  .required('El password es obligatorio')
                  .min(6, 'Password de almenos 6 caracteres'),
    }),
    
    onSubmit: async valores => {            
      const {passwordCurrent, password, passwordConfirm} = valores;            
      let res = await updateMePassword(_id, passwordCurrent, password, passwordConfirm, token);
      if(res.status === 'success') {
        showToastMessage(`Password de ${email} modificado exitosamente!`);
        setTimeout(() => {
          logOut();
        }, 2000)
      } else {
        showToastMessageError(res);
      }                            
    },       
  });

  const router = useRouter();
  function logOut(){
    RemoveCookies();
    router.push('/login');
  }

  return (    
    <>            
      <form className="bg-white rounded shadow-md px-8 pt-6 pb-3" 
        onSubmit={formikPass.handleSubmit}>
        <div className="mb-4 text-gray-700">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="passwordCurrent">
            Password actual
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
            id="passwordCurrent"
            type="password"
            placeholder="****"
            value={formikPass.values.passwordCurrent}
            onChange={formikPass.handleChange}
            onBlur={formikPass.handleChange}>
          </input>
        </div>
        {formikPass.touched.passwordCurrent && formikPass.errors.passwordCurrent ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{formikPass.errors.passwordCurrent}</p>
          </div>
        ) : null}
        <div className="mb-4 text-gray-700">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="password">
            Password nuevo
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
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
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="passwordConfirm">
            Confirmar Password 
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
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
        <Button textB='Guardar password' typeB='submit' 
                styleB='w-36 border border-blue-600 bg-blue-600 text-white transition-colors hover:bg-blue-500' 
        />         
      </form>
    </>     
  );
}