import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';

function Button({children,type="button"}) {
    const {register,formState:{error}}=useForm()
  return (
    <>
      <button type={type} className="btn btn-primary" style={{"background":"#ae50e2","border":"none"}}>{children}</button>
    </>
  )
}

export default Button
