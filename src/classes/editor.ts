import { Adjust } from './adjust';
import { Transform } from './transform';
import { EditorConfig } from '../models/';
import { NgZone } from '@angular/core';
import { ModeList } from '../models/mode-list';

const GLFX = require('glfx');

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

  constructor(private _container: any,
              private _zone: NgZone) {
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

    // apply the ink filter
    this._canvas.draw(this._texture).update();
    this.base64data = this._canvas.toDataURL();
  }

  public events() {
    this._imageElem.onload = this.initializeSettings.bind(this);
  }

  public changeMode(mode: ModeList) {
    if (mode === ModeList.Adjust) {
      this.adjustMode();
    }

    if (mode === ModeList.Transform) {
      this.transformMode();
    }
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

  public initializeSettings() {
    this.createCanvas();
    this.initializeEditors();
    this.base64data = this._canvasElem.toDataURL();
  }

  public initConfig(config: EditorConfig) {
    this.config = new EditorConfig(config);
  }

  public initEditor(imageUrl: string) {
    const container = this._container.querySelector('.img-container');
    this._imageElem = document.createElement('img');
    this._imageElem.crossOrigin = 'anonymous';
    this._imageElem.src = imageUrl;
    this._imageElem.setAttribute('width',  this.config.width);
    this._imageElem.setAttribute('height', this.config.height);
    container.appendChild(this._imageElem);
    this.events();
  }

  public adjustMode() {
    this._transform.hide();
    this._adjust.show();
  }

  public transformMode() {
    this._adjust.hide();
    this._transform.show();
  }

  private createCanvas() {
    try {
      this._canvas = GLFX.canvas();
    } catch (e) {
      alert(e);
      return;
    }

    // convert the image to a texture
    this._texture = this._canvas.texture(this._imageElem);

    // apply
    this._canvas.draw(this._texture).update();

    // replace the image with the canvas
    this._imageElem.parentNode.insertBefore(this._canvas, this._imageElem);
    this._imageElem.parentNode.removeChild(this._imageElem);

    this._canvasElem = this._container.querySelector('canvas');
  }

  private initializeEditors() {
    this._adjust = new Adjust(this._container, this);
    this._transform = new Transform(this._container, this);
  }

  public destroy() {
    this._canvasElem.remove();
    this._adjust && this._adjust.destroy();
    this._texture && this._texture.destroy();
    this._transform && this._transform.destroy();
  }
}
