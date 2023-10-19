console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');  //play pause wala button
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem')); 

//we make an array that contain the songs.
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Shape of you X Man mera [Mashup]", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Humnava-Revise Version", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tu Jo Kahe-Slowed &Unplugged", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Khoobsurat hai tu itna-Bilal Amir", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Mann Mera -DJ Chetas", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

/*DOM - iski help se me HTML me change kr rha hu...meine avi tak sb songs k name and image same e rhki hai but now ab me dynamically har song ka apni cover pic and name de paungaa..see difference by commenting it out. 
this code snippet makes sure that each song item in your interface shows the correct cover image and song name based on the data provided in your songs array. It dynamically updates the content of your Spotify clone's user interface for each song. */

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
}) 
 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        // Update individual song item play icons to pause
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
            if (index === songIndex) {
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
            }
        });
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        // Update individual song item play icons to play
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
            if (index === songIndex) {
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
            }
        });
    }
});


// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{   //or timeupdate ho rha ho tohh
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);  //progression bar hai woh change hoti jaye..percentage nikali hai 
    myProgressBar.value = progress;  //or progress barko waha tak bhardo jitni progress hui hai song ki..
})
  
//jaise upar audio time duration change hui toh progress bar change hua usi tarah agar progress bar change hota hai toh audio bhi toh aage piche hogi ...
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})       //progress bar m value percent m toh usko wapis time duration convert kiyaa..



/*function bnaya ,songs  ki list me agar kisi bhi song k side wale button me play krte hai toh current song ka pause ho jaye(it means ab uska icon play bn jayega) thats why we remove pause icon and add play item.  */
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle'); //current pause ho gya isliye pause icon remove
        element.classList.add('fa-play-circle');//and uski jagah play wala icon aagya kyuki pause hua
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        // Check if the clicked song is the currently playing song
        if (index === songIndex && !audioElement.paused) {
            // If it's the same song and it's playing, pause it
            audioElement.pause();
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0; // Hide the GIF when the song is paused
        } else {
            // If it's a different song or the same song but paused, play it
            makeAllPlays();
            songIndex = index;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1; // Show the GIF when the song is playing
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});




document.getElementById('next').addEventListener('click', () => {
    // When the 'Next' button is clicked, do the following:

    // 1. If the current song index is 9 or more, reset it to 0 (loop back to the first song), 
    //    otherwise, move to the next song index.
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    // 2. Change the audio source to the next song.
    audioElement.src = `songs/${songIndex + 1}.mp3`;

    // 3. Update the displayed song name to the new song.
    masterSongName.innerText = songs[songIndex].songName;

    // 4. Reset the playback time to the beginning of the new song.
    audioElement.currentTime = 0;

    // 5. Play the new song.
    audioElement.play();

    // 6. Change the 'Play/Pause' button appearance to 'Pause' when a new song starts. par abi comment out kiya hai kyuki song change hote e wapis pause ka icon e ayega..
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');  
});

//same for previous jo next k liye kiya..
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){  //0 ya 0 se kam toh reset to 0 kro.
        songIndex = 0
    }
    else{
        songIndex -= 1; //decrement 
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; //don't get to confuse +1 kyu likha kyuki ar
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}) 
