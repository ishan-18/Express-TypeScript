import express, { Application, Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import "colors"
import morgan from "morgan"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import hpp from "hpp"
import cors from "cors"
import { connectDB } from "./config/db"
import authRouter from "./routes/auth"
import postRouter from './routes/post'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import logger from "./utils/common/logger"

export const SB_URI = "/api"

dotenv.config({ path: './src/config/.env' })

connectDB()

export const app: Application = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())


const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100,
})
app.use(limiter)

//Routes
app.use(`${SB_URI}`, authRouter)
app.use(`${SB_URI}/`, postRouter)

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        data: "Invalid api endpoint" 
    })
})

const PORT: number = parseInt(process.env.PORT || '5000', 10);
const mode: string = process.env.NODE_ENV as string
const server = app.listen(PORT, () => {
    logger.info(`Server Listening at PORT ${PORT} in ${mode} mode`.cyan.bold);
})

process.on('unhandledRejection', (error: any, promise: Promise<any>) => {
    logger.error(`Error ${error.message}`.red.bold);
    server.close(() => {
        process.exit(1);
    });
});