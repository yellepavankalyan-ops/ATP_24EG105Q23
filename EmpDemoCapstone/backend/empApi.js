import exp from 'express'
import { EmployeeModel } from './EmployeeModel.js'

export const empApp=exp.Router();
//test the router
empApp.get("/",(req,res)=>{
    res.send("emp api is woriking")
})
//create a emp user
empApp.post("/emp",async(req,res)=>{
//get new emp from obj
const newEmp=req.body
//create emp document
const empDocument = new EmployeeModel(newEmp)
//save
const result=await empDocument.save()
// console.log(result)
//send res
res.status(201).json({ message : " Emp created" ,payload : result })
})

//read all employee
empApp.get("/emps", async (req, res) => {
    //find all employees
        const findEmp = await EmployeeModel.find();
        // res
        res.status(200).json({ messaae: "found" , payload : findEmp});
});

//edit employee
empApp.put("/emp/:id",async(req,res)=>{
    //find the employee to change
    const editEmp=await EmployeeModel.findByIdAndUpdate(req.params?.id,req.body,{new:true});
    //send res
    res.status(200).json({ message : "Emp Updated..." , payload:editEmp })
})

// delete employee
empApp.delete("/emp/:id",async(req,res)=>{
    //get emp id to delete the emp
    const deleteEmp=await EmployeeModel.findByIdAndDelete(req.params?.id)
    //send res
    res.status(200).json({message:"Emp deleted...",payload : deleteEmp})
})