import { Request, Response } from 'express';
import createAPIError from '../utils/error';
import { StatusCodes } from 'http-status-codes';
import Movie from './movieSchema';

const getCreatedMovies = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const resp = await Movie.getUserCreatedMovies(userId);

    if (!resp.success) {
      return createAPIError(StatusCodes.NOT_FOUND, resp.message, res);
    }

    const data = resp.data;

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    let message = error.msg || 'Something went wrong!';
    createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, message, res);
  }
};

const createMovie = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    let { name, rating, cast, genre, releaseDate } = req.body;

    releaseDate = new Date(releaseDate);

    const resp = await Movie.createMovie({
      name,
      rating,
      cast,
      genre,
      releaseDate,
      userId
    });

    if (!resp.success) {
      return createAPIError(StatusCodes.NOT_FOUND, resp.message, res);
    }

    const data = resp.data;

    return res.status(StatusCodes.OK).json({ success: true, data });
  } catch (error) {
    let message = error.msg || 'Something went wrong!';
    createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, message, res);
  }
};

const editMovie = async (req: any, res: Response) => {
  try {
    const userId = parseInt(req.user.id);
    const movieId = parseInt(req.params.id);

    const response = await Movie.checkIfMovieExists(movieId);

    if (!response.success) {
      return createAPIError(StatusCodes.NOT_FOUND, response.message, res);
    }

    if (response.data.userId != userId) {
      return createAPIError(
        StatusCodes.UNAUTHORIZED,
        `Not authorized to edit movie!`,
        res
      );
    }
    let { name, rating, cast, genre, releaseDate } = req.body;

    const data = {
      name,
      rating,
      cast,
      genre,
      releaseDate: new Date(releaseDate)
    };
    const resp = await Movie.editMovie(movieId, data);

    if (!resp.success) {
      return createAPIError(StatusCodes.NOT_FOUND, resp.message, res);
    }

    return res.status(StatusCodes.OK).json({ success: true, data: resp.data });
  } catch (error) {
    let message = error.msg || 'Something went wrong!';
    createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, message, res);
  }
};

const deleteMovie = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const movieId = parseInt(req.params.id);

    const response = await Movie.checkIfMovieExists(movieId);

    if (!response.success) {
      return createAPIError(StatusCodes.NOT_FOUND, response.message, res);
    }

    if (response.data.userId != userId) {
      return createAPIError(
        StatusCodes.UNAUTHORIZED,
        `Not authorized to delete movie!`,
        res
      );
    }

    const resp = await Movie.deleteMovie(movieId);

    if (!resp.success) {
      return createAPIError(StatusCodes.NOT_FOUND, resp.message, res);
    }

    const message = resp.message;

    return res.status(StatusCodes.OK).json({ success: true, message });
  } catch (error) {
    let message = error.msg || 'Something went wrong!';
    createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, message, res);
  }
};

export = {
  getCreatedMovies,
  createMovie,
  editMovie,
  deleteMovie
};
