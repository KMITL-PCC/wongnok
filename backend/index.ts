import express from 'express'; // ตัวอย่างการใช้ Express.js
import dotenv from 'dotenv'; 
import { json } from 'stream/consumers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(PORT, () => {
    console.log('app runnig on port :', PORT)
})