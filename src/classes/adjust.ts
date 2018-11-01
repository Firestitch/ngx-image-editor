import { Editor } from './editor';

export class Adjust {

  // image filters
  private _brightness = 0;
  private _contrast = 0;
  private _hue = 0;
  private _saturation = 0;

  constructor(private _container: any,
              private _editor: Editor) {
  }

  public show() {
    this._editor.canvasElem.classList.remove('cropper-hidden');
  }

  public hide() {

  }

  public setBrightness(value: number) {
    this._brightness = value;
    this.applyFilters();
  }

  public setContrast(value: number) {
    this._contrast = value;
    this.applyFilters();
  }

  public setHue(value: number) {
    this._hue = value;
    this.applyFilters();
  }

  public setSaturation(value: number) {
    this._saturation = value;
    this.applyFilters();
  }

  public applyFilters() {
    // if there is a problem for some reason
    if (!this._editor.canvas) {
      return;
    }

    this._editor.canvas
      .draw(this._editor.texture)
      .brightnessContrast(this._brightness, this._contrast)
      .hueSaturation(this._hue, this._saturation)
      .update();

    this._editor.base64data = this._editor.canvas.toDataURL();
  }

  public destroy() {
    
  }

}
