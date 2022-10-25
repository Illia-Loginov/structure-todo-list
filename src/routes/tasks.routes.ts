import express from 'express';
import { tasksController } from '../controllers';

const router = express.Router();

router
    .route('/')
    .post(tasksController.createOne)
    .get(tasksController.getMany);

router
    .route('/:taskId')
    .delete(tasksController.deleteOne)
    .patch(tasksController.updateOne);

router
    .route('/:taskId/complete')
    .patch(tasksController.completeOne);

export default router;