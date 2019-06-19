import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ElectronService } from '../../providers/electron.service';

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

  public settingsOpen = false;
  public settingsContainer: Object;

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

  constructor(
    electron: ElectronService
  ) {
    this.electron = electron;
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
        win.setSize(this.electron.getScreenSize().width, this.electron.getScreenSize().height);
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
    // optionDisplayB
    win.setSize(Number(this.selectedDisplayB.split(' - ', 1)[0].split(' x ', 1)[0]),
     Number(this.selectedDisplayB.split(' - ', 1)[0].split(' x ', 2)[0]));
    win.center();
  }

  onChange( name: string, value: string ): void {
    if (name === 'displayA') {
      this.selectedDisplayA = value;
    } else if (name === 'displayB') {
      this.selectedDisplayB = value;
    }
  }

}
