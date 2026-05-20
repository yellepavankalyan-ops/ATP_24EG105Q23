import { useForm } from "react-hook-form";
import { useLocation,useNavigate } from "react-router";
import { useEffect } from "react";
import axios from 'axios';
function EditEmp() {

  const {
      register,
      handleSubmit,
      formState: { errors },
      setValue
    } = useForm();
  
  const navigate=useNavigate();
    
  const {state}=useLocation();

  useEffect(() => {
    setValue("name",state.name);
    setValue("email",state.email);
    setValue("mobile",state.mobile);
    setValue("designation",state.designation);
    setValue("company",state.company);
  },[]) 

  const saveModifiedEmp= async (modifiedEmp) => {
    //console.log(modifiedEmp)
    //make HTTP PUT request
    const res= await axios.put(`http://localhost:2000/emp-api/emps/${state._id}`,modifiedEmp);
    if(res.status===200)
      navigate("/list");
  }

  return (
    <div>
      <h1 className="text-5xl text-center text-orange-400">Edit Employee Details</h1>
      {/* form */}
      <form className=" max-w-md mx-auto mt-10"  >
        <input
          type="text"
          placeholder="Enter name "
          {...register("name")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="email"
          placeholder="Enter Email "
          {...register("email")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("company")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />

        <button type="submit"  onClick={handleSubmit(saveModifiedEmp)} className="text-2xl rounded-2xl bg-green-600 text-white block mx-auto p-4">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditEmp
