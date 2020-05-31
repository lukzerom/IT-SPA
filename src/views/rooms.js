// rooms.js
import $ from 'jquery';
import axios from 'axios'
import Cart from "../cart/cart"
//Ikona łóżka
const bedIcon = '<i class="fas fa-bed"></i>'

//Ikona użytkownika
const userIcon = '<i class="fas fa-user"></i>'

//Alert, gdy liczba wybranych dni będzie mniejsza lub równa 0 
const alert = `<div class="alert alert-warning alert-dismissible fade show text-center " role="alert">
Nie można zarezerwować pokoju na ilości dni <= 0 <button type="button"
    class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
</div>`

//Popup, toast, wyskakujący po dodaniu pokoju do koszyka 
const roomToast = `<div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
<div class="toast" id="roomToast" style="position: fixed; top: 0; right: 0; margin: 50px;" data-autohide="false">
    <div class="toast-header bg-success text-light">
        <strong class="mr-auto">Pokój dodany do koszyka</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body d-flex">
    <i class="fas fa-check-circle text-success fa-3x align-self-center" style="padding:0 15px;"></i>
       <strong>Twój pokój został dodany do koszyka, dodaj kolejny pokój lub zobacz jakie oferujemy zabiegi!</strong>
    </div>
</div>
</div>`

//Funkcja pobierająca pokoje z bazy danych 
const getRooms = async () => {

  let roomsDB = axios.get('https://my-json-server.typicode.com/lukzerom/IT-SPA/rooms')
    .then(resp => {
      let rooms = resp.data;
      return rooms
    })
    .catch(error => {
      console.log(error);
    });
  return roomsDB
};

//Funkcja zwracająca dzisiejszy dzień (do datepickerów - minimalna wartość)
const today = () => {
  const date = new Date();

  return date.toISOString().slice(0, 10)
}

//Funkcja zwracająca dzień za tydzień ale ostatecznie nie wykorzystana
const nextWeek = () => {
  const date = new Date();

  date.setDate(date.getDate() + 7);

  return date.toISOString().slice(0, 10)
}


//Komponent pokojów
export const rooms = async () => {

  let dateFrom = today()
  let dateTo = today()
  let differenceInDays = null
  let cart = new Cart

  //Funkcja zwracająca różnicę w dniach które wybrał użytkownik 
  const calculateDays = () => {
    const date1 = new Date(dateFrom)
    const date2 = new Date(dateTo)


    return differenceInDays = ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))

  }

  //Funkcja aktualizująca podsumowanie wyboru pokoju 
  const summaryContentChange = (price, id) => {
    let days = calculateDays()
    if (days <= 0) {
      days = 0
    }

    $(`#summary-${id}`).empty
    $(`#summary-${id}`).text(`Ilość dni: ${days} * ${price} zł = ${days * price} zł`)
  }

  //Pobranie pokojów z bazy danych 
  let roomsDB = await getRooms()

  const fragment = $(new DocumentFragment());

  //Generowanie kard z pokojami 
  roomsDB.map(room => {
    let cardContent = $(` 
    <div class="card-container">
        <div class="roomcard">
        <div class="card">
        <div class="card-body">
          <div class="picture">
            <img src=${room.imgURL} class="roomImg" alt=""> 
          </div>
          <div class="details">
            <h5 class="card-title">${room.name}</h5>
            <p class="card-text">${room.description}</p>
            <div class="emois">
              <div>
                <div>Ilość łóżek: ${room.beds} ${bedIcon.repeat(room.beds)} </div>
                <div>Ilość miejsc: ${room.guests} ${userIcon.repeat(room.guests)} </div>
              </div>
            </div>
          </div>
          <div class="price">
            <h5>Cena: ${room.price} PLN</h5>
            <button type="button"  class="btn btn-rooms btn-primary" data-toggle="modal" data-target="#modal-${room.id}" id=${room.id}" >Zarezerwuj</button>
          </div>
        </div>
        </div>
      </div>
      </div>
    `)
    fragment.append(cardContent)



  })
  //Tutaj dodanie "tosta"
  fragment.append(roomToast)

  //Generowanie modali dla szczegółow zamówienia pokoju
  roomsDB.map(room => {

    let roomModal = $(`
    <div class="modal fade" id="modal-${room.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${room.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <img class="w-100" src="${room.imgURL}" alt="">
                <hr>
                <div class="col-12">
                    <p class="d-inline">Ilość łóżek: ${room.beds} ${bedIcon.repeat(room.beds)}</p>
                    <p class="float-right d-inline">Ilość miejsc: ${room.guests} ${userIcon.repeat(room.guests)}</p>
                </div>
                <hr>
                <p class="text-center mb-0">${room.description}</p>
                <hr />
                <form>
                    <div class="col-md-12 form-group d-flex">
                        <div class="col-md-6">
                            <label for="dateFrom">Data od:</label>
                            <input data-price="${room.price}" type="date" id="dateFrom-${room.id}" name="trip-start"
                                min="${today()}" />
                        </div>
                        <div class="col-md-6 float-right">
                            <label for="dateTo">Data do:</label>
                            <input data-price="${room.price}" type="date" id="dateTo-${room.id}" name="trip-end"
                                min="${today()}">
                        </div>
                    </div>
                </form>

                <hr />
                <h6 class="text-center w-100 text-info font-weight-bold">Podsumowanie:</h6>
                <h6 id="summary-${room.id}" class="text-center w-100 text-primary font-weight-bold">Ilość dni:
                    ${calculateDays()} * ${room.price} zł = ${calculateDays() * room.price} zł</h6>

            </div>
            <div class="modal-footer">
                <h2 class="mr-auto">${room.price} zł / dobę</h2>
                <button id="close-modal" type="button" class="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                <button type="button" data-price="${room.price}" name="${room.name}" data-room=${room.id} id="reservationButton"
                    class="btn btn-primary">Zarezerwuj</button>
            </div>
        </div>
    </div>
</div>

    `)
    $('body').append(roomModal)

    //Tutaj są event listners na zdarzenia wyboru daty = dla każdego datepickera osobno

    //Dla datepickera OD
    roomModal.find(`#dateFrom-${room.id}`).change(function (e) {

      let price = e.target.dataset.price
      dateFrom = e.target.value

      calculateDays()
      summaryContentChange(price, room.id)
    })

    //dla datepickera DO
    roomModal.find(`#dateTo-${room.id}`).change(function (e) {
      let price = e.target.dataset.price
      dateTo = e.target.value

      calculateDays()
      summaryContentChange(price, room.id)
    })

    //Funkcja dodająca zamówiony pokój do koszyka w ciasteczkach 
    roomModal.find('#reservationButton').click(async function (e) {

      let roomId = e.target.dataset.room
      let name = e.target.name
      let finalPrice = e.target.dataset.price * differenceInDays
      let totalDays = differenceInDays
      if (differenceInDays <= 0) {
        return $(".modal-body").append(alert)
      }

      let rooms = cart.getItSpaCart().filter((room) => room.type === "room")


      await cart.add({
        name,
        type: "room",
        roomId,
        dateFrom,
        dateTo,
        price: e.target.dataset.price
      })

      $(`#modal-${room.id}`).modal('toggle')
      $('#roomToast').toast('show')
    })


  })


  return fragment;
};