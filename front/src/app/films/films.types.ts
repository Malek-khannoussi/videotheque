export type Film = {
  id: number;
  title: string;
  duration: number;
  ageLimit: number;
  description: string;
  actors: string;
  releaseDate: string;
  image: string;
  imageContentType: string;
};

export type FilmList = {
  content: Film[];
  totalItems: number;
};

export type Categorie = {
  id: number;
  name: string;
  movies: Film[];
};
