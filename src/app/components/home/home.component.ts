import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ElectronService } from '../../providers/electron.service';
import { StorageService } from '../../providers/storage.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-success'
  },
  buttonsStyling: true,
});
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public settingsOpen = false;
  public settingsContainer: Object;
  public titleAnimation = false;
  public titleAnimationVisibility = false;

  /**
   * Display
   */
    // Option A
      public optionDisplayA: Array<string> = ['Window', 'Fullscreen', 'Fullscreen Window'];
      public selectedDisplayA: String = 'Window';
    // Option B
      public optionDisplayB: Array<string> = [
        '800 x 600 - 4:3',
        '1024 x 768 - 4:3',
        '1152 x 864 - 4:3',
        '1176 x 664 - 16:9',
        '1280 x 720 - 16:9',
        '1280 x 768 - 16:10',
        '1280 x 800 - 16:10',
        '1280 x 960 - 4:3',
        '1280 x 1024 - 5:4',
        '1360 x 768 - 16:9',
        '1366 x 768 - 16:9',
        '1440 x 900 - 16:10',
        '1600 x 900 - 16:9',
        '1600 x 1024 - 16:10',
        '1680 x 1050 - 16:10',
        '1768 x 992 - 16:9',
        '1920 x 1080 - 16:9',
        '2048 x 1080 - 17:9',
        '2048 x 1536 - 4:3',
        '2560 x 1080 - 21:9',
        '2560 x 1440 - 16:9',
        '2560 x 1600 - 16:10',
        '2560 x 2048 - 5:4',
        '3440 x 1440 - 21:9',
        '3840 x 2160 - 16:9',
        '4096 x 2160 - 17:9'
      ];
      public selectedDisplayB: String = '1024 x 768 - 4:3';

  private electron: ElectronService;
  private storage: StorageService;

  constructor(
    electron: ElectronService,
    storage: StorageService
  ) {
    this.electron = electron;
    this.storage = storage;
    this.settingsContainer = {
      display: true,
      audio: false,
      game: false,
      controls: false,
      graphics: false
    };
  }

  ngOnInit() {

    /**
     * Check if screenSize was saved in localStorage
     *  true -> we define the window with the values
     *  false -> we define the window with the current screen size (screen monitor)
     */
    const screenSize = this.storage.getItem('screenSize');
    if (screenSize === null || screenSize === 'null') {
      this.electron.remote.getCurrentWindow().setSize(this.electron.getScreenSize().width,
       this.electron.getScreenSize().height);
      this.storage.setItem('screenSize', `${this.electron.getScreenSize().width} - ${this.electron.getScreenSize().height}`);
    } else {
      this.electron.remote.getCurrentWindow().setSize(Number(screenSize.split(' - ', 1)[0]), Number(screenSize.split(' - ', 2)[1]));

      const data = this.optionDisplayB.map(x => x.split(' - ', 1)[0].split(' x ', 1)[0] === screenSize.split(' - ', 1)[0] &&
       x.split(' - ', 1)[0].split(' x ', 2)[1] === screenSize.split(' - ', 2)[1]);
      if (data) {
        const index = data.indexOf(true);
        this.selectedDisplayB = this.optionDisplayB[index];
      }
    }
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
        const win = this.electron.remote.getCurrentWindow();
        win.close();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        console.log('app ouverte');
      }
    });
  }

  saveSettings(): void {
    const win = this.electron.remote.getCurrentWindow();

    // optionDisplayA
    switch (this.selectedDisplayA) {
      case 'Window': {
        win.setFullScreen(false);
          // optionDisplayB
          win.setSize(Number(this.selectedDisplayB.split(' - ', 1)[0].split(' x ', 1)[0]),
            Number(this.selectedDisplayB.split(' - ', 1)[0].split(' x ', 2)[1]));
          win.center();
          const sizeSplit = this.selectedDisplayB.split(' - ', 1)[0];
          this.storage.setItem('screenSize', `${sizeSplit.split(' x ', 1)[0]} - ${sizeSplit.split(' x ', 2)[1]}`);
        break;
      }
      case 'Fullscreen': {
        win.setFullScreen(true);
        break;
      }
      case 'Fullscreen Window': {
        win.setSimpleFullScreen(true);
        win.setSize(this.electron.getScreenSize().width, this.electron.getScreenSize().height);
        break;
      }
    }

    Toast.fire({
      type: 'success',
      title: 'Settings successfully saved'
    });
  }

  onChange( name: string, value: string ): void {
    if (name === 'displayA') {
      this.selectedDisplayA = value;
    } else if (name === 'displayB') {
      this.selectedDisplayB = value;
    }
  }

}
