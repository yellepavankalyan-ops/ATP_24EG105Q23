import { useState } from "react";
import { useForm } from "react-hook-form";

function CreateUsers() {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit } = useForm();

  //on form submit
  const onFormSubmit = (newUserObj) => {
    console.log(newUserObj);
    setUsers([...users, newUserObj]);
  };

  console.log(users);

  return (
    <div className="mt-5">
      {/* create User form */}
      <h1 className="text-5xl text-center">Create User</h1>
      <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit(onFormSubmit)}>
        {/* First name */}
        <div className="mb-3">
          <label htmlFor="fn">FirstName</label>
          <input type="text" {...register("firstName")} id="fn" className="w-full p-3 border" />
        </div>
        {/* Email*/}
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email")} id="email" className="w-full p-3 border" />
        </div>
        {/* First name */}
        <div className="mb-3">
          <label htmlFor="fn">Date of Birth</label>
          <input type="date" {...register("dateOfBirth")} id="fn" className="w-full p-3 border" />
        </div>
        <button type="submit" className="bg-sky-300 p-3">
          Add New User
        </button>
      </form>
    {/* Table to display List of Users */}
    <div className="mt-10 flex justify-center">
    <table className="border  shadow-md rounded-lg overflow-hidden text-lg">
        
        {/* Table Head */}
        <thead >
        <tr>
            <th className="px-6 py-3 border">First Name</th>
            <th className="px-6 py-3 border">Email</th>
            <th className="px-6 py-3 border">Date of Birth</th>
        </tr>
        </thead>

        {/* Table Body */}
        <tbody>
        {users.map((userObj, index) => (
            <tr
            key={index}
            className="text-center"
            >
            <td className="px-6 py-2 border">{userObj.firstName}</td>
            <td className="px-6 py-2 border">{userObj.email}</td>
            <td className="px-6 py-2 border">{userObj.dateOfBirth}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    </div>
  );
}

export default CreateUsers;