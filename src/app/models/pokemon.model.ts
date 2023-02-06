//Basic information of a pokemon used for lists
export interface PokemonBasic {
  name: string;
  url: string;
  id: number;
  imgUrl: string;
}

//Detailed pokemon information (on-demand)
export interface PokemonDetails {
  name: string;
  id: number;
}
