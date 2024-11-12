import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';

function Button({children,type="button",onClick}) {
    const {register,formState:{error}}=useForm()
  return (
    <>
      <button type={type} onClick={onClick} className="btn btn-primary" style={{"background":"#ae50e2","border":"none"}}>{children}</button>
    </>
  )
}

export default Button
