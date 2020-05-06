// rooms.js

import $ from 'jquery';
import axios from 'axios'



const getRooms = async () => {

    let roomsDB = axios.get('http://localhost:3000/rooms')
        .then(resp => {
            let rooms = resp.data;
            return rooms
        })
        .catch(error => {
            console.log(error);
        });
    return roomsDB
};


export const rooms = async () => {

    let roomsDB = await getRooms()


    const fragment = $(new DocumentFragment());

    roomsDB.map(room => {
        let cardContent = $(` 
        <div class="card">
        <div class="card-body">
          <div class="picture">
            <img src=${room.imgURL} alt=""> 
          </div>
          <div class="details">
            <h5 class="card-title">${room.name}</h5>
            <p class="card-text">${room.description}</p>
            <div class="emois">
              <div>
                <div>Ilość łóżek: ${room.beds}</div>
                <div>Ilość miejsc: ${room.guests}</div>
              </div>
            </div>
          </div>
          <div class="price">
            <h5>Cena: ${room.price} PLN</h5>
            <a href="#" class="btn btn-rooms btn-primary">Zarezerwuj</a>
          </div>
        </div>
      </div>
    `)
        fragment.append(cardContent)
    })





    return fragment;
};