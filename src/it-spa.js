import 'bootstrap/dist/css/bootstrap.css';
import './it-spa.scss';
import $ from 'jquery';
import { Router, routes } from './router';
import { nav } from './navigation/nav';

const main = $('main');
const router = new Router(routes);

main.before(nav);

// element main bedzie "outletem" na nasze widoki
router.mount(main);

// przy uruchomieniu strony pierwszy raz
// nawigujemy do sciezki z paska adresu 
router.init();
