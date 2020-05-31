// home.js

import $ from 'jquery';
import datepicker from 'jquery-ui/ui/widgets/datepicker';


//Komponent strony głównej
export const home = async () => {

    const fragment = $(new DocumentFragment());

    const aurora = $(`<div class="mainpage">
    <img class="aurora-jpg" src="http://itspa.lukzerom.ovh/pictures/aurora.jpg" alt="aurora">
    <div class="aurora-desc">
        <h2 class="text-light">Witaj na stronie IT Spa</h2>
        <p class="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum cum distinctio recusandae iure dolor
            perspiciatis neque debitis id ab iste! Eum eveniet corrupti sit magni magnam sequi fugit eaque qui.</p>
    </div>
</div>`);


    const programmer = $(`<div class="programmer">
    <img class="programmer-picture" src="http://itspa.lukzerom.ovh/pictures/programista.jpg" alt="jacek programmer photo">

    <div class="programmer-desc">
        <blockquote class="blockquote">
            <strong class="m-b-0">Dawno tak nie odpocząłem od komputera - serdecznie polecam </strong>
            <p class="m-b-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam nihil molestiae quas
                atque earum error
                aliquid? Enim iste eaque saepe, quos quaerat eius obcaecati ut optio aliquam autem, at numquam.</p>
            <footer class="blockquote-footer">Jacek <cite title="Tytuł książki, strona 25">Programista Frontend</cite>
            </footer>
        </blockquote>
    </div>`)

    const sauna = $(`<img class="sauna" src="http://itspa.lukzerom.ovh/pictures/sauna1.jpg" alt="sauna picture">`)

    const services = $(`<div class="services">
    <div class="div1"> <img src="http://itspa.lukzerom.ovh/pictures/agat.jpg" alt="agat picture"> </div>
    <div class="div2">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident minus sint perspiciatis, enim quae fugiat
            magni sit, cupiditate eos corporis ex deserunt nobis ipsum, laborum voluptas nihil accusantium facere odio?
        </p>
    </div>
    <div class="div3"> <img src="http://itspa.lukzerom.ovh/pictures/sok.jpg" alt="juice picture"> </div>
    <div class="div4">
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus recusandae fugiat voluptatem
            quisquam rem neque assumenda debitis modi cumque. Hic, sequi neque accusantium deserunt autem numquam harum
            velit inventore cupiditate. </p>
    </div>
    <div class="div5">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi dolorum eius beatae obcaecati
            corporis ea possimus cupiditate reprehenderit ad facere nesciunt minima tempora placeat incidunt atque,
            numquam,
            perspiciatis rerum!</p>
    </div>
    <div class="div6"> <img src="http://itspa.lukzerom.ovh/pictures/masaz.jpg" alt="massage"> </div>
    <div class="div7">
        <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam dolores nobis pariatur eius,
            sapiente recusandae error rem alias, vero voluptatibus quisquam, provident a dicta odit ipsa unde velit
            aperiam
            accusantium. </p>
    </div>
    <div class="div8"> <img src="http://itspa.lukzerom.ovh/pictures/reczniki.jpg" alt="towels"> </div>
    <div class="div9"> <img src="http://itspa.lukzerom.ovh/pictures/sauna.jpg" alt="saun"> </div>
    <div class="div10">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo autem numquam aspernatur voluptates atque
            ratione blanditiis tempore, esse rerum eos doloribus iure consequuntur aut tempora est veritatis. Deserunt,
            deleniti qui.</p>
    </div>
    <div class="div11"><img src="http://itspa.lukzerom.ovh/pictures/kot.jpg" alt="cat"> </div>
    <div class="div12">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid iusto at et harum, a, modi error
            dignissimos aliquam consequatur molestias optio dolorem doloremque tempora iure, amet alias vitae quia
            distinctio.</p>
    </div>
    <div class="div13">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique soluta rerum vitae ut quo optio,
            repellendus vero. Dolore necessitatibus eveniet, molestias eius obcaecati repudiandae aliquam voluptatum
            assumenda possimus aut alias.</p>
    </div>
    <div class="div14"> <img src="http://itspa.lukzerom.ovh/pictures/avocado.jpg" alt="avocado"></div>
    <div class="div15">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ullam, quos veritatis beatae excepturi
            labore quidem repellat sapiente, distinctio architecto incidunt magnam id, recusandae aperiam. Doloribus
            esse ducimus incidunt distinctio.</p>
    </div>
    <div class="div16"> <img src="http://itspa.lukzerom.ovh/pictures/kamien.jpg" alt="stone"> </div><div class="div17"><h1 class="text-center">Nasze usługi</h1></div></div>
`)

    fragment.append(aurora).append(programmer).append(sauna).append(services)

    return fragment;
};