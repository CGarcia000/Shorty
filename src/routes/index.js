import express from 'express';

// import loginRouter from './loginRouter.js'
import urlRouter from './urlRouter.js'
// import usersRouter from './usersRouter.js'
// import rankingRouter from './rankingRouter.js'


const router = express.Router();

// router.use(loginRouter);
router.use(urlRouter);
// router.use(usersRouter);
// router.use(rankingRouter);

export default router;