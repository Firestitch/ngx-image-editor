import { NgZone } from '@angular/core';
import * as GLFX from 'glfx';
import { Adjust } from './adjust';
import { Transform } from './transform';
import { EditorConfig } from '../models/editor-config.model';

export class Editor {
  public config: EditorConfig;
  public base64data1: string;

  // dom elements
  protected _imageElem: HTMLImageElement;

  // glfx dom elements
  protected _canvas: any;
  protected _texture: any;

  // classes
  protected _adjust: Adjust;
  protected _transform: Transform;

  constructor(
    private _container: any,
  ) {
    this._canvas = GLFX.canvas();
    _container.querySelector('.img-container').append(this.canvas);

    this._adjust = new Adjust(this);
    this._transform = new Transform(this._canvas, this);
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

  get image() {
    return this._imageElem;
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

  public aspectRatio(ratio: number) {
    this._transform.setAspectRatio(ratio);
  }

  public initConfig(config: EditorConfig) {
    this.config = new EditorConfig(config);
  }

  public initEditor(imageSrc: string) {
    const container = this._container.querySelector('.img-container');
    this._imageElem = document.createElement('img');
    this._imageElem.crossOrigin = 'anonymous';
    this._imageElem.src = imageSrc;

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
      this.base64data1 = this._canvas.toDataURL();
    });
  }

  public get base64data() {
    this._canvas.draw(this._texture).update();
    return this._canvas.toDataURL();
  }

  public adjustMode() {
    if (this._transform.inited) {

      this._texture.loadContentsOf(this._transform.cropper.getCroppedCanvas());
      this._canvas.draw(this._texture).update();
    }

    this._transform.destroy();
  }

  public transformMode() {
    if (!this._transform.inited) {
      this._transform.init();
    }
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



  private _urlToFile(url, filename) {
    return fetch(url)
      .then((res) => {
        return res.arrayBuffer();
      })

      .then((buf) => {
        return new File([buf], filename);
      });
  }

  public download(fileName?: string) {
    fileName = fileName ?? 'test.png'; //get this filename from the original url or blob
    this.getBlob(fileName)
    .then((blob) => {
        const blobURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }

  public getBlob(fileName?: string): Promise<Blob> {
    fileName = fileName ?? 'test.png'; //get this filename from the original url or blob
    const fileData = this.base64data.replace(/.*base64,/, '');
    const fileUrl = `data:application/octet-stream;base64,${fileData}`;
    return new Promise((resolve, reject) => {
      this._urlToFile(fileUrl, fileName)
        .then((file) => {
          const blob = new Blob([file], { type: 'application/octet-stream' });
          resolve(blob);
        }, (error) => {
            reject(error);
        });
    })
  }

  public destroy() {
    this._canvas.remove();
    this._adjust.destroy();
    if (this._texture) {
      this._texture.destroy();
    }
    this._transform.destroy();
  }
}
