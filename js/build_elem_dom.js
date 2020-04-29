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
let section_four = document.querySelector('#sectionfour');

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

        card_button.className = "viewmore";

        div_gifs1.appendChild(block_gifs1).setAttribute('class', 'card')
        block_gifs1.appendChild(card_gif_title).setAttribute('class', 'card-gif-title')
        block_gifs1.appendChild(card_button).textContent = 'Ver mas...'
        block_gifs1.appendChild(card_img)
        card_gif_title.appendChild(card_title).textContent = `#${elem}`
        card_gif_title.appendChild(button_close).setAttribute('class', 'close')
        button_close.appendChild(icon_close).setAttribute('src', 'images/button3.svg')

        fetch(create_url('random', 0, elem))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                card_img.src = data.data.fixed_height_downsampled_url//`https://media.giphy.com/media/${data['data'].id}/giphy.gif`;
            })
            .catch(() => {
                card_img.src = 'images/not_available.gif';
                
            });
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

    let block_gifs3;
    let elems = document.createElement("img");
    fetch(url)

        .then(response => {
            return response.json()
        })
        .then((data) => {
            data.data.forEach((elem) => {

                block_gifs3 = document.createElement("div");
                elems = document.createElement("img");
                block_gifs3.appendChild(elems);
                if (options == 'home') {
                    div_gifs2.appendChild(block_gifs3);
                }
                else {
                    div_gifs3.appendChild(block_gifs3);
                }
                block_gifs3.className = ("card-gif" + (data.data.indexOf(elem)).toString());
                //console.log(elem.images.fixed_height_still.url)
                elems.src = elem.images.fixed_height_downsampled.url//`https://media.giphy.com/media/${elem.id}/giphy.gif`;
            })
        })
        .catch(() => {
            elems.src = 'images/not_available.gif';
        });
}