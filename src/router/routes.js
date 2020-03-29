// odwolujac sie do katalogu z "beczka" (index.js -- barrel)
// mozna pisac krotsze importy
import { home, rooms, treatments, bookings } from '../views';

export const routes = [
    {
        name: 'Home',
        path: '/',
        component: home,
        data: {}
    },
    {
        name: 'Rooms',
        path: '/rooms',
        component: rooms,
        data: {}
    },
    {
        name: 'Treatments',
        path: '/treatments',
        component: treatments,
        data: {}
    },
    {
        name: 'Bookings',
        path: '/bookings',
        component: bookings,
        data: {}
    }
];