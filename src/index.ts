import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import BuckarooClient from './BuckarooClient'
const api = new BuckarooClient()

export default api
