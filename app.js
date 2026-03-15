const express = require('express');
const router = require('./router/index');
const corss=require('cors');
const app = express();
app.use(corss({
    origin:'*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(9091,()=>{
    console.log('Server is running on port 9091');
})