import Cropper from 'cropperjs';
import { Editor } from './editor';

export class Transform {

  private _cropper: Cropper;
  private _rotate = 0;
  private _scale = [1, 1];
  private _data = {};

  public get inited() {
    return !!this._cropper;
  }

  constructor(
    private canvas: any,
    private _editor: Editor,
  ) {}

  get cropper() {
    return this._cropper;
  }

  public setRotation(value: number) {
    this._rotate = value;
    this._cropper.rotateTo(this._rotate);
  }

  public setScale(scale: [number, number]) {
    this._scale = scale;
    this._cropper.scale(this._scale[0], this._scale[1]);
  }

  public setAspectRatio(ratio: number) {
    this._cropper.setAspectRatio(ratio);
  }

  public destroy() {
    if (this._cropper) {
      this._data = this.cropper.getData();
      this._cropper.destroy();
      this._cropper = null;
    }
  }

  public init() {
    const options = {
      zoomable: true,
      zoomOnWheel: true,
      autoCrop: true,
      background: false,
      autoCropArea: .7
    };

    const base64 = this._editor.base64data;
    this._cropper = new Cropper(this.canvas, options);
    this._cropper.replace(base64);
    setTimeout(() => {
      this.cropper.setData(this._data);
    });
  }

}

