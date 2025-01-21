const express=require('express');
const app=express();    

app.use((req,res,next)=>{
    console.log('Middleware 1');
    console.log(req.url);
    console.log(req.method);
    console.log(req.ip);
    console.log(new Date());
    next();
})

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('/about',(req,res)=>{
    res.send('About Us');
});

app.listen(3000,()=>{    
    console.log('Server is running on port 3000');
});