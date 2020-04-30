/***************************** Export functions  *****************************/

export {
    menu_create_gifos, open_camera, recordgif_start,
    recordgif_stop, upload_giphy, switch_card, create_menu_download, abortController
}

/***************************** Import functions  *****************************/

import { create_url, api_key } from './calls_api.js'

/***************************** Constants *****************************/

const gif_name = 'gif_' + (Math.random().toString(36).slice(2));
const url = create_url();

const post_body = new FormData();
post_body.append('api_key', api_key);
post_body.append('username', 'dfgif');

const stream = () => {
    return navigator.mediaDevices.getUserMedia({ video:'http://192.168.0.20:4747/'})
};

/***************************** Variables *****************************/

let abortController;
let video;
let recorder;
let url_gif;
let copy_url_gif;
let text_menu = [
    'Crear tu guifo es muy fácil, graba cualquier imagen con tu cámara y obtén guifos personalizados. Los pasos para crear tu guifo son:',
    '1) Dar permisos de acceso a la cámara (sólo por el tiempo de uso)',
    '2) Capturar tu momento guifo',
    '3) Revisar el momento',
    '4) Listo para subir y compartir!',
    '¿Quieres comenzar a crear tu guifo ahora?'
]

/***************************** Function Window Menu Create GIF *****************************/

function menu_create_gifos() {

    let container_menu = document.querySelector('#upload > div.menu_create');
    let container_download = document.querySelector('#upload > div.menu_download');

    let cardtitle = document.createElement("h3");
    container_menu.appendChild(cardtitle).setAttribute('class', 'card-gif-title');

    let card_logo_text = document.createElement("div");
    container_menu.appendChild(card_logo_text).setAttribute('class', 'card_logo_text');

    let logo = document.createElement("img");
    card_logo_text.appendChild(logo).setAttribute('src', 'images/window_img.png')

    let text_logo = document.createElement("h3");
    card_logo_text.appendChild(text_logo).textContent = 'Aquí podrás crear tus propios guifos';

    let card_paragraph = document.createElement("div");
    container_menu.appendChild(card_paragraph).setAttribute('class', 'card_paragraph');

    text_menu.forEach((param) => {
        let paragraph = document.createElement('p');
        card_paragraph.appendChild(paragraph).textContent = param;
    })

    let button_menu_cancel = document.createElement('button');
    let button_menu_begin = document.createElement('button');
    button_menu_cancel.className = "menu_cancel";
    button_menu_begin.className = "menu_begin";

    let card_button_menu = document.createElement("div");
    container_menu.appendChild(card_button_menu).setAttribute('class', 'card_button_menu');

    card_button_menu.appendChild(button_menu_cancel).textContent = 'Cancel';
    card_button_menu.appendChild(button_menu_begin).textContent = 'Comenzar';

    let block_title_download = document.createElement("div");
    container_download.appendChild(block_title_download).setAttribute('class', 'card-gif-title');

    let card_title = document.createElement("h3");
    block_title_download.appendChild(card_title);

    return true
}

/***************************** Function Window Download GIF *****************************/

function create_menu_download() {

    let hidden_record = document.querySelector('#upload > div.captured_gif');
    hidden_record.style.display = 'none';

    let container_download = document.querySelector('#upload > div.menu_download');

    let text_title = document.querySelector('div.menu_download > div.card-gif-title > h3');
    text_title.textContent = 'Guifo Subido Con Éxito';

    let card_img_button = document.createElement("div");
    container_download.appendChild(card_img_button).setAttribute('class', 'card_img_button');

    let gif_upload = document.createElement("img");
    card_img_button.appendChild(gif_upload).setAttribute('class', 'gif_upload');

    let card_download_copy = document.createElement("div");
    card_img_button.appendChild(card_download_copy).setAttribute('class', 'card_download_copy');

    let card_title = document.createElement("h3");
    card_download_copy.appendChild(card_title).textContent = 'Guifo creado con éxito';

    let button_download = document.createElement('a');
    let button_copy = document.createElement('button');
    button_download.className = "btn_download_gif";
    button_download.type = 'button';
    button_copy.className = "btn_copy_gif";

    card_download_copy.appendChild(button_copy).textContent = 'Copiar Enlace Guifo';
    card_download_copy.appendChild(button_download).textContent = 'Descargar Guifo';

    let button_ok = document.createElement('button');
    button_ok.className = "button_ok";
    card_img_button.appendChild(button_ok).textContent = 'Listo';

    document.querySelector('button.button_ok').addEventListener('click', () => {
        location.href = 'upload.html'
    })

    button_copy.addEventListener('click', (e) => {
        e.preventDefault();
        let textarea = document.createElement("textarea");
        textarea.textContent = copy_url_gif;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy"); 
        document.body.removeChild(textarea);
    });
}

/***************************** Activated Camera *****************************/

function open_camera() {
    video = document.querySelector('video.video_record');
    stream().then((stream) => {
        video.srcObject = stream;
        video.play();
    })
}

/***************************** Start Record *****************************/

function recordgif_start() {
    post_body.delete('file');
    video.play();

    stream().then((mediaStream) => {
        recorder = RecordRTC(mediaStream, {
            type: 'gif',
            frameRate: 1,
            quality: 100,
            width: 360,
            height: 240,
            hidden: 100
        })
        recorder.startRecording();
        recorder.stream = mediaStream;
    })
}

/***************************** Stop record  *****************************/

function recordgif_stop() {

    let capture_img_stop = document.querySelector('img.img_record');
    let btn_download = document.querySelector('a.btn_download_gif');

    recorder.stopRecording(() => {
        post_body.append('file', recorder.getBlob(), 'migif.gif')
    });
    recorder.stream.stop();
    url_gif = URL.createObjectURL(post_body.get('file'));
    capture_img_stop.src = url_gif;
    btn_download.addEventListener('click', () => {
        btn_download.href = url_gif;
        btn_download.download = 'gif_subido.gif';
    })
}

/***************************** Upload GIF a GHIPY.com *****************************/

function upload_giphy() {

    abortController = new AbortController()
    let signal = abortController.signal;

    let progress = (elem, color) => {
        let element = document.querySelector(`div.progress_block${elem}`);
        element.style.backgroundColor = color;
    }

    for (let i = 0; i < 23; i++) {
        progress(i, '#999999');
    }

    let width = 0;
    let identity = setInterval(progressbar, 270);
    let section = ['none', 'none', 'flex'];
    let tags = ['none', 'none', 'none', 'none', 'none', 'none', 'none'];
    let gif_upload = document.querySelector('.card_img_button > img.gif_upload');

    function progressbar() {
        if (width >= 22) {
            clearInterval(identity);
            return
        }
        progress(width, '#F7C9F3')
        width++;
    }

    fetch(url, {
        method: "post",
        body: post_body,
        signal: signal
    })
        .then(response => { return response.json() })
        .then((data) => {
            if (data['meta'].status == 200 || width >= 100) {
                progress(22, '#F7C9F3');
                clearInterval(identity);
                localStorage.setItem(gif_name, data['data'].id);
                switch_card(section, tags)
                gif_upload.src = URL.createObjectURL(post_body.get('file'));
                copy_url_gif = `https://media.giphy.com/media/${data['data'].id}/giphy.gif`
            }
        })
        .catch((error) => {
            clearInterval(identity);
            alert(error);
        });
}

/************************** Function change modules **************************/

function switch_card(section, tag) {

    document.querySelector('div.menu_create').style.display = section[0];
    document.querySelector('div.captured_gif').style.display = section[1];
    document.querySelector('div.menu_download').style.display = section[2];

    document.querySelector('div.card_button_capture').style.display = tag[0];
    document.querySelector('div.card_button_stop').style.display = tag[1];
    document.querySelector('div.card_button_upload').style.display = tag[2];
    document.querySelector('div.card_button_cancel').style.display = tag[3];
    document.querySelector('div.card_video_record').style.display = tag[4];
    document.querySelector('div.card_img_record').style.display = tag[5];
    document.querySelector('div.card_progress_bar').style.display = tag[6];
}