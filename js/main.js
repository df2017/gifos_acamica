/***************************** Import functions  *****************************/

import { titles_section, section1_gif, section2_gif } from './build_elem_dom.js';
import { create_url } from './calls_api.js'

/***************************** Variables *****************************/

window.onload = localStorage.setItem('theme', 'styles/theme_day.css');

let titles = ['Hoy te sugerimos:', 'Tendencias:'];
let run = theme_default();

/************************** Load theme **************************/

function theme_default() {

    let theme = localStorage.getItem('theme');
    if (theme != null) {
        document.getElementById("themes").href = theme;
        return true;
    }
    return false
}

/***************************** Function Run Sections  *****************************/

function run_project() {
    return new Promise(function (resolve, reject) {
        if (!run) {
            reject('Fallo al cargar la pagina')
            return
        }
        resolve(titles_section(titles[0], 'one'))
    })
}
run_project()
    .then((section) => {
        section1_gif(section);
        return titles_section(titles[1], 'two')
    })
    .then((section) => {
        section2_gif(section, create_url('trending', 20), 'home');
    })
    .catch((error) => {
        console.log(`Error system: ${error}`);
    })

/************************************* End  *************************************/
