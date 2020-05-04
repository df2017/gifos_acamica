/***************************** Import functions  *****************************/

import {
    menu_create_gifos, open_camera, recordgif_start, recordgif_stop,
    upload_giphy, switch_card, create_menu_download, abortController
} from './menu.js'

/***************************** Variables primary *****************************/

let theme = localStorage.getItem('theme');
let section = document.getElementById('upload');
let section_menu = document.createElement('div');
section.appendChild(section_menu).setAttribute('class', 'menu_create');

let section_capture = document.createElement('div');
section.appendChild(section_capture).setAttribute('class', 'captured_gif');
section_capture.style.display = 'none';

let menu_download = document.createElement('div');
section.appendChild(menu_download).setAttribute('class', 'menu_download');
menu_download.style.display = 'none';

/***************************** Function Run *****************************/

function run_upload() {

    let menu = menu_create_gifos();
    return new Promise(function (resolve, reject) {
        if (!menu) {
            reject('Fallo al cargar la pagina')
            return
        }
        resolve(create_elements_div_record())
    })
}
run_upload()
    .then((data) => {
        if (data) {
            create_menu_download()

            let logo = document.querySelector('.item > img.logo');
            let t;

            if (theme == 'styles/theme_day.css') {
                t = 'styles/theme_day.css';
                logo.src = './images/gifOF_logo.png'
           
            } else {
                t = 'styles/theme_dark.css';
                logo.src = './images/gifOF_logo_dark.png'
            }

            localStorage.setItem('theme', t);
            document.getElementById("themes").href = t;

        }
    })
    .catch((error) => {
        console.log(`Error system: ${error}`);
    })


/***************************** Variables secondary *****************************/

let text_title = document.querySelector('div.captured_gif > div.card-gif-title > h3');
let button_cancel = document.querySelector('button.menu_cancel');
let button_begin = document.querySelector('button.menu_begin');
let btn_capture = document.querySelector('button.btn_capture_gif');
let btn_capture_img = document.getElementById('capture_img');
let btn_stop = document.querySelector('button.btn_stop_gif');
let button_repeat = document.querySelector('button.button_repeat');
let button_upload_gif = document.querySelector('button.button_upload');
let button_cancel_upload = document.querySelector('button.btn_progress_cancel');
let button_window_close = document.querySelector('div.card-gif-title > button > img');

/***************************** Event cancel back *****************************/

button_cancel.addEventListener('click', () => {
    location.href = 'index.html'
})

/***************************** Event close window *****************************/

button_window_close.addEventListener('click', () => {
    location.href = 'upload.html'
})

/***************************** Event open Camera *****************************/

button_begin.addEventListener('click', (e) => {
    menu_begin(switch_card)
    e.target.addEventListener('click', open_camera());
});

/***************************** Event Capture GIF *****************************/

btn_capture.addEventListener('click', (e) => {
    capture_gif(switch_card)
    e.target.addEventListener('click', recordgif_start());
});

/***************************** Event Stop GIF *****************************/

btn_stop.addEventListener('click', (e) => {
    stop_gif(switch_card)
    e.target.addEventListener('click', recordgif_stop());
});

/***************************** Event repeat GIF *****************************/

button_repeat.addEventListener('click', () => {
    repeat_gif(switch_card)
})

/***************************** Event upload GIF *****************************/

button_upload_gif.addEventListener('click', (e) => {
    upload_gif(switch_card)
    e.target.addEventListener('click', upload_giphy());
})

/************************** Events cancel upload GIF **************************/

button_cancel_upload.addEventListener('click', () => {
    cancel_upload_gif(switch_card)
    if (abortController) abortController.abort();
})

/********************************* Function Steps *********************************/

function create_elements_div_record() {

    let block_title_camera = document.createElement("div");
    section_capture.appendChild(block_title_camera).setAttribute('class', 'card-gif-title');

    let card_title = document.createElement("h3");
    block_title_camera.appendChild(card_title);

    let button_close = document.createElement("button");
    let icon_close = document.createElement("img");

    block_title_camera.appendChild(button_close).setAttribute('class', 'close');
    button_close.appendChild(icon_close).setAttribute('src', './images/button3.svg');

    /******************************************** View Camera ********************************************/

    let card_video_record = document.createElement('div');
    let block_image_camera = document.createElement("video");
    section_capture.appendChild(card_video_record).setAttribute('class', 'card_video_record');
    card_video_record.appendChild(block_image_camera).setAttribute('class', 'video_record');

    let block_button_camera = document.createElement("div");
    section_capture.appendChild(block_button_camera).setAttribute('class', 'card_button_capture');

    let button_capture_img = document.createElement("button");
    block_button_camera.appendChild(button_capture_img).setAttribute('class', 'btn_capture_img');

    let card_img = document.createElement("img");
    card_img.src = './images/camera.svg';
    button_capture_img.appendChild(card_img).setAttribute('id', 'capture_img');

    let button_capture = document.createElement("button");
    button_capture.className = "btn_capture_gif";
    block_button_camera.appendChild(button_capture).textContent = 'Capturar';

    /****************************************** View Record GIF ******************************************/

    let block_button_recording = document.createElement("div");
    section_capture.appendChild(block_button_recording).setAttribute('class', 'card_button_stop');
    block_button_recording.style.display = 'none';

    let button_recording_img = document.createElement("button");
    block_button_recording.appendChild(button_recording_img).setAttribute('class', 'btn_recording_img');

    let card_img_recording = document.createElement("img");
    card_img_recording.src = './images/recording.svg';
    button_recording_img.appendChild(card_img_recording).setAttribute('id', 'recording_img');

    let button_record = document.createElement("button");
    button_record.className = "btn_stop_gif";
    block_button_recording.appendChild(button_record).textContent = 'Listo';

    /****************************************** View Repeat GIF ******************************************/

    let card_img_record = document.createElement('div');
    section_capture.appendChild(card_img_record).setAttribute('class', 'card_img_record')
    card_img_record.style.display = 'none'

    let capture = document.createElement('img');
    card_img_record.appendChild(capture).setAttribute('class', 'img_record');

    let block_button_upload = document.createElement("div");
    section_capture.appendChild(block_button_upload).setAttribute('class', 'card_button_upload');
    block_button_upload.style.display = 'none';

    let button_repeat = document.createElement("button");
    block_button_upload.appendChild(button_repeat).setAttribute('class', 'button_repeat');
    button_repeat.textContent = 'Repetir Captura';

    let button_upload = document.createElement("button");
    block_button_upload.appendChild(button_upload).setAttribute('class', 'button_upload');
    button_upload.textContent = 'Subir Guifo';

    /****************************************** View Progress bar ******************************************/

    let block_progress_bar = document.createElement("div");
    section_capture.appendChild(block_progress_bar).setAttribute('class', 'card_progress_bar');
    block_progress_bar.style.display = 'none';

    let img_world = document.createElement("img");
    block_progress_bar.appendChild(img_world).setAttribute('class', 'img_world');
    img_world.src = './images/globe_img.png';

    let text_wait_upload = document.createElement("h2");
    block_progress_bar.appendChild(text_wait_upload).setAttribute('class', 'text_wait_upload');
    text_wait_upload.textContent = 'Estamos subiendo tu guifo…';

    let progress_bar = document.createElement('div');
    block_progress_bar.appendChild(progress_bar).setAttribute('id', 'progress_bar');

    for (let i = 0; i < 23; i++) {
        let block_progress = document.createElement('div');
        progress_bar.appendChild(block_progress).setAttribute('class', `progress_block${i}`)
    }

    let block_button_cancel = document.createElement("div");
    section_capture.appendChild(block_button_cancel).setAttribute('class', 'card_button_cancel');
    block_button_cancel.style.display = 'none';

    let button_progress_cancel = document.createElement("button");
    block_button_cancel.appendChild(button_progress_cancel).setAttribute('class', 'btn_progress_cancel');
    button_progress_cancel.textContent = 'Cancelar';

    return true
}

/***************************** Functions Events *****************************/

function menu_begin(callback) {

    if (theme == 'styles/theme_dark.css') {
        btn_capture_img.src = './images/camera_light.svg'
    } 
    let section = ['none', 'flex', 'none'];
    let tags = ['flex', 'none', 'none', 'none', 'flex', 'none', 'none'];
    text_title.textContent = 'Un Chequeo Antes de Empezar';

    callback(section, tags);
}

function capture_gif(callback) {
    let section = ['none', 'flex', 'none'];
    let tags = ['none', 'flex', 'none', 'none', 'flex', 'none', 'none'];
    text_title.textContent = 'Capturando Tu Guifo';

    callback(section, tags);
}

function stop_gif(callback) {

    let section = ['none', 'flex', 'none'];
    let tags = ['none', 'none', 'flex', 'none', 'none', 'flex', 'none'];
    text_title.textContent = 'Vista Previa';

    callback(section, tags);
}

function repeat_gif(callback) {
    
    let section = ['none', 'flex', 'none'];
    let tags = ['flex', 'none', 'none', 'none', 'flex', 'none', 'none'];
    text_title.textContent = 'Un Chequeo Antes de Empezar';

    callback(section, tags);
}

function upload_gif(callback) {
    let section = ['none', 'flex', 'none']
    let tags = ['none', 'none', 'none', 'flex', 'none', 'none', 'flex']
    text_title.textContent = 'Subiendo Guifo';

    callback(section, tags);
}

function cancel_upload_gif(callback) {
    let section = ['none', 'flex', 'none']
    let tags = ['none', 'none', 'flex', 'none', 'none', 'flex', 'none']

    callback(section, tags);
}