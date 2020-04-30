/***************************** Export e import - functions  *****************************/

export { titles_section, section1_gif, section2_gif }
import { create_url } from './calls_api.js'

/***************************** Export variables  *****************************/

export { contanier, section_one, section_two, section_three, section_four }

/***************************** Variables  *****************************/

const tags = ['Movies', 'Anime', 'Reactions', 'Simpsons'];

let contanier = document.querySelector("div.contenedor");
let section_one = document.querySelector('#sectionone');
let section_two = document.querySelector('#sectiontwo');

let section_three = document.querySelector('#sectionthree');
section_three.style.display = 'none';

let section_four = document.querySelector('#sectionfour');
section_four.style.display = 'none';

let div_gifs1 = document.createElement('div');
let div_gifs2 = document.createElement('div');
let div_gifs3 = document.createElement('div');

/***************************** Function create titles  *****************************/

function titles_section(text, section) {

    let div_title = document.createElement('div');
    div_title.className = 'section-title';
    let title = document.createElement('h2')
    div_title.appendChild(title).textContent = text;
    let select_section;

    switch (section) {
        case 'one':
            select_section = section_one
            section_one.appendChild(div_title)
            break;
        case 'two':
            select_section = section_two
            section_two.appendChild(div_title)
            break;
        case 'three':
            select_section = section_three
            section_three.appendChild(div_title)
            break;
        case 'four':
            select_section = section_four
            section_four.appendChild(div_title)
            break;
    }
    return select_section
}

/***************************** Function create Section1  *****************************/

function section1_gif(section) {

    section.appendChild(div_gifs1).setAttribute('class', 'section1-gif');

    tags.forEach((elem) => {
        let block_gifs1 = document.createElement("div");
        let card_gif_title = document.createElement("div");
        let card_title = document.createElement("h3");
        let button_close = document.createElement("button");
        let card_button = document.createElement("button");
        let icon_close = document.createElement("img")
        let card_img = document.createElement("img");
        let url = create_url('random', 0, elem);
        let url_search = create_url('search', 20, elem);

        card_button.className = "viewmore";

        div_gifs1.appendChild(block_gifs1).setAttribute('class', 'card')
        block_gifs1.appendChild(card_gif_title).setAttribute('class', 'card-gif-title')
        block_gifs1.appendChild(card_button).textContent = 'Ver mas...'
        block_gifs1.appendChild(card_img)
        card_gif_title.appendChild(card_title).textContent = `#${elem}`
        card_gif_title.appendChild(button_close).setAttribute('class', 'close')
        button_close.appendChild(icon_close).setAttribute('src', 'images/button3.svg')

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                card_img.src = data.data.fixed_height_downsampled_url//`https://media.giphy.com/media/${data['data'].id}/giphy.gif`;
            })
            .catch((error) => {
                card_img.src = 'images/not_available.gif';
                console.log(JSON.stringify(error))

            });

        card_button.addEventListener('click', () => {

            let titles = document.querySelectorAll('#sectiontwo > div.section-title');
            if (titles.length > 0) {
                section_two.removeChild(titles[0]);
            }
            section2_gif(titles_section(elem, 'two'), url_search, 'home')

        })
    })
}


/***************************** Function create Section2  *****************************/

function section2_gif(section, url, options = 'none') {

    if (options == 'home') {
        section.appendChild(div_gifs2).setAttribute('class', 'section2-gif');
    }
    else {
        section.appendChild(div_gifs3).setAttribute('class', 'section2-gif');
    }

    fetch(url)

        .then(response => {
            return response.json()
        })
        .then((data) => {
            data.data.forEach((elem) => {
                let block_gifs3 = document.createElement("div");
                let elems = document.createElement("img");
                let tag_hover = document.createElement('p');
                block_gifs3.appendChild(elems);
                block_gifs3.appendChild(tag_hover).setAttribute('class', 'tags_hover');

                if (options == 'home') {
                    div_gifs2.appendChild(block_gifs3);
                }
                else {
                    div_gifs3.appendChild(block_gifs3);
                }
                let tags = (elem.title).toString().split(' ').join(' #');
                let class_div = "card-gif" + (data.data.indexOf(elem)).toString()

                block_gifs3.className = class_div;
                elems.src = elem.images.fixed_height_downsampled.url; //`https://media.giphy.com/media/${elem.id}/giphy.gif`;

                let width_img = (document.querySelector(`div.${class_div}`).offsetWidth).toString();

                elems.addEventListener("mouseover", (event) => {

                    if (width_img != 0) tag_hover.style.width = `${width_img}px`;
                    tag_hover.style.height = '36px';
                    tag_hover.textContent = `#${tags}`;

                    event.target.addEventListener("mouseout", () => {
                        tag_hover.textContent = '';
                        tag_hover.style.height = '0px';
                    })
                });
            })
        })
        .catch(() => {
            elems.src = 'images/not_available.gif';
        });
}