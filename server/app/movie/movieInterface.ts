export interface Movie {
  id?: number;
  name: string;
  rating: number;
  cast: string[];
  genre: string;
  releaseDate: Date;
  userId: number;
}

import { coerce, date, number, object, string, TypeOf } from 'zod';

export const movieDetails = object({
  body: object({
    _id: string().optional(),
    name: string({
      required_error: 'Please provide your movie name!'
    }),
    rating: number({
      required_error: 'Please provide your movie rating!'
    }),
    cast: string({
      required_error: 'Please provide your movie cast!'
    }).array(),
    genre: string({
      required_error: 'Please provide movie genre!'
    }),
    releaseDate: coerce.date()
  })
});

export type MovieDetails = TypeOf<typeof movieDetails>['body'];
