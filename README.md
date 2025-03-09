# Spotify Clone 

## Project Description
  This is spotify clone web page created using HTML CSS and Javascript where you can create albums, can do certain actions like play/pause, next/previous song, increase/decrease/mute volume.
  Also there is a side bar for selecting songs of each album which is not in the official spotify app or web page. The project is mainly taken from [This video](https://youtu.be/CYwEq1GdU4E?si=V9e_LOC1XjhuFjKi),
  but here my novelty is that I created an eventlistener for automatic play of music when 1 music ends which was not present in the above mentioned video. For a new album create a new folder in songs and create a json file which has a format of title and a description just like pre-existing albums and store desired songs in mp3 format along with a cover image of **jpg** format and of the name **cover**.
  This project is exactly not a clone of Spotify rather an mp3 player which has the UI of Spotify.
  **When using the project create a localhost of your own and paste its address in fetch()**. 

## How the Project works
  The project has 5 functions which are: 
1.	secondsToMinutesSeconds () 
    - This function takes variable seconds as parameters and then it checks it if it’s a number or else convert to the 00:00 format.
    -	Variable minutes and remainingSeconds is converted to largest round number of seconds/60 and seconds % 60.
    - variables formattedMinutes and formattedSeconds are converted to string of size 2 and if less then it starts with 0.
    -	The function returns formattedMinutes:formattedSeconds.

2.	getSongs () 
     - It is an asynchronous function declared to fetch the songs using **fetch()** and an array songs [] is declared. 
     - The songs are traversed as array and is checked if it ends with .mp3 then the text is split as before folder and after folder and taking only the song name and is pushed to the array songs [].
     - The first element of songList is selected as songUL and then for each song of songs array, the details are listed on the songList by **.innerHTML** DOM property. 
     - The HTML collections of songUL is represented as arrays by **Arrays.from()** and for a li element a click addeventlistener is added and the song which got clicked will play using playMusic () by displaying its song name.

3.	playMusic ()
     - It is an arrow function which has 2 parameters track and pause (false by default).
     - The global variable currSong.src is global variable /currFolder/ + track and if the song is not pause then song is played and the icon is pause.
     -The document element of songinfo is decoded track and document element of songtime is 00:00/00:00.

4.	displayAlbums ()
     - The songs are again fetched from the directory by **fetch()** and the response is stored as <a> and a div is created for the <a>.
     - Variables for <a> and cardContainer are declared and then anchors(<a>) is represented as array using **Arrays.from()**.
     - A for loop is declared to traverse through the anchors and a variable e is initialized for an index and if e.href contains songs folder then a variable folder is initialized by splitting e.href by “/” and 2nd last element is sliced using **slice()**.
     - A json file is created for each album and contains title and description and it is fetched using **fetch()**.
     - The cardContainer innerHTML is updated as the details of the folder containing the album which includes the name, artist, cover photo, response title and response description (title and description in json file).
     - The card is represented as array by **Arrays.from()** and for each card has a click eventlistener in which when clicked the first song from **currenttarget.dataset.folder** will play.

5.	Main () 
     - Call getSongs (), playMusic () and displayAlbums ().
     - Add a click eventlistner to play and if current song is paused then let current song play and change the play.src as pause and else vice versa.
     - Add eventlistener of type **timeupdate** to current song and make songtime div in the form of current time /duration of current song using **.innerHTML** property and also update the circle style towards left by (current time / duration) *100 + % of the current song.
     - For the seekbar div add a click event listener and declare a variable percent which is the the **offsetX** /width of the target element (got by **getBoundingClientRect().width**) * 100 and move the circle by styling left in the seekbar and the current time of song is (duration * percent) / 100.
     - Add a click event listener for next and previous in which declare a variable index which is the index of song in songs which is sliced from songs array. If index + 1 > songs.length then play the next song index + 1 using playMusic(). For previous if index – 1 >= 0 then play the previous song index – 1 using playMusic().
     - The range div is selected and a event listener of type **change** is initialized in which the volume of the current song is target value of input tag converted to int (parseInt) / 100 (volume property ranges between 0 and 1.
     - Select the image of the parent volume div and then add click event listener and if target.src includes volume.svg then replace it with mute.svg and change current song volume and value in range to 0. Else replace the target.src with volume.svg and change current song volume to 10 and range value to 0.10.
     - Add an evenlistener of type **ended** in which when the index of next song still is less than length of songs array then play the next song, if the last song of the album is getting played then next play 1st song of the album.

## Credits
  I only want to thank [CodeWithHarry](https://github.com/CodeWithHarry) for giving me insight and knowledge on Javascript, and this project increased my practical knowledge on js also [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript) was a reference for me. Looking forward on making more projects.
