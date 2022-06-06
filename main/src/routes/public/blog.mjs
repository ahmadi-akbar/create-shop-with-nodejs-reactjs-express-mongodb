import express from 'express';
const router = express.Router();
import path from "path";

router.get('/', (req, res, next) => {
  console.log('we are jes')
  res.sendFile(path.join(__dirname, "blog/index.php"));
});


export default router;