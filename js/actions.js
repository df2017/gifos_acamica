/***************************** Import functions  *****************************/

import { titles_section, section2_gif } from './build_elem_dom.js'
import { create_url } from './calls_api.js'

/***************************** Import variables  *****************************/

import { section_one, section_two, section_three, section_four } from './build_elem_dom.js'

/******************************** Variables ********************************/

let button_theme = document.querySelector('button.btn-nav-image');
let button_theme_day = document.querySelector('button.btn-submenu-day');
let button_theme_dark = document.querySelector('button.btn-submenu-dark')
let button_migif = document.querySelector('#mygif');
let button_back = document.querySelector('a.back');
let button_create_gif = document.querySelector('button.btn-nav-create');
let text_search = document.getElementById('search_input');
let button_search = document.querySelector('button.search-item3');
let nav_search = document.querySelector('div.navsearch');
let div_word = document.createElement('div');

/******************************* Constants  *******************************/

const theme_content = document.getElementById('themes_content');

/***************************** Event change themes *****************************/

button_theme.addEventListener('click', () => {
  theme_content.style.display = 'flex';
});

button_theme_day.addEventListener('click', () => { selection_themes('day') });
button_theme_dark.addEventListener('click', () => { selection_themes('dark') });

/***************************** Event Section My Gif *****************************/

button_migif.addEventListener("click", () => {
  section_mygif(titles_section)
});

/***************************** Event Back Section *****************************/

button_back.addEventListener("click", back_section);

/***************************** Event Create Gif *****************************/

button_create_gif.addEventListener("click", () => { location.href = 'upload.html' });

/***************************** Event Search Gif  *****************************/

button_search.addEventListener('click', () => {
  search_gif()
  button_back.style.display = 'inline-block';
  text_search.value = "";
  button_search.style.backgroundColor = '#E6E6E6';

});

/******************************** Function Selectors Themes ********************************/

function selection_themes(theme) {

  let logo = document.querySelector('#item > img.logo');
  let t;
  if (theme == 'day') {
    t = 'styles/theme_day.css';
    logo.src = './images/gifOF_logo.png'
  }
  else {
    t = 'styles/theme_dark.css';
    logo.src = './images/gifOF_logo_dark.png'
  }

  localStorage.setItem('theme', t);
  document.getElementById("themes").href = t;
  theme_content.style.display = 'none';
}

/**************************** Functions Section My Gif ****************************/

function section_mygif(callback) {

  callback('Mis guifos', 'three');
  let create_div = document.createElement('div');
  section_three.appendChild(create_div).setAttribute('class', 'section-mygif')

  Object.keys(localStorage).forEach((key, index) => {
    if (key != 'theme') {
      let create_img = document.createElement('img');
      create_div.appendChild(create_img).setAttribute('class', 'img_save');
      create_img.src = `https://media.giphy.com/media/${localStorage.getItem(key)}/giphy.gif`;
    }

  })
  button_back.addEventListener("click", () => {
    back_section('mygif')
  });

  button_migif.style.pointerEvents = "none";
  button_back.style.display = 'inline-block';
  section_one.style.display = 'none';
  section_two.style.display = 'none';
  section_four.style.display = 'none';
  section_three.style.display = 'block';
}

/**************************** Functions Back Section ****************************/

function back_section(option = 'none') {

  if (option == 'mygif') {
    let title_remove = document.querySelector('#sectionthree > div.section-title');
    let gif_remove = document.querySelector('#sectionthree > div.section-mygif');
    section_three.removeChild(title_remove);
    section_three.removeChild(gif_remove);
  }

  button_migif.style.pointerEvents = "auto";
  document.querySelector('div.nav-item').style.display = '';
  button_back.style.display = 'none';
  section_one.style.display = 'block';
  section_two.style.display = 'block';
  section_three.style.display = 'none';
  section_four.style.display = 'none';

}

/***************************** Function button Search  *****************************/

function search_gif() {

  let urls = create_url('search', 14, text_search.value);
  section2_gif(titles_section(text_search.value, 'four'), urls);

  let titles = document.querySelectorAll('#sectionfour > div.section-title');

  if (titles.length > 1) {
    section_four.removeChild(titles[0]);
  }

  section_one.style.display = 'none';
  section_two.style.display = 'none';
  section_three.style.display = 'none';
  section_four.style.display = 'block';

}

/***************************** Event and Function Autocomplete  *****************************/

nav_search.appendChild(div_word).setAttribute('class', 'card_word_autocomplete');
text_search.addEventListener('input', (e) => {

  if (e.target.value == '') {
    button_search.style.backgroundColor = '#E6E6E6';
  }
  else { button_search.style.backgroundColor = '#F7C9F3'; }

  let url = create_url('autocomplete', 0, (e.target.value).toString());

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let word = nav_search.querySelectorAll('.card_word_autocomplete > .btn_complete_word');
      if (word.length == 5) {
        word.forEach((elem) => {
          div_word.removeChild(elem)
        })
      }
      let words = [];
      words.push(data.data);
      words[0].forEach((word) => {
        div_word.style.display = 'flex';
        let button_complete = document.createElement('button');
        button_complete.textContent = word.name;
        div_word.appendChild(button_complete).setAttribute('class', 'btn_complete_word');

        button_complete.addEventListener('click', (event) => {
          text_search.value = event.target.textContent;
          div_word.style.display = 'none';
        })
        words.shift();
      })
    })
})