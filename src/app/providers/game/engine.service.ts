import { Injectable } from '@angular/core';

/**
 * Imports from BabylonJS
 */
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { GridMaterial } from '@babylonjs/materials';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import '@babylonjs/core/Materials/standardMaterial';

import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';

@Injectable()
export class GameEngine {

  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _camera: FreeCamera;
  private _light: HemisphericLight;

  constructor(canvasElement: string) {
    this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
    this._engine = new Engine(this._canvas, true);
  }

  /**
   * Function to launch creation of scene and camera
   */
  ft_createScene(): void {
    // Create a simple scene object
    this._scene = new Scene(this._engine);
    // Create FreeCamera and set it position
    this._camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this._scene);
    // Target the camera to the scene origin
    this._camera.setTarget(Vector3.Zero());
    // Attach the camera to the canvas
    this._camera.attachControl(this._canvas, false);
    // Create a basic light, aiming 0,1,0 - meaning, to the sky
    this._light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);
    // Create a built-in "sphere" shape; with 16 segments and diameter of 2
    const sphere = MeshBuilder.CreateSphere('sphere1',
      {segments: 16, diameter: 2}, this._scene);
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1;
    // Create a built-in "ground" shape
    const ground = MeshBuilder.CreateGround('ground1',
      {width: 6, height: 6, subdivisions: 2}, this._scene);
  }

  /**
   * Function for run the render loop
   */
  ft_animate(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
    // The canvas/window resize event handler
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }

  ft_inspector(): void {
    this._scene.debugLayer.show();
  }
}
