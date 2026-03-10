
// 2.OTP Countdown Simulator (Console App)
// ------------------------------------
        
//         Simulate OTP sending flow in Node.js:
        
//         Show “OTP Sent Successfully”
        
//         Start 10-second countdown
        
//         Allow resend only after countdown ends



console.log("OTP sent successfully")
let countdown=10
let timer=setInterval(()=>{
countdown-- ;
console.log(`OTP resend in ${countdown} sec `)
if(countdown===0){
console.log("resend otp")
clearInterval(timer)
}
},1000)
