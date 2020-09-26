import { Editor } from './editor';

export class Adjust {

  private _brightness = 0;
  private _contrast = 0;
  private _hue = 0;
  private _saturation = 0;

  constructor(
    private _editor: Editor,
  ) { }

  public setBrightness(value: number) {
    this._brightness = value;
    this.brightnessContrast();
  }

  public setContrast(value: number) {
    this._contrast = value;
    this.brightnessContrast();
  }

  public setHue(value: number) {
    this._hue = value;
    this.hueSaturation();
  }

  public setSaturation(value: number) {
    this._saturation = value;
    this.hueSaturation();
  }

  public brightnessContrast() {
    this._editor.canvas
      .draw(this._editor.texture)
      .brightnessContrast(this._brightness, this._contrast)
      .update();
  }

  public hueSaturation() {
    this._editor.canvas
      .draw(this._editor.texture)
      .hueSaturation(this._hue, this._saturation)
      .update();
  }

  public destroy() {

  }

}
