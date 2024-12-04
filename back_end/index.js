const cors = require('cors');
const express = require ('express');
const connectDB =require('./utili/config/db');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter');
const footerRouter = require('./routers/footerRouter');
const experienceRouter = require('./routers/experienceRouter');
const projectRouter = require('./routers/projectRouter');
const servicesRouter = require('./routers/servicesRouter');
const userRouter = require('./routers/userRouter');
const port = 3000;
const app = express();
const allowedOrigins = ['http://localhost:4201', 'http://localhost:4202'];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            } else {
            callback(new Error('Not allowed by CORS'));
            }
        },
    })
);
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();


app.use('/home',homeRouter);
app.use('/footer',footerRouter);
app.use('/experience',experienceRouter);
app.use('/project', projectRouter);
app.use('/services',servicesRouter);
app.use('/user',userRouter);

app.listen(port,()=>console.log(`server start at port ${port}`))