import { Component, OnInit } from "@angular/core";

@Component({
  selector: "aa-music-player",
  templateUrl: "./music-player.component.html",
  styleUrls: ["./music-player.component.scss"],
})
export class MusicPlayerComponent implements OnInit {
  // development purpose, normally would be hidden by default
  isHidden: boolean = false;
  songTitle: string;
  fillbar: any;
  imageSrc: string;
  playBtn: string;
  song = new Audio();
  currentTime: any;
  duration: any;
  currentSong = 0;
  songs: any[] = [
    {
      name: "../../../assets/songs/Freedom.mp3",
      cover: "../../../assets/img/Freedom.jpg",
    },
    {
      name: "../../../assets/songs/I'll Wait.mp3",
      cover: "../../../assets/img/I'llWait.jpg",
    },
    {
      name: "../../../assets/songs/Like It Is.mp3",
      cover: "../../../assets/img/LikeItIs.jpg",
    },
  ];
  constructor() {}

  ngOnInit() {
    this.playBtn = "../../../assets/icons/play.svg";

    // make the progress bar move when the time of the song increases
    this.song.addEventListener("timeupdate", () => {
      let position = this.song.currentTime / this.song.duration;
      this.fillbar = position * 100;
      this.currentTime = this.formatTime(this.song.currentTime);
      this.duration = this.formatTime(this.song.duration);
      this.checkNext();
    });
  }

  // play the song and handle cover and title replacement
  playSong() {
    this.song.src = this.songs[this.currentSong].name;
    this.songTitle = this.songs[this.currentSong].name.replace(/\.[^/.]+$/, "");
    this.songTitle = this.songTitle.substring(
      this.songTitle.lastIndexOf("/") + 1
    );
    this.song.play();
  }

  // change the icon play/pause and play or pause the song
  playOrPauseSong() {
    if (this.song.paused) {
      this.song.play();
      this.playBtn = "../../../assets/icons/pause.svg";
    } else {
      if (this.song.play() !== undefined) {
        this.song.play().then((_) => {
          this.song.pause();
        });
      }
      this.playBtn = "../../../assets/icons/play.svg";
    }
  }

  // plays the next song
  next() {
    this.currentSong++;
    if (this.currentSong > this.songs.length - 1) {
      this.currentSong = 0;
    }
    this.playSong();
    this.playBtn = "../../../assets/icons/pause.svg";
    this.imageSrc = this.songs[this.currentSong].cover;
  }

  // plays the previous song
  previous() {
    this.currentSong--;
    if (this.currentSong < 0) {
      this.currentSong = this.songs.length - 1;
    }
    this.playSong();
    this.playBtn = "../../../assets/icons/pause.svg";
    this.imageSrc = this.songs[this.currentSong].cover;
  }

  //formats the time
  formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return min + ":" + (sec < 10 ? "0" + sec : sec);
  }

  //check if next needs to be played
  checkNext() {
    if (this.song.currentTime === this.song.duration) {
      this.next();
    }
  }
}
