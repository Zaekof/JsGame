import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HudComponent implements OnInit {

  public gamePause = false;

  constructor() {}

  ngOnInit() {
    window.addEventListener('game', (e: CustomEvent) => {
      switch (e.detail) {
        case 'pausePressed':
          this.gamePause = !this.gamePause;
          break;
        default:
          break;
      }
    });
  }

}
