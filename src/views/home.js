// home.js

import $ from 'jquery';


$(function () {
    $("#datepicker").datepicker();
});


export const home = () => {
    const fragment = $(new DocumentFragment());

    const h1 = $('<h1>Home</h1>');
    const p = $('<p>Lorem ipsum...</p>');

    fragment.append(h1).append(p);

    return fragment;
};