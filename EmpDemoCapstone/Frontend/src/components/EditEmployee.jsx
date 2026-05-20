import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router';
import axios from 'axios'

function EditEmployee() {
  const {
    register,
    handleSubmit,
    formState:{ errors },
  }= useForm();

  //get emplopyees from navigate hook
  const { state } = useLocation();

  useEffect(()=>{
    setValue("name",state.name);
     setValue("email",state.email);
      setValue("mobile",state.mobile);
       setValue("designation",state.designation);
        setValue("companyName",state.companyName);
  },[]);

const saveModifiedEmp = async (ModifiedEmp) =>{
  //console.log(ModifiedEmp)
  //make http put req
  const res = await axios.put("http://localhost:3000/emp-api/employees");
  if(res.status===200){
    //navigate to list of emps
    Navigate("/list")
  }
};


  return (
    <div>
         <h1 className='text-5xl text-center text-gray-400 mb-4'>
          Edit Employee </h1>
      {/* form */}
      <form className='max-w-md block mx-auto text-center'>
      <input
       type="text"
        placeholder='enter the name' {...register("Name")}
         className='border p-3 m-1 w-full rounded-2xl' />
      <input
       type="text" 
       placeholder='enter the email' {...register("Email")} 
       className='border p-3 m-1 w-full rounded-2xl' />
      <input
       type="Number" 
       placeholder='enter the mobileNo' 
       {...register("Mobile")} 
       className='border p-3 m-1 w-full rounded-2xl' />
      <input 
      type="text"
       placeholder='enter the designation' {...register("Designation")}
        className='border p-3 m-1 w-full rounded-2xl' />
      <input 
      type="text" 
      placeholder='enter the companyName' {...register("CompanyName")} 
      className='border p-3 m-1 w-full rounded-2xl' />
      <button 
      className='border bg-gray-300 rounded-2xl mt-2'>
        Edit employees
        </button>
      </form>
    </div>
  )
}

export default EditEmployee
