// bookings.js

import $ from 'jquery';
import Cart from "../cart/cart"
import axios from 'axios'
let cart = new Cart

//Modal pożegnalny po potwierdzeniu koszyka
const modalConfirm = `<div class="modal fade" id="modal-confirm" tabindex="-1" role="dialog"
aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <h1 class="text-center">Dziękujemy za zamówienie</h1>

        </div>
        <div class="modal-footer">
            <button id="close-modal" type="button" class="btn btn-secondary" data-dismiss="modal">Zamknij</button>
        
        </div>
    </div>
</div>
</div>`


//Funkcja zwracająca obecny dzień
const today = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10)
}

//Funkcja pobierająca pokoje z serwera 
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

//Funkcja zwracająca ilość dni przy zamówionym pokoju (do policzenia ceny)
const calculateDays = (dateFrom, dateTo) => {
  let differenceInDays
  let date1 = new Date(dateFrom)
  let date2 = new Date(dateTo)

  return differenceInDays = ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
}

//Funkcja licząca całkowitą kwotę do koszyka
const calculateFullPrice = async () => {

  let cartContent = cart.getItSpaCart()
  let sum = 0
  let roomsDB = await getRooms()
  let rooms = cartContent.filter((room) => room.type === "room")
  let treatments = cartContent.filter((treatment) => treatment.type === "treatment")


  rooms.forEach(room => {
    let [roomDB] = roomsDB.filter(roomInDB => roomInDB.id == room.roomId)
    let price = calculateDays(room.dateFrom, room.dateTo) * roomDB.price

    sum += Number(price)
  });

  treatments.forEach(treatment => {
    let price = Number(treatment.quantity * treatment.price)
    sum += price
  })
  return sum
}


//Koszyk
export const bookings = async () => {

  let cartContent = cart.getItSpaCart()
  const fragment = $(new DocumentFragment());
  let roomsDB = await getRooms()
  let rooms = cartContent.filter((room) => room.type === "room")
  let treatments = cartContent.filter((treatment) => treatment.type === "treatment")

  //Wypełnienie koszyka, tutaj zwracane i łączone w string są wiersze tabeli dla pokoi pobieranych z ciasteczek
  const fillRooms = () => {
    let roomContent = rooms.map(room => {
        let [roomDB] = roomsDB.filter(roomInDB => roomInDB.id == room.roomId)

        let row = (`<tr scope="row" id="row-${room.roomId}">
        <td> ${roomDB.name} </td>
        <td>
            <input data - price="${roomDB.price}" type="date" id="dateFrom-${room.roomId}" name="trip-start" disabled
                min="${today()}" value="${room.dateFrom}" />
        </td>
        <td>
            <input data - price="${roomDB.price}" type="date" id="dateTo-${room.roomId}" name="trip-end" disabled
                min="${today()}" value="${room.dateTo}" />
        </td>
        <td> ${calculateDays(room.dateFrom, room.dateTo)} </td>
        <td> ${roomDB.price} </td>
        <td> ${calculateDays(room.dateFrom, room.dateTo) * roomDB.price}
            zł </td>
        <td class="text-center">
            <i id="deleteRoom" data-name="${room.roomId}" class="fas fa-minus-circle text-danger float-right">
            </i> </td>
    </tr>`)
        return row
      }

    )
    return roomContent.join('')
  }

  //Tutaj jest funkcja zwracająca wiersze tabeli dla zabiegów
  const fillTreatments = () => {
    let treatmentsList = treatments.map(treatment => {
      let row = `
    <tr  scope="row" id="row-${treatment.id}-${treatment.quantity}">
      <td>${treatment.name}</td>
      <td>${treatment.quantity}</td>
      <td>${treatment.price} zł/ sztukę</td>
      <td class="text-center"><i id="deleteTreatment" data-name="${treatment.name}" data-quantity="${treatment.quantity}" class="fas fa-minus-circle text-danger float-right"></i></td>
    </tr>`
      return row
    })
    return treatmentsList.join('')
  }

  //Poniżej funkcja usuwająca pokój z koszyka i jednocześnie usuwająca wiersz ze strony
  const deleteRoom = async (e) => {
    let cart = new Cart
    let cartContent = cart.getItSpaCart()
    const items = cart.getItSpaCart()
    const [item] = items.filter(item => item.roomId === e.target.dataset.name)
    cart.remove(item)
    $(`#row-${e.target.dataset.name}`).empty()
    $("#fullprice").empty()
    $("#fullprice").append(`Suma ${await calculateFullPrice()} zł`)
  }


  //Funkcja usuwająca zabieg z koszyka i jednocześnie wiersz ze strony. Jako unikalny identyfikator połączyłem id zabiegu i ilość
  const deleteTreatment = async (e) => {
    let cart = new Cart
    let cartContent = cart.getItSpaCart()
    const items = cart.getItSpaCart()
    const [item] = items.filter(item => item.name === e.target.dataset.name && item.quantity === e.target.dataset.quantity)
    cart.remove(item)
    $(`#row-${item.id}-${item.quantity}`).empty()
    $("#fullprice").empty()
    $("#fullprice").append(`Suma ${await calculateFullPrice()} zł`)

  }


  const confirmOrder = async () => {
    cart.setItSpaCart([])
    $("#treatmentsRows").empty()
    $("#roomsRows").empty()
    $("#fullprice").empty()
    $("#fullprice").append(`Suma ${await calculateFullPrice()} zł`)
  }


  //Komponent koszyka z funkcjami zwracającymi wierszę i sumę wszystkich zamówień
  const bookingCart = $(`
  <div class="card-container">
    <div class="col-md-10 ">
    <br/>
    <div class="text-center w-100"><strong>Pokoje</strong></div>
    <br/>

    <table class="table text-center" >
    <thead>
        <tr>
            <th scope="col">Nazwa</th>
            <th scope="col">Data Od</th>
            <th scope="col">Data Do</th>
            <th scope="col">Dni</th>
            <th scope="col">Cena / Doba</th>
            <th scope="col">Suma</th>
            <th scope="col ">Usuń</th>
        </tr>
    </thead>
    <tbody id="roomsRows">
        ${fillRooms()}
    </tbody>
</table>
<br/>
<div class="text-center w-100"><strong>Zabiegi</strong></div>
<br/>
<table class="table text-center">
    <thead>
        <tr>
            <th scope="col">Zabieg</th>
            <th scope="col">Ilość</th>
            <th scope="col">Cena</th>
            <th scope="col text-center">Usuń</th>
        </tr>
    </thead>
    <tbody id="treatmentsRows">
        ${fillTreatments()}
    </tbody>
</table>
    
    <div class="cartListFooter d-flex justify-content-between">
    <button data-toggle="modal"
    data-target="#modal-confirm" id="confirm" type="button" class="btn btn-success">Potwierdź zamówienie</button>
    <strong class="align-self-center" id="fullprice">Suma ${await calculateFullPrice()} zł</strong>
    </div></div></div>`);

  //"Event listnery" na usuwanie elementów
  bookingCart.find('#deleteRoom').click(deleteRoom)
  bookingCart.find('#deleteTreatment').click(deleteTreatment)
  bookingCart.find('#confirm').click(confirmOrder)


  fragment.append(bookingCart).append(modalConfirm)

  return fragment;
};