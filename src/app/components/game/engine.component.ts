import { Component, OnInit } from '@angular/core';
import { GameEngine } from '../../providers/game/engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    const game = new GameEngine('renderCanvas');
    game.ft_createScene();
    game.ft_animate();

    document.addEventListener('keydown', game.keyDownHandler, false);
    document.addEventListener('keyup', game.keyUpHandler, false);
    // game.ft_inspector();
  }
}
