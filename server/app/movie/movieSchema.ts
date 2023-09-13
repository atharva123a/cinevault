import { PrismaClient } from '@prisma/client';
import { Movie } from './movieInterface';

const prisma = new PrismaClient();

const createMovie = async (data: Movie) => {
  try {
    const movie = await prisma.movie.create({ data });

    return { success: true, data: movie };
  } catch (error) {
    const err = error.msg || "Couldn't create a movie! Please try again!";
    return { success: false, message: err };
  }
};

const getUserCreatedMovies = async (userId: number) => {
  try {
    const movie = await prisma.movie.findMany({ where: { userId } });

    return { success: true, data: movie };
  } catch (error) {
    const err = error.msg || "Couldn't get movies! Please try again!";
    return { success: false, message: err };
  }
};

const checkIfMovieExists = async (movieId: number) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    });

    if (movie) {
      return { success: true, data: movie };
    }

    return { success: false, message: `No movie found with id: ${movieId}` };
  } catch (error) {
    const err =
      error.msg || "Couldn't check if movie exists! Please try again!";
    return { success: false, message: err };
  }
};

const editMovie = async (movieId: number, data: Partial<Movie>) => {
  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
      data
    });
    return { success: true, data: updatedMovie };
  } catch (error) {
    console.log(error, 'error')
    const err = error.msg || "Couldn't edit movie! Please try again!";
    return { success: false, message: err };
  }
};

const deleteMovie = async (movieId: number) => {
  try {
    await prisma.movie.delete({ where: { id: movieId } });

    return { success: true, message: 'Movie deleted successfully!' };
  } catch (error) {
    const err = error.msg || "Couldn't delete movie! Please try again!";
    return { success: false, message: err };
  }
};

export = {
  createMovie,
  getUserCreatedMovies,
  editMovie,
  deleteMovie,
  checkIfMovieExists
};
