const db=require('../db');
exports.LoginApi=(req,res)=>{
    const {account,pw}=req.body;
    db.query('select * from login',(err,results)=>{
        if(err){
            console.log(err)
            return err
        }
        if(results.length==0){
            return  res.send({code:201,msg:'No users found'})
        }else{
            const user=results.find(item=>item.account==account&&item.pw==pw);
            if(user){
               return res.send({code:200,msg:'Login successful',account:account})
            }else{
                console.log(req.body)
                console.log(results[0])
               return  res.send({code:202,msg:'Incorrect account or password'})
            }   
        }
    })
}