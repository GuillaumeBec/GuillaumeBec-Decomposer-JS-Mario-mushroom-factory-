const audio = new Audio('./assets/A Secret Course - Super Mario Sunshine.mp3');

let multimedia = {


    init: function () {
        multimedia.sound();
    },
    sound: function () {

        const playButton = document.querySelector(".playButton");
        console.log(playButton);
        const pauseButton = document.querySelector(".pauseButton");
        console.log(pauseButton);
        playButton.addEventListener("click", multimedia.play);
        pauseButton.addEventListener("click", multimedia.pause);
    },

    play: function () {
        audio.play();
        console.log(audio);
    },

    pause: function () {
        audio.pause;
        console.log(audio);
    }
}