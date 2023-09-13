import { Router } from 'express';

import Movie from './movieService';
import validateRequest from '../middleware/validateTypes';
import { movieDetails } from './movieInterface';

export const router = Router();

router.get('/', Movie.getCreatedMovies);
router.post('/', validateRequest(movieDetails), Movie.createMovie);

router.patch('/:id', validateRequest(movieDetails), Movie.editMovie);

router.delete('/:id', Movie.deleteMovie);
