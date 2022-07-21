import Axios, { AxiosError } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { Categorie, FilmList } from '@/app/films/films.types';

const filmsKeys = {
  all: () => ['filmsService'] as const,
  films: ({ page, size }: { page?: number; size?: number }) =>
    [...filmsKeys.all(), 'films', { page, size }] as const,
  film: ({ id }: { id?: string }) =>
    [...filmsKeys.all(), 'id', { id }] as const,
  categories: () => [filmsKeys.all, 'categories'],
};

export const useFilmsList = (
  { page = 0, size = 10 } = {},
  config: UseQueryOptions<
    FilmList,
    AxiosError,
    FilmList,
    InferQueryKey<typeof filmsKeys.films>
  > = {}
) => {
  const result = useQuery(
    filmsKeys.films({ page, size }),
    (): Promise<FilmList> =>
      Axios.get('/movies', { params: { page, size, sort: 'id,desc' } }),
    {
      keepPreviousData: true,
      ...config,
    }
  );

  const { content: films, totalItems } = result.data || {};
  const totalPages = Math.ceil((totalItems ?? 0) / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    films,
    totalItems,
    hasMore,
    totalPages,
    isLoadingPage,
    ...result,
  };
};

export const useCategoriesList = (
  config: UseQueryOptions<
    Categorie[],
    AxiosError,
    Categorie[],
    InferQueryKey<typeof filmsKeys.categories>
  > = {}
) => {
  const result = useQuery(
    filmsKeys.categories(),
    (): Promise<Categorie[]> => Axios.get('/categories'),
    {
      ...config,
    }
  );
  const categories = result.data?.map((value) => ({
    value: value.id,
    label: value.name,
    movies: value.movies,
  }));

  return {
    categories,
    ...result,
  };
};
