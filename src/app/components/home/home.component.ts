import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-success'
  },
  buttonsStyling: true,
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public settingsOpen: boolean;
  public settingsContainer: Object;

  constructor() {
    this.settingsOpen = false;
    this.settingsContainer = {
      display: true,
      audio: false,
      game: false,
      controls: false,
      graphics: false
    };
  }

  ngOnInit() {

  }

  /**
   * Open Settings container and display section
   */
  openSettings(): void {
    this.settingsOpen = true;
    this.settingsContainer = {
      display: true,
      audio: false,
      game: false,
      controls: false,
      graphics: false
    };
  }
  /**
   * Close Settings container and set false to all childs sections
   */
  closeSettings(): void {
    this.settingsOpen = false;
    this.settingsContainer = {
      display: false,
      audio: false,
      game: false,
      controls: false,
      graphics: false
    };
  }

  /**
   * Open selected section in Settings container
   * @param name
   */
  settingsContainerOpen( name: string ): void {
    if (typeof (name) !== typeof (undefined) && name.length !== 0) {
      switch (name) {
        case 'display': {
          this.settingsContainer = {
            display: true,
            audio: false,
            game: false,
            controls: false,
            graphics: false
          };
          break;
        }
        case 'audio': {
          this.settingsContainer = {
            display: false,
            audio: true,
            game: false,
            controls: false,
            graphics: false
          };
          break;
        }
        case 'game': {
          this.settingsContainer = {
            display: false,
            audio: false,
            game: true,
            controls: false,
            graphics: false
          };
          break;
        }
        case 'controls': {
          this.settingsContainer = {
            display: false,
            audio: false,
            game: false,
            controls: true,
            graphics: false
          };
          break;
        }
        case 'graphics': {
          this.settingsContainer = {
            display: false,
            audio: false,
            game: false,
            controls: false,
            graphics: true
          };
          break;
        }
      }
    }
  }

  quitGame(): void {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, close',
      cancelButtonText: 'No, stay in the game',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        console.log('app fermer');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        console.log('app ouverte');
      }
    });
  }

}
