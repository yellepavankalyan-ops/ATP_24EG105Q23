 function validateTitle(title) {
                        if(!title)
                        {
                            return "Title required"
                        }
                        if(title.length<=3){
                            return "title is valid"
                        }
                        return true
                    }
// 2. Validate priority (must be: low, medium, high)
                      function validatePriority(priority) {
                        const priorites=["low",'medium','high']
                        let result =priorites.includes(priority)
                        if(result==false){
                    return "Invalid priority";
                        }
                        return true;

                      }
                      
                      // 3. Validate due date (must be future date)
                      function validateDueDate(date) {
                    let today=new Date()
                    let due=new Date(date)
                    if(due>today){
                        return true
                    }  
                    return "Due date is upcomming"
                    }
export {validateTitle,validatePriority,validateDueDate}



