import { NgZone } from '@angular/core';
import * as GLFX from 'glfx';
import { Adjust } from './adjust';
import { Transform } from './transform';
import { EditorConfig } from '../models/editor-config.model';

export class Editor {
  public config: EditorConfig;
  public base64data: string;

  // dom elements
  protected _imageElem: HTMLImageElement;
  protected _canvasElem: HTMLCanvasElement;

  // glfx dom elements
  protected _canvas: any;
  protected _texture: any;

  // classes
  protected _adjust: Adjust;
  protected _transform: Transform;

  constructor(
    private _container: any,
    private _zone: NgZone,
  ) {
    this._canvasElem = this._canvas = GLFX.canvas();
    _container.querySelector('.img-container').append(this.canvasElem);

    this._adjust = new Adjust(this);
    this._transform = new Transform(this._canvasElem, this);
   }

  get transform() {
    return this._transform;
  }

  get canvas() {
    return this._canvas;
  }

  get texture() {
    return this._texture;
  }

  get canvasElem() {
    return this._canvasElem;
  }

  get image() {
    return this._imageElem;
  }

  set canvas(newCanvasData) {
    this._texture = this._canvas.texture(newCanvasData);
    this._canvas.draw(this._texture).update();
    this.base64data = this._canvas.toDataURL();
  }

  public changeBrightness(brightness: number) {
    this._adjust.setBrightness(brightness);
  }

  public changeContrast(contrast: number) {
    this._adjust.setContrast(contrast);
  }

  public changeHue(hue: number) {
    this._adjust.setHue(hue);
  }

  public changeSaturation(saturation: number) {
    this._adjust.setSaturation(saturation);
  }

  public changeRotation(rotate: number) {
    this._transform.setRotation(rotate);
  }

  public changeScale(scale: [number, number]) {
    this._transform.setScale(scale);
  }

  public initConfig(config: EditorConfig) {
    this.config = new EditorConfig(config);
  }

  public initEditor(imageUrl: string) {
    const container = this._container.querySelector('.img-container');
    this._imageElem = document.createElement('img');
    this._imageElem.crossOrigin = 'anonymous';
    this._imageElem.src = imageUrl;

    container.appendChild(this._imageElem);
    this._imageElem.addEventListener('load', (event) => {

      let width = (event.target as any).clientWidth;
      let height = (event.target as any).clientHeight;

      if (width > height) {

        if (width > container.offsetWidth) {
          const maxWidth = container.offsetWidth * .8;
          height = height * (1 - ((width - maxWidth) / width));
          width = maxWidth;
        }
      }

      this._imageElem.setAttribute('width',  width);
      this._imageElem.setAttribute('height', height);

      this.createCanvas();
      this.base64data = this._canvasElem.toDataURL();
    });
  }

  public adjustMode() {
    this._transform.destroy();
  }

  public transformMode() {
    this._transform.init();
  }

  private createCanvas() {
    try {

      // convert the image to a texture
      this._texture = this._canvas.texture(this._imageElem);

      // apply
      this._canvas.draw(this._texture).update();

      // replace the image with the canvas
      //this._imageElem.parentNode.insertBefore(this._canvas, this._imageElem);
      this._imageElem.parentNode.removeChild(this._imageElem);
    } catch (e) {
      console.log(e);
    }
  }

  public destroy() {
    this._canvasElem.remove();
    this._adjust.destroy();
    if (this._texture) {
      this._texture.destroy();
    }
    this._transform.destroy();
  }
}
