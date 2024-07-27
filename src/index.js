import express from 'express';
import cors from "cors";
import connectDb from './db/db.js';
import router from './routes/routes.js';

const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

connectDb();


app.use('/transactions',router);


app.listen(PORT,()=>{
    console.log(`LISTENING ON PORT: ${PORT}`);
})