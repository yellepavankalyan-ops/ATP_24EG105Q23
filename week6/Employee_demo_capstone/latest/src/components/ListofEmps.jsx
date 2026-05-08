import { useState, useEffect } from "react";
import {useNavigate} from 'react-router';
import axios from 'axios';

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();

  const gotoEmployee = (empObj) =>{
    //navigate to employee
    navigate("/employee",{state:empObj});
  };

  const gotoEditEmployee = (empObj) =>{
    //navigate to editemployee
    navigate("/editemp",{state:empObj})
  }

  const deleteEmpByID = async(id) =>{
    let res= await axios.delete(`http://localhost:2000/emp-api/emps/${id}`)
    if(res.status==200){
      getEmps();
    }
  };


  async function getEmps() {
      let res = await fetch("http://localhost:2000/emp-api/emps",{
        method: "GET"}
      );
      if (res.status === 200) {
        let resObj = await res.json();
        setEmps(resObj.payload);
      }
    }

  useEffect(() => {
    getEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5 text-center text-2xl rounded-2xl shadow-2xl">
            <p>{empObj.email}</p>
            <p className="mb-2">{empObj.name}</p>
            <div className="flex justify-around">
            <button onClick={() => gotoEmployee(empObj)} className="bg-amber-200 text-white p-2 rounded-2xl">View</button>
            <button  onClick={() =>gotoEditEmployee(empObj)} className="bg-blue-400 text-white p-2 rounded-2xl">Edit</button>
            <button onClick={() => deleteEmpByID(empObj._id)} className="bg-red-500 text-white p-2 rounded-2xl">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;