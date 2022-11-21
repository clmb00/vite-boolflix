import { reactive } from "vue";

export const store = reactive({
  apiUrl: 'https://api.themoviedb.org/3',
  apiPath: '/search/movie', 
  apiKey: '12cd508e26aee626964e63fcf50464ab',
  apiLang: 'it-IT',
  querySearch: '',
  moviesArray: []
});