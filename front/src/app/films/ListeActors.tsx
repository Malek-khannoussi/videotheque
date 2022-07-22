import { FC } from 'react';

import { Badge, HStack, StackProps } from '@chakra-ui/react';

interface ListeActorsProps extends StackProps {
  actors: string;
}
export const ListeActors: FC<ListeActorsProps> = ({ actors, ...rest }) => (
  <HStack wrap="wrap" {...rest}>
    {actors.split(',')?.map((actor, key) => (
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
);
