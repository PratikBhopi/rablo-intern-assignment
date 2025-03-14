const express = require('express');
const connectToDB = require('./db/db');
require('dotenv').config(); 
const cors=require('cors');
const productRouter=require('./routes/products.routes')
const userRouter=require('./routes/user.routes')

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send(`Product API's!`);
});

app.use('/api/product',productRouter);
app.use('/api/user',userRouter);



connectToDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port: ${process.env.PORT}`);
});