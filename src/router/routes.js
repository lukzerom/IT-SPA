// odwolujac sie do katalogu z "beczka" (index.js -- barrel)
// mozna pisac krotsze importy
import {
    home,
    rooms,
    treatments,
    bookings
} from '../views';

export const routes = [{
        name: 'O nas',
        path: '/',
        component: home,
        data: {}
    },
    {
        name: 'Pokoje',
        path: '/rooms',
        component: rooms,
        data: {}
    },
    {
        name: 'Zabiegi',
        path: '/treatments',
        component: treatments,
        data: {}
    },
    {
        name: 'Koszyk',
        path: '/bookings',
        component: bookings,
        data: {}
    }
];