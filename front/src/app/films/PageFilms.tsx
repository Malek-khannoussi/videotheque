import React, { useState } from 'react';

import { Badge, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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

dayjs.extend(duration);
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
    (!currentCategory && films) || !!currentCategory?.movies?.length;
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
        {!!curentFilm ? (
          <HStack justifyContent="space-between" mb="6">
            <VStack alignItems="flex-start">
              <Heading> {curentFilm?.title}</Heading>
              <Text fontSize="xl"> {curentFilm?.description}</Text>
              <HStack wrap="wrap">
                {curentFilm?.actors.split(',')?.map((actor, key) => (
                  <Badge
                    borderRadius="lg"
                    fontSize="lg"
                    px="2"
                    display="inline"
                    colorScheme="purple"
                    key={key}
                    m="1"
                  >
                    {actor}
                  </Badge>
                ))}
              </HStack>
              <Text>
                duration:
                {dayjs.duration(curentFilm?.duration).format('HH:mm:ss')}
              </Text>
              <Text> age: - {curentFilm?.ageLimit}</Text>
            </VStack>
            {curentFilm?.image && (
              <Image
                borderRadius="lg"
                boxShadow="xl"
                src={`data:image/png;base64,${curentFilm?.image}`}
                minW="20rem"
              />
            )}
          </HStack>
        ) : (
          isSlideVisibel && (
            <Heading textAlign="center">Sélectionner un film</Heading>
          )
        )}
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
