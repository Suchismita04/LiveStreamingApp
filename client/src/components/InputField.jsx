import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';

function InputField({ name, lable, type = "text" }) {
  const { register, formState: { error } } = useForm()

  return (

    <>
      <div className="input-group mb-3">
        <input {...register(name,{required:true})} id={name} type={type} className="form-control" placeholder={name} aria-label="Username" aria-describedby="basic-addon1" />
        {/* {error[name] && <p>{error[name].message}</p>} */}
      </div>

    </>
  )
}

export default InputField
