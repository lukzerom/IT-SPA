import './jquery-global'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery-ui/demos/demos.css';
import './it-spa.scss';
import {
    Router,
    routes
} from './router';
import {
    nav
} from './navigation/nav';



const main = $('main');
const router = new Router(routes);

main.before(nav);

// element main bedzie "outletem" na nasze widoki
router.mount(main);

// przy uruchomieniu strony pierwszy raz
// nawigujemy do sciezki z paska adresu 
router.init();