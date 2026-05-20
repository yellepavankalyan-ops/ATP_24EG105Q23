import { useForm } from 'react-hook-form'
import { useState } from 'react'

function CreateEmp() {
   
  const { loding , setLoading   } = useState(null);
 const { error , setError }= useState(null);
  const { register ,handleSubmit ,formState : { errors } } = useForm();

  // //form submition 
  const onFormSubmit = async (newEmpObj)=>{
    try{
      setLoading(true);
      // make http post req
      let res= await fetch("http://localhost:3000/emp-api/emp",{
        method:"POST",
        headers:{"content-Type":"application/json"},
        body: JSON.stringify(newEmpObj),
      });
      
      if(res.status===201){
        Navigate("/list");
      }else{
        let errorRes= await res.json();
        console.log("err response is ",errorRes);
        throw new error(errorRes.reason);
      }
    }
      catch (err){
        //deal err
        setError(err.message);
      }finally{
          setLoading(false);
      }
    };
    console.log(error);
    if(loding){
      return <p>Loading...</p>
    }
    if(error){
      return <p>{error}</p>
    }

  return (
    <div className='bg-gray-300 '>
      <h1 className='text-5xl text-center text-gray-400 mb-4 '>Create New Employee </h1>
      {/* form */}
      <form className='max-w-md block mx-auto text-center'>
      <input type="text" placeholder='enter the name' {...register("Name")} className='border p-3 m-1 w-full rounded-2xl' />
      <input type="text" placeholder='enter the email' {...register("Email")} className='border p-3 m-1 w-full rounded-2xl' />
      <input type="" placeholder='enter the mobileNo' {...register("Mobile")} className='border p-3 m-1 w-full rounded-2xl' />
      <input type="text" placeholder='enter the designation' {...register("Designation")} className='border p-3 m-1 w-full rounded-2xl' />
      <input type="text" placeholder='enter the companyName' {...register("CompanyName")} className='border p-3 m-1 w-full rounded-2xl' />
      <button className='border bg-gray-300 rounded-2xl mt-2'>Add employees</button>
      </form>
    </div>
    
  )

}
export default CreateEmp
