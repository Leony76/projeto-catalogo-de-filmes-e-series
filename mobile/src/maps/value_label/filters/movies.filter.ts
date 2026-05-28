export const MOVIES_FILTER = [
  { value: 'none'        , label: 'Nenhum'        },
  { value: 'AZTitle'     , label: 'Título [A-Z]'  },
  { value: 'ZATitle'     , label: 'Título [Z-A]'  },
  { value: 'AZgenre'    , label: 'Gênero [A-Z]'  },
  { value: 'ZAgenre'    , label: 'Gênero [Z-A]'  },
  { value: 'mostRecent'  , label: 'Mais recente'  },
  { value: 'leastRecent' , label: 'Menos recente' },
] as const;

export type MoviesFilterOptions = typeof MOVIES_FILTER[number]['value'];