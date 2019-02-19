import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { FsImageEditorService } from '../../services/image-editor.service';
import { ISettings } from '../../interfaces/settings.interface';
import { ModeList } from '../../models/mode-list';
import { EditorConfig } from '../../models/editor-config.model';


@Component({
  selector: 'fs-image-editor',
  templateUrl: 'image-editor.component.html',
  styleUrls: [ 'image-editor.component.scss' ],
})
export class FsImageEditorComponent implements OnInit, OnDestroy {
  @Input() config: EditorConfig;

  @Input()
  set imageUrl(url: string) {
    this.setDefaultSettings();
    this._imageUrl = url;

    if (this._imageUrl) {
      this._editor.update(this._el, this._imageUrl);
    }
  }

  get imageUrl() {
    return this._imageUrl;
  }

  public modes = ModeList;
  public mode: ModeList = ModeList.Home;
  public settings: ISettings;

  private _imageUrl = null;

  constructor(private _editor: FsImageEditorService,
              private _el: ElementRef) {
  }

  public ngOnInit() {
    this._editor.initConfig(this.config);
  }

  public ngOnDestroy() {
    this._editor.destroy();
  }

  /**
   * Set mode and change containers depends on it if it is necessary
   * @param mode
   */
  public setMode(mode: ModeList) {
    this.mode = mode;
    this._editor.changeMode(mode);
  }

  /**
   * Set a new brightness filter value for image
   */
  public changeBrightness() {
    this._editor.changeBrightness(this.settings.brightness);
  }

  /**
   * Set a new contrast filter value for image
   */
  public changeContrast() {
    this._editor.changeContrast(this.settings.contrast);
  }

  /**
   * Set a new hue filter value for image
   */
  public changeHue() {
    this._editor.changeHue(this.settings.hue);
  }

  /**
   * Set a new saturation filter value for image
   */
  public changeSaturation() {
    this._editor.changeSaturation(this.settings.saturation);
  }

  /**
   * Set a new rotation value for image
   */
  public changeRotation() {
    this._editor.changeRotation(this.settings.rotate);
  }

  /**
   * Set a new value for scaleX or scaleY
   * scaleX = horizontal flip and scaleY = vertical flip
   * @param type
   */
  public changeFlip(type: 'x' | 'y') {
    if (type === 'x') {
      this.settings.scaleX *= -1;
    } else if (type === 'y') {
      this.settings.scaleY *= -1;
    }

    this._editor.changeScale([this.settings.scaleX, this.settings.scaleY]);
  }

  /**
   * Takes near value to 45 (degree point) depends on exists rotation
   * @param degree
   */
  public rotateByDegree(degree: number) {
    const absDegree = Math.abs(degree);
    const rotate = this.settings.rotate || 1;
    const absValue = absDegree * (Math.floor(rotate / absDegree));
    this.settings.rotate = absValue + degree;
    this.changeRotation();
  }

  /**
   * Set default zero settings
   */
  private setDefaultSettings() {
    this.settings = {
      brightness: 0,
      contrast: 0,
      hue: 0,
      saturation: 0,
      rotate: 0,
      scaleX: 1,
      scaleY: 1
    }
  }
}
