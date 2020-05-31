import $ from 'jquery';
import Cart from "../cart/cart"


// nav-item.js


// navItem otrzymuje komplente informacje o danej "ścieżce"
export const navItem = (route) => {

  const fragment = $(new DocumentFragment());

  //   let cart = new Cart
  //   let cartContentCookie = cart.getItSpaCart()
  //   let rooms = cartContentCookie.filter((room) => room.type === "room")



  //   const calculateDays = (dateFrom, dateTo) => {
  //     let differenceInDays
  //     let date1 = new Date(dateFrom)
  //     let date2 = new Date(dateTo)

  //     return differenceInDays = ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
  //   }

  //   const fillRooms = () => {

  //     let rooms = cartContentCookie.filter((room) => room.type === "room")

  //     let roomContent = rooms.map(room => {

  //         let row = (`
  //         <tr  scope="row" >
  //         <td>${room.name}</td>
  //         <td>${calculateDays(room.dateFrom, room.dateTo)}</td>
  //         <td>${room.price}</td>
  //         </tr>`)
  //         return row
  //       }

  //     )
  //     return roomContent.join('')
  //   }


  //   const fillTreatments = () => {

  //     let treatments = cartContentCookie.filter((treatment) => treatment.type === "treatment")

  //     let treatmentsList = treatments.map(treatment => {
  //       let row = `
  //   <tr  scope="row" id="row-${treatment.id}-${treatment.quantity}">
  //     <td>${treatment.name}</td>
  //     <td>${treatment.quantity}</td>
  //     <td>${treatment.price} zł/ sztukę</td>

  //   </tr>`
  //       return row
  //     })
  //     return treatmentsList.join('')
  //   }

  //   const bookingCart = $(`
  //   <div  class="non-visible cartList">
  //     <div class="col-md-10 cartListContent ">
  //     <br/>
  //     <div class="text-center w-100"><strong>Pokoje</strong></div>
  //     <br/>

  //     <table class="table text-center" >
  //     <thead>
  //         <tr>
  //             <th scope="col">Nazwa</th>
  //             <th scope="col">Dni</th>
  //             <th scope="col">Cena / Doba</th>
  //         </tr>
  //     </thead>
  //     <tbody>
  //         ${fillRooms()}
  //     </tbody>
  // </table>
  // <br/>
  // <div class="text-center w-100"><strong>Zabiegi</strong></div>
  // <br/>
  // <table class="table text-center">
  //     <thead>
  //         <tr>
  //             <th scope="col">Zabieg</th>
  //             <th scope="col">Ilość</th>
  //             <th scope="col">Cena</th>
  //         </tr>
  //     </thead>
  //     <tbody>
  //         ${fillTreatments()}
  //     </tbody>
  // </table>`);



  let a
  console.log(route)
  const li = $(`<li class="nav-item"></li>`);
  if (route.name === "Koszyk") {
    a = $(`<button id="cartIcon" class="btn btn-dark mr-auto btn-cart">
            <i class="fas fa-shopping-cart"></i>
            ${route.name}
            </button>`)

    // a.hover(
    //   function () {
    //     bookingCart.toggleClass("non-visible")
    //   },
    //   function () {

    //     bookingCart.toggleClass("non-visible")
    //   }
    // );


  } else {
    a = $(`<a class="text-light nav-link">${route.name}</a>`);
  }


  a.on('click', (event) => {
    event.preventDefault();
    // emituje zdarzenie "routechange" (bąbelkowanie)
    a.trigger('routechange', {
      path: route.path
    });
  });



  li.append(a);
  // li.append(bookingCart)


  return (li);
};