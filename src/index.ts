import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import BuckarooClient from './BuckarooClient'
const api = new BuckarooClient({secretKey:'',websiteKey:''},{mode:'test'})
import { uniqid } from "./Utils/Functions";

export default api