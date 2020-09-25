import Cropper from 'cropperjs';
import { Editor } from './editor';

export class Transform {

  // cropper
  private _cropper: Cropper;
  private _rotate = 0;
  private _scale = [1, 1];

  constructor(
    private _container: any,
    private _editor: Editor,
  ) {

  //   setTimeout(() => {
  //     this.createCropperArea();
  //  },100)
  }

  public createCropperArea() {
    this._cropper = new Cropper(this._editor.canvas, this._editor.config.cropperOptions);
  }

  public setRotation(value: number) {
    this._rotate = value;
    this._cropper.rotateTo(this._rotate);
  }

  public hide() {
    // @todo change selection
    const container = this._container.querySelector('.cropper-container');

    // if (this._cropper) {
    //   this._editor.canvas = this._cropper.getCroppedCanvas();
    // }

    this.destroy();
  }

  public show() {
    // create the cropper if there is no cropper;
    // we need it because in first initialization of the class we don't need to create a cropper
    // but we can't hide it, because it creates dynamiclly
    // @todo hide cropper on girst initialization
    this.createCropperArea();

    this._cropper.replace(this._editor.base64data);
  }

  public setScale(scale: [number, number]) {
    this._scale = scale;
    this._cropper.scale(this._scale[0], this._scale[1]);
  }

  public destroy() {
    if (this._cropper) {
      this._cropper.destroy();
    }
  }

}

