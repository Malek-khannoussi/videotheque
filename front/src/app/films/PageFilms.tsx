import React, { useState } from 'react';

import { HStack, Heading } from '@chakra-ui/react';

import { FilmDescription } from '@/app/films/FilmDescription';
import { useCategoriesList, useFilmsList } from '@/app/films/films.service';
import { Categorie, Film } from '@/app/films/films.types';
import { Page, PageContent } from '@/app/layout';
import { usePaginationFromUrl } from '@/app/router';
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
  Select,
} from '@/components';
import Slider from '@/components/Slider';

export const PageFilms = () => {
  const [currentCategory, setCurentCategory] = useState<Categorie | null>(null);
  const { page, setPage } = usePaginationFromUrl();
  const pageSize = 20;
  const { categories } = useCategoriesList();
  const { films, totalItems, isLoadingPage } = useFilmsList({
    page: page - 1,
    size: pageSize,
  });
  const [curentFilm, setCurentFilm] = useState<Film | null>(null);
  const isSlideVisibel =
    (!currentCategory && !!films) || !!currentCategory?.movies?.length;
  return (
    <Page>
      <PageContent>
        <HStack alignItems="flex-start" justifyContent="space-between" my="5">
          <Heading size="xl" mb="4">
            Films
          </Heading>
          <Select
            isClearable
            minW="60"
            options={categories}
            value={
              categories?.find(
                (categorie: TODO) => categorie.value === currentCategory
              ) ?? undefined
            }
            placeholder="Category"
            onChange={(fieldValue: TODO) => {
              setCurentFilm(null);
              setCurentCategory(fieldValue ? fieldValue : null);
            }}
          />
        </HStack>

        <FilmDescription film={curentFilm} isSlideVisibel={isSlideVisibel} />

        {isSlideVisibel ? (
          <>
            <Slider
              sliderDatas={
                currentCategory ? currentCategory.movies : films || null
              }
              onClickSlide={(film: Film) => setCurentFilm(film)}
            />
            <Pagination
              isLoadingPage={isLoadingPage}
              setPage={setPage}
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
            >
              <PaginationButtonFirstPage />
              <PaginationButtonPrevPage />
              <PaginationInfo flex="1" />
              <PaginationButtonNextPage />
              <PaginationButtonLastPage />
            </Pagination>
          </>
        ) : (
          <Heading textAlign="center">empty catechory</Heading>
        )}
      </PageContent>
    </Page>
  );
};
