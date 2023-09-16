require('dotenv');
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';

import { router as userRouter } from './user/userRoutes';
import { router as movieRouter } from './movie/movieRoutes';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { notFoundMiddleware } from './middleware/not-found';
import { authenticateUser } from './middleware/authentication';
import cors from 'cors';

const PORT = 8080;

const app = express();
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }));
async function initServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
}

async function initRouter() {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Health works!' });
  });

  app.use('/user', userRouter);
  app.use('/movie', authenticateUser, movieRouter);
  app.use(errorHandlerMiddleware);
  app.use(notFoundMiddleware);
}

export async function init() {
  try {
    initRouter();
    initServer();
  } catch (error) {}
}

init();
// const start
