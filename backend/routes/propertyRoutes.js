import express from 'express';
import PropertiesController from '../controllers/PropertiesController.js';

const router = express.Router();

// Connect all the routes from the controller
router.use('/PropertiesController', PropertiesController);

export default router;