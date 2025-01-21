const express=require('express');
const app=express();    

app.use((req,res,next)=>{
    // console.log('Middleware 1');
    // console.log(req.url);
    // console.log(req.method);
    // console.log(req.ip);
    // console.log(new Date());
    next();
})

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('/about',(req,res)=>{
    res.send('About Us');
});

app.get('/reddit/:data',(req,res)=>{
    console.log(req.params);
    
    res.send('Reddit page');
});

// http://localhost:3000/reddit/vikas0799/xyz
app.get('/reddit/:profile/:comments',(req,res)=>{
    // console.log(req.params);
    const {profile,comments}=req.params;
    console.log(profile);
    console.log(comments);
    res.send('Reddit page comments');
});

app.listen(3000,()=>{    
    console.log('Server is running on port 3000');
});