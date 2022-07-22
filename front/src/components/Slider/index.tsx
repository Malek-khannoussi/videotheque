import { FC, useState } from 'react';

import {
  Flex,
  FlexProps,
  IconButton,
  Image,
  ImageProps,
  ScaleFade,
} from '@chakra-ui/react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

import { Film } from '@/app/films/films.types';

interface SliderProps extends FlexProps {
  sliderDatas: Film[] | null;
  onClickSlide: (slider: Film | null) => void;
}
const SlideImage: FC<ImageProps> = ({ src = '', ...props }) =>
  !!src ? (
    <Image
      m={4}
      bg="gray.50"
      borderRadius="lg"
      boxShadow="lg"
      minW={{ base: '4rem', md: '15rem' }}
      src={`data:image/png;base64,${src}`}
      {...props}
    />
  ) : null;
const Slider: FC<SliderProps> = ({
  sliderDatas = [],
  onClickSlide,
  ...rest
}) => {
  const [current, setCurrent] = useState(0);
  const length = sliderDatas?.length || 0;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <Flex
      my="8"
      minW="full"
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <IconButton
        icon={<AiFillLeftCircle size="lg" />}
        aria-label="left button"
        bgColor="transparent"
        onClick={prevSlide}
      />
      <Flex alignItems="center">
        <ScaleFade initialScale={0.6} in>
          <SlideImage
            onClick={() =>
              onClickSlide(
                sliderDatas?.[current === length - 1 ? 0 : current + 1] ?? null
              )
            }
            src={
              sliderDatas?.[current === length - 1 ? 0 : current + 1].image ??
              ''
            }
          />
        </ScaleFade>
        <ScaleFade initialScale={0.6} in>
          <SlideImage
            boxShadow="dark-lg"
            onClick={() => onClickSlide(sliderDatas?.[current] ?? null)}
            src={sliderDatas?.[current].image ?? ''}
          />
        </ScaleFade>
        <ScaleFade initialScale={0.6} in>
          <SlideImage
            onClick={() =>
              onClickSlide(
                sliderDatas?.[current === 0 ? length - 1 : current - 1] ?? null
              )
            }
            src={
              sliderDatas?.[current === 0 ? length - 1 : current - 1].image ??
              ''
            }
          />
        </ScaleFade>
      </Flex>
      <IconButton
        icon={<AiFillRightCircle size="lg" />}
        aria-label="right button"
        bgColor="transparent"
        onClick={nextSlide}
      />
    </Flex>
  );
};

export default Slider;
