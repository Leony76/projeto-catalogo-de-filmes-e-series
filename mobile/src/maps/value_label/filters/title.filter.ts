export const TITLES_FILTER = [
  { value: 'none'        , label: 'Nenhum'                     },
  { value: 'favorites'   , label: 'Favoritos'                  },
  { value: 'AZTitle'     , label: 'Título [A-Z]'               },
  { value: 'ZATitle'     , label: 'Título [Z-A]'               },
  { value: 'AZgenre'     , label: 'Gênero [A-Z]'               },
  { value: 'ZAgenre'     , label: 'Gênero [Z-A]'               },
  { value: 'mostRecent'  , label: 'Mais recente (lançamento)'  },
  { value: 'leastRecent' , label: 'Menos recente (lançamento)' },
] as const;

export type TitlesFilterOptions = typeof TITLES_FILTER[number]['value'];