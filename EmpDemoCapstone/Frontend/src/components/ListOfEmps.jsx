import { useState,useEffect } from "react"
import { useNavigate } from "react-router"
import axios from 'axios'

function ListOfEmps() {

  const [emp,setEmps]=useState([])
  const navigate =useNavigate();
  
  const gotoEmployee=(empObj)=>{
    //navigate to employee /along with selected emp obj and transfering state while navigating 
    navigate("/employee",{state:empObj});
  };

  const gotoEditEmployee =(empObj)=>{
    //navigate to employee along wiith selected emp Obj
    navigate("/edit-emp",{state:empObj})
  }
// without loading status and error handler the network is mandatory
  const deleteEmpById = async (id)=>{
    let res =await axios.delete("http://localhost:3000/emp-api/emp")
    if(res.status===200){
      //get latest emp data
      getEmps();
    }
  };
  async function getEmps(){
    let res= await fetch("http://localhost:3000/emp-api/emp",{
      method :"GET"}
    );
    if(res.status===200){
      let resObj=await res.json();
      setEmps(resObj.payload);
    }
  }

  //get all emps on component loading 
  useEffect(()=>{
   getEmps();
      },[]);
    

  return (
    <div>
      <h1 className="text-5xl text-center text-black mb-4">Employee List</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {emp.map((empObj)=>{
          <div key={empObj._id} className="bg-white p-5 text-center text-2xl"> 
          <p>{empObj.email}</p>
          <p className="mb-4">{empObj.name}</p>
          // 3 buttons
          <div>
            <button onClick={ () => gotoEmployee(empObj) } className="bg-green-300 text-white p-2 rounded-2xl">
              View
              </button>
            <button className="bg-yellow-300 text-white p-2 rounded-2xl">
              Edit
              </button>
            <button className="bg-red-300 text-white p-2 rounded-2xl">
              Delete
              </button>
          </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default ListOfEmps;
