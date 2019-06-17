import { Component, OnInit } from '@angular/core';
import { GameEngine } from './engine.service';

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
    game.ft_inspector();
  }
}
