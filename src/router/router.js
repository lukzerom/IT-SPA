import $ from 'jquery';
import { oops } from '../views/oops';

export class Router {

    constructor(routes) {
        this.routes = routes;
        this.outlet;
        this.body = $(document.body);
    }

    mount(outlet) {
        this.outlet = outlet;
        this.body.on('routechange', (event, detail) => {
            const { path } = detail;
            this.navigate(path);
        });
    }

    init() {
        const path = location.pathname;
        this.navigate(path);
    }

    get(path) {
        // znajduje sciezke o zadanym path lub zwraca undefined
        return this.routes.find(route => route.path === path);
    }

    has(path) {
        return this.get(path) !== undefined;
    }

    navigate(path, data = {}) {
        if (this.has(path)) {
            // obsluguje istniejaca sciezke
            const { component } = this.get(path);
            const html = component();
            // renderuje nowy widok wewnatrz elementu "outlet"
            this.outlet.empty().append(html);
        } else {
            // obluguje nieistniejaca sciezke (oops...)
            const html = oops();
            this.outlet.empty().append(html);
        }

        // zapamietuje nowy "stan" w przegladarce oraz
        // ustawia wybrana sciezke -- path
        history.pushState(data, '', path);
    }

}
