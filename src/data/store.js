import { reactive } from "vue";

export const store = reactive({
  apiUrl: 'https://api.themoviedb.org/3',
  apiPath: '/search/movie', 
  apiKey: '12cd508e26aee626964e63fcf50464ab',
  apiLang: 'it-IT',
  querySearch: '',
  lastSearch: '',
  movies: {
    array: [],
    page: 1
  },
  series: {
    array: [],
    page: 1
  },
  trendingMovies: {
    array: [],
    page: 1
  },
  trendingSeries: {
    array: [],
    page: 1
  },
  popularMovies: {
    array: [],
    page: 1
  },
  popularSeries: {
    array: [],
    page: 1
  },
  topRatedMovies: {
    array: [],
    page: 1
  },
  topRatedSeries: {
    array: [],
    page: 1
  },
  currentPage: 'Home'
});