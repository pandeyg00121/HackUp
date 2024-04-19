const catchAsync = (requestHandler)=>{
    return (req,res,next)=>{
         Promise.resolve(requestHandler(req,res,next))
         .catch((err)=>{
             console.log(err);
         })
     }
 } 
 
 export default catchAsync