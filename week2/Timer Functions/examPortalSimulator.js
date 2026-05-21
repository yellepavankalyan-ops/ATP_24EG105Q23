// 1.Exam portal simulator:
// -----------------------------
// When a student submits an exam:

//         Immediately show: “Exam submitted successfully”
//         After 2 seconds → show: “Evaluating answers…”
//         After 4 seconds → show: “Result: Pass”

console.log("exam submitted successfully")
setTimeout(()=>
{
    console.log("Evaluating answers...")
},2000)
setTimeout(()=>{
    console.log("result: pass")
},4000)
