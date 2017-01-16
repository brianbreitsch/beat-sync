
class AudioPlayer {
    constructor(){
        this.audioContext = this._getAudioContext()
        this.destination = this.audioContext.destination
        this.songBuffer = null
        this.source = null
    }

    play(epochMs) {
        // BufferSource is single use only
        this.source = this.audioContext.createBufferSource()
        this.source.connect(this.destination)
        this.source.buffer = this.songBuffer
        // offset
        let offsetSec = Math.max((Date.now() - epochMs) / 1000, 0)
        let when = this.audioContext.currentTime + ((epochMs - Date.now()) / 1000)
        this.source.start(when, offsetSec)
    }

    stop() {
        this.source.stop()
        this.source.disconnect(this.destination)
    }

    loadSongAsync(url) {
        return _getAudioBufferAsync(url)
            .then((buffer) => {
                return _decodeAudioBufferAsync(this.audioContext, buffer)
            })
            .then((songBuffer) => {
                this.songBuffer = songBuffer
            })
    }

    _getAudioContext() {
        try {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            return new AudioContext();
        }
        catch(e) {
            reject('Web Audio API is not supported in this browser')
        }
    }

    
}

function _getAudioBufferAsync(url) {
    let request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    
    let promise = new Promise((resolve, reject) => {
        request.onload = () => { resolve(request.response) }
        request.onerror = () => { reject('failed to load audio') }
    })

    request.send()
    return promise
}

function _decodeAudioBufferAsync(audioContext, audioBuffer) {
    return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(audioBuffer, resolve, reject)
    })
}

let exampleUrl = "https://raw.githubusercontent.com/zhuker/lamejs/master/testdata/Stereo44100.wav"

window.onload = () => {
    let audioPlayer = new AudioPlayer()
    audioPlayer.loadSongAsync(exampleUrl)
        .catch( (e) => { console.log(e) })

    var offsetSec = 1;
    document.getElementById('offset')
            .addEventListener('change', () => {
               offsetSec = parseFloat(document.getElementById('offset').value)
            })

    document.getElementById('play')
            .addEventListener('click', () => { 
                audioPlayer.play(Date.now() - offsetSec * 1000) 
            })
    document.getElementById('stop')
            .addEventListener('click', () => { audioPlayer.stop() })
}