import { Component, OnInit } from '@angular/core';
import { GameClassesComponent } from './classes/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    const game = new GameClassesComponent('renderCanvas');
    game.ft_createScene();
    game.ft_animate();
    game.ft_inspector();
  }
}
