import exp from 'express'
import {EmpModel} from '../models/EmpModel.js'
export const EmpApp = exp.Router()

//Create Employee
EmpApp.post("/emps", async (req, res) => {

    const newEmp = req.body;
    
    const newEmpDocument = new EmpModel(newEmp)
    //save
    const result = await newEmpDocument.save()
    //send res
    res.status(201).json({ message: "Employee Created" }) //201 status code shows successfull creation of user
}
)

// Read all Employees
EmpApp.get("/emps", async (req,res) => {
    //read all users from db
    let empList = await EmpModel.find()
    //send res
    res.status(200).json({ message: "Employees", payload: empList })
})

//Update emp id
EmpApp.put("/emps/:id", async (req, res) => {
  const modifiedEmp = req.body;
  //find and update
  let updatedEmp = await EmpModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ...modifiedEmp },
    },
    { returnDocument: "after" },
  );
  if (!updatedEmp) {
    return res.status(404).json({ message: "emp not found" });
  }
  res.status(200).json({ message: "employee updated", payload: updatedEmp });
});

//Delete emp by id
EmpApp.delete("/emps/:id", async (req, res) => {
  let deletedEmp = await EmpModel.findByIdAndDelete(req.params.id);
  if (!deletedEmp) {
    return res.status(404).json({ message: "emp not found" });
  }
  res.status(200).json({ message: "employee deleted", payload: deletedEmp });
});