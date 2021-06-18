const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeText = document.getElementById('h2');

// VoiceRSS SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

// Disable button after speech starts
function toggleButton() {
    button.disabled = !button.disabled;
}; 

// Display Joke
function toggleShowText() {
    document.getElementById('h2').hidden = !document.getElementById('h2').hidden;
}

// Make Audio of the Joke
function tellMe(joke) {
    VoiceRSS.speech({
        key: '85894624799e4dc6af246d311e4e3cd0',
        src: joke,
        hl: 'en-in',
        v: 'Ajit',
        r:  2, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });

}

// Fetch Joke from Server
async function getJoke() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist';

    try {
        let joke = ``;
        const reponse = await fetch(apiUrl);
        const data = await reponse.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        console.log(joke.length);
        tellMe(joke);

        
        // Disable button
        toggleButton();

        // Show Joke
        jokeText.textContent = joke;
        if (joke.length > 0 && joke.length <= 50) {
            jokeText.style.height = `${18}vh`;
        } else if (joke.length > 50 && joke.length <= 80) {
            jokeText.style.height = `${30}vh`;
        } else if (joke.length > 80 && joke.length <= 120) {
            jokeText.style.height = `${35}vh`;
        } else if(joke.length > 120 && joke.length <= 165) {
            jokeText.style.height = `${50}vh`;
        } else if (joke.length > 165 && joke.length <= 190) {
            jokeText.style.height = `${55}vh`;
        }
        toggleShowText();
    } catch (e) {
    console.log(`ABE ${e}`);
    };
};


button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
audioElement.addEventListener('ended', toggleShowText);

