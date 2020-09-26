import Cropper from 'cropperjs';
import { Editor } from './editor';

export class Transform {

  // cropper
  private _cropper: Cropper;
  private _rotate = 0;
  private _scale = [1, 1];

  constructor(
    private canvas: any,
    private _editor: Editor,
  ) {

  }

  public setRotation(value: number) {
    this._rotate = value;
    this._cropper.rotateTo(this._rotate);
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

  public init() {

    if (!this._cropper) {

      const options = {
        zoomable: true,
        zoomOnWheel: true,
        autoCrop: false,
        background: false,
        autoCropArea: 1
      };

      this._cropper = new Cropper(this.canvas, options);
      this._cropper.replace(this._editor.base64data);
    }
  }

}

