// treatments.js

import $ from 'jquery';
import axios from 'axios'
import Cart from '../cart/cart'

//Toast po złożeniu zamówienia na zabieg
const treatmentToast = `<div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
<div class="toast" id="treatmentToast" style="position: fixed; top: 0; right: 0; margin: 50px;" data-autohide="false">
    <div class="toast-header bg-success text-light">
        <strong class="mr-auto">Zabieg dodany do koszyka</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body d-flex">
    <i class="fas fa-check-circle text-success fa-3x align-self-center" style="padding:0 15px;"></i>
       <strong>Twój zabieg został dodany do koszyka. Kliknij w koszyk aby podsumować zamówienie</strong>
    </div>
</div>
</div`

let cart = new Cart
let quantity = "1"


//Funkcja pobierająca zabiegi 
const getTreatments = async () => {

    let treatmentsDB = axios.get('http://localhost:3000/treatments')
        .then(resp => {
            let treatments = resp.data;
            return treatments
        })
        .catch(error => {
            console.log(error);
        });
    return treatmentsDB
};


//Komponent zabiegów 
export const treatments = async () => {
    const fragment = $(new DocumentFragment());

    let treatmentsDB = await getTreatments()

    //Tłumacz przekładający obszar zabiegu na j. polski 
    const translator = (area) => {

        if (area === "body") {
            return "Ciało"
        }
        if (area === "legs") {
            return "Nogi"
        }
        if (area === "hands") {
            return "Dłonie"
        }
        if (area === "face") {
            return "Twarz"
        }
        if (area === "back") {
            return "Plecy"
        }
    }

    //Funkcja zmieniająca flagę quantitity - ilość zamówionego zabiegu (po zamówieniu flaga wraca do domyślnego 1)
    const changeTreatmentQuantity = (e) => {
        quantity = e.target.value
    }


    //Dodanie zabiegu do koszyka
    const addTreatmentToCart = async (e) => {
        e.preventDefault()
        let treatmentId = e.target.id

        let [treatment] = treatmentsDB.filter(treatment => treatment.id == treatmentId)

        console.log(treatment)

        await cart.add({
            name: treatment.name,
            id: treatment.id,
            price: treatment.price,
            time: treatment.time,
            type: "treatment",
            quantity: quantity
        })
        $(`#modal-treatment-${e.target.id}`).modal('toggle')
        $('#treatmentToast').toast('show')
        quantity = "1"
    }
    //Funkcja zwracająca karty zabiegów
    treatmentsDB.map(treatment => {
            let cards = $(`
            <div class="card card-treatment">
            <img class="card-img-top " src="${treatment.imgURL}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${treatment.name}</h5>
                <div class="row">
                    <h6 class="card-subtitle mb-2 text-muted col-md-6"><i class="far fa-clock"></i> ${treatment.time} min </h6>
                    <h6 class="card-subtitle mb-2 text-muted col-md-6"><i class="fas fa-spa"></i> ${translator(treatment.area)}
                    </h6>
                </div>
                <h3>${treatment.price} zł</h3>
                <button type="button" class="btn btn-treatment btn-primary" data-toggle="modal"
                    data-target="#modal-treatment-${treatment.id}" id="${treatment.id}">Zarezerwuj</button>
            </div>
        </div>
         `)


            fragment.append(cards)

        }

    )
    fragment.append(treatmentToast)

    //Funkcja zwracająca modale zabiegów 
    treatmentsDB.map(treatment => {

        let treatmentModal = $(`
        <div class="modal fade" id="modal-treatment-${treatment.id}" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${treatment.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img class="w-100" src="${treatment.imgURL}" alt="">
                    <hr>
                    <div class="col-12 d-flex">
                        <h6 class="card-subtitle mb-2 text-muted col-md-5 align-self-center"><i class="far fa-clock"></i> ${treatment.time}
                            min </h6>
                        <h6 class="card-subtitle mb-2 text-muted col-md-5 align-self-center float-right"><i class="fas fa-spa"></i>
                            ${translator(treatment.area)}</h6>
                    </div>
    
                    <hr/>
                    <div class="form-group row">
                         <label for="example-number-input" class="col-2 col-form-label">Ilość:</label>
                         <div class="col-10">
                          <input class="form-control" type="number" min="1" value="1" id="input-quantity">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <h2 class="mr-auto">${treatment.price} zł / sztukę </h2>
                <button id="close-modal" type="button" class="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                <button type="button" data-price="${treatment.price}" name="${treatment.name}" id="${treatment.id}"
                    class="btn btn-primary treatment-reservation">Zarezerwuj</button>
            </div>
            </div>
        </div>
    </div>
    
        `)
        treatmentModal.find('.treatment-reservation').click(addTreatmentToCart)
        treatmentModal.find('#input-quantity').change(changeTreatmentQuantity)
        fragment.append(treatmentModal)

    })


    return fragment;
};