// nav.js

import $ from 'jquery';
import {
  routes
} from '../router';
import {
  navItem
} from './nav-item';

export const nav = () => {
  const fragment = $(new DocumentFragment());

  const navBar = $(`
        <nav class="nav navbar navbar-expand navbar-dark bg-dark justify-content-end">
            <span class="navbar-brand"><i class="fas fa-spa"></i> IT SPA</span>
            <ul class="navbar-nav mr-auto"></ul>
        </nav>
    `);



  // uzupelnij <ul> elementami <li>
  const navBarItems = routes.map(route => navItem(route));

  navBar.find('ul').append(navBarItems);
  fragment.append(navBar);



  return fragment;
};