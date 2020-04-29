/***************************** Import functions  *****************************/

import { titles_section, section2_gif } from './build_elem_dom.js'
import { create_url } from './calls_api.js'

/***************************** Import variables  *****************************/

import { section_one, section_two, section_three, section_four } from './build_elem_dom.js'

/************************************ Selectors Themes ************************************/

const theme_content = document.getElementById('themes_content');

function selection_themes(theme) {
  let t;
  if (theme == 'day') {
    t = 'styles/theme_day.css';
  }
  else { t = 'styles/theme_dark.css'; }

  localStorage.setItem('theme', t);
  document.getElementById("themes").href = t;
  theme_content.style.display = 'none';
}

let button_theme = document.querySelector('button.btn-nav-image');

button_theme.addEventListener('click', () => {
  theme_content.style.display = 'flex';
});

document.querySelector('button.btn-submenu-day').addEventListener('click', () => { selection_themes('day') });
document.querySelector('button.btn-submenu-dark').addEventListener('click', () => { selection_themes('dark') });

/**************************** Functions button next and back ****************************/

section_three.style.display = 'none';
titles_section('Mis guifos', 'three');

function section_mygif() {

  document.getElementById('mygif').style.pointerEvents = "none";
  document.querySelector('a.back').style.display = 'inline-block';
  section_one.style.display = 'none';
  section_two.style.display = 'none';
  section_four.style.display = 'none';
  section_three.style.display = 'block';
}
document.querySelector('#mygif').addEventListener("click", () => { section_mygif() });

function back_section() {
  document.getElementById('mygif').style.pointerEvents = "auto";
  document.querySelector('div.nav-item').style.display = '';
  document.querySelector('a.back').style.display = 'none';
  section_one.style.display = 'block';
  section_two.style.display = 'block';
  section_three.style.display = 'none';
  section_four.style.display = 'none';
}
document.querySelector('a.back').addEventListener("click", () => { back_section() });

/***************************** Call button Create GIF *****************************/

document.querySelector('button.btn-nav-create').onclick = () => {
  location.href = 'upload.html'
};

/***************************** Function button Search  *****************************/

let text_search = document.getElementById('search_input');
let button_search = document.querySelector('button.search-item3');

section_four.style.display = 'none';
titles_section(text_search.value, 'four');

button_search.addEventListener('click', (e) => {

  document.querySelector('a.back').style.display = 'inline-block';

  let title_old = document.querySelector('#sectionfour > div.section-title');
  section_four.removeChild(title_old);

  let urls = create_url('search', 14, text_search.value);
  section_one.style.display = 'none';
  section_two.style.display = 'none';
  section_three.style.display = 'none';
  section_four.style.display = 'block';

  section2_gif(titles_section(text_search.value, 'four'), urls);

  e.target.addEventListener('click', () => { text_search.value = "" })

});

/***************************** Function Autocomplete  *****************************/

let nav_search = document.querySelector('div.navsearch');
let div_word = document.createElement('div');
nav_search.appendChild(div_word).setAttribute('class', 'card_word_autocomplete');

text_search.addEventListener('input', (e) => {

  if (e.target.value == '') {
    button_search.style.backgroundColor = '#E6E6E6';
  }
  else { button_search.style.backgroundColor = '#F7C9F3'; }

  let url = create_url('autocomplete', 0, (e.target.value).toString());

  fetch(url, {
    headers: {'Content-Type': 'application/json'},
    method: "get"
  })
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
