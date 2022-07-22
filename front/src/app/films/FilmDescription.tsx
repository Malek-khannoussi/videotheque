import { FC } from 'react';

import {
  HStack,
  Heading,
  Image,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { ListeActors } from '@/app/films/ListeActors';
import { Film } from '@/app/films/films.types';

dayjs.extend(duration);

interface FilmDescriptionProps extends StackProps {
  film: Film | null;
  isSlideVisibel: boolean;
}
export const FilmDescription: FC<FilmDescriptionProps> = ({
  film,
  isSlideVisibel,
  ...rest
}) =>
  !!film ? (
    <HStack justifyContent="space-between" mb="6" {...rest}>
      <VStack alignItems="flex-start">
        <Heading> {film?.title}</Heading>
        <Text fontSize="xl"> {film?.description}</Text>
        <ListeActors actors={film?.actors} />
        <Text>
          duration:
          {dayjs.duration(film?.duration).format('HH:mm:ss')}
        </Text>
        <Text> age: - {film?.ageLimit}</Text>
      </VStack>
      {film?.image && (
        <Image
          borderRadius="lg"
          boxShadow="xl"
          src={`data:image/png;base64,${film?.image}`}
          minW="20rem"
        />
      )}
    </HStack>
  ) : (
    (isSlideVisibel && (
      <Heading textAlign="center">Sélectionner un film</Heading>
    )) ||
    null
  );
