process.on('uncaughtException', (err) => { console.log("error in code", err) })
import express from 'express'
import { dbConnection } from './dbConnection/dbConnection.js'
import { appError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import dotenv from 'dotenv'
import { bootstrap } from './src/modules/bootstrap.js';

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())

bootstrap(app)
app.use("*", (req, res, next) => {
    next(new appError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

process.on('unhandledRejection', (err) => { log("error", err) })

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server is running.`))  