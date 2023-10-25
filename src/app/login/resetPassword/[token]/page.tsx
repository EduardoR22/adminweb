"use client"

import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert, {showToastMessage,showToastMessageError} from "@/components/Alert"
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { resetPassword } from '@/app/api/users/route';
import { useParams, useRouter } from 'next/navigation';
import { deleteCookie } from "cookies-next";
import Button from '@/components/Button';

export default function ResetPassword(){
  
  const params = useParams();
  const router = useRouter();

  const token: string = params.token.toString();

	const formik = useFormik({
    initialValues: {
      password:'',
      confirmPassword: ''                        
    }, 
    validationSchema: Yup.object({
      password: Yup.string()
                  .required('Favor de ingresar su nueva contraseña'),
      confirmPassword: Yup.string()
                  .required('Favor de confirmar su nueva contraseña')
    }),    
    onSubmit: async (valores, {resetForm}) => {                        
      
			const { password, confirmPassword } = valores;
			
      const data = {
        "password" : password,
        "passwordConfirm" : confirmPassword
      }

			let res = await resetPassword(token, data);
			resetForm();            
			if(res != undefined)
				if(res === 200) {
          //console.log('Cambio de password realizado');
					showToastMessage('Cambio de contraseña exitoso');
          deleteCookie('token');
          deleteCookie('user');
          deleteCookie('id');
          router.push('/login');                
				} else {
          showToastMessageError(res.toString());
				}                            
    }
  });

  return (
    <div className='mt-10 flex flex-col items-center space-y-10'>
      <Alert></Alert>
      <form className=" w-11/12 sm:w-2/3  md:w-1/2 lg:w-1/3  bg-white rounded shadow-md px-3 sm:px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}>                 
        <div className='flex rounded-full items-center'>
					<div>
						<EnvelopeOpenIcon
						 className="h-18 w-12 text-gray-400"
						/>
					</div>
					<div>
						<h2 className="justify-center text-xl text-black-900 font-display font-light lg:text-left xl:text-2xl xl:text-normal">Cambiar contraseña</h2>
					</div>
				</div>
        <div className="md:flex mb-4 mt-4">
          <div className="md:flex-1 md:pr-3 md:w-2/3">
            <label className="block text-gray-500 text-base  mb-2 font-sans " htmlFor="password">
              Contraseña
            </label>
            <div className="flex justify-start items-center relative">
              <input 
                className="shadow appearance-none border lowercase rounded w-full py-2 px-2   text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                id="password"
                type="password"
                value={formik.values.password}
                placeholder="******"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}>
              </input>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <label className="block text-gray-500 text-base mt-4 mb-2 font-sans " htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            <div className="flex justify-start items-center relative">
              <input 
                className="shadow appearance-none border lowercase rounded w-full py-2 px-2 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                id="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                placeholder="******"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}>
              </input>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.confirmPassword}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-10 flex justify-between">
          <Link href={'/'}>
            <Button textB='Cancelar' typeB='button' 
              styleB='bg-black text-white border border-black hover:bg-white hover:text-black' 
            />
          </Link>
          
          <Button textB='Enviar' typeB='submit' 
            styleB='w-1/3 bg-emerald-400 border border-emerald-400 text-white hover:bg-blue-400'
          />
        </div>    
      </form>
    </div>         
  )
}