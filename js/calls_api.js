export { create_url, api_key }

/***************************** Constants  *****************************/

const api_key = 'LLtSqB4p3mRkveVdjEvFAOMYulmcng0h';

/***************************** function create url api  *****************************/

function create_url(action = 'none', limit = 0, tag = 'none') {
    let url;
    switch (action) {
        case 'search':
            url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${tag}&limit=${limit}&offset=0&rating=G&lang=en`;
            break;
        case 'random':
            url = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${tag}&rating=G`;
            break;
        case 'trending':
            url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}&rating=G`;
            break;
        case 'autocomplete':
            url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${tag}`;
            break;
        default:
            url = 'https://upload.giphy.com/v1/gifs'
            break;
    }
    return url;
}
