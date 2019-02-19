import { Injectable, NgZone } from '@angular/core';
import { Editor } from '../classes/editor';
import { ModeList } from '../models/mode-list';
import { EditorConfig } from '../models/editor-config.model';


@Injectable()
export class FsImageEditorService {
  public editor: Editor;
  public config: EditorConfig;
  public mode: ModeList = ModeList.Home;

  private _container: HTMLElement;

  constructor(private _zone: NgZone) {}

  /**
   * Initialization method for general config for editor.
   * Set cropper configs
   * @param config
   */
  public initConfig(config: EditorConfig) {
    this.config = new EditorConfig(config);
  }

  /**
   * Initialize editor with general config and root container
   * @param rootElement
   * @param imageUrl
   */
  public createEditor(rootElement: any, imageUrl: string) {
    this._container = rootElement.nativeElement.querySelector('.container');
    this.editor = new Editor(this._container, this._zone);
    this.editor.initConfig(this.config);
    this.editor.initEditor(imageUrl);
  }

  /**
   * Update editor (when image url was changed, for example)
   * Remove previous and create a new one
   * @param rootElement
   * @param imageUrl
   */
  public update(rootElement, imageUrl: string) {
    if (this.editor) {
      this.editor.destroy();
    }

    this.createEditor(rootElement, imageUrl);
  }

  /**
   * Change mode from adjust to transform
   * We need this method because cropperjs and glfx.js are using different canvas
   * And we need to hide one of them
   * @param mode
   */
  public changeMode(mode: ModeList) {

    if ((mode === ModeList.Adjust || mode === ModeList.Transform) && this.mode === ModeList.Home ) {
      this.editor.changeMode(mode);
    }

    this.mode = mode;
  }

  /**
   * Set brightness filter value for image
   * @param brightness
   */
  public changeBrightness(brightness: number) {
    this.editor.changeBrightness(brightness);
  }

  /**
   * Set contrast filter value for image
   * @param contrast
   */
  public changeContrast(contrast: number) {
    this.editor.changeContrast(contrast);
  }

  /**
   * Set hue filter value for image
   * @param hue
   */
  public changeHue(hue: number) {
    this.editor.changeHue(hue);
  }

  /**
   * Set saturation filter value for image
   * @param saturation
   */
  public changeSaturation(saturation: number) {
    this.editor.changeSaturation(saturation);
  }

  /**
   * Set a new rotation value
   * @param rotate
   */
  public changeRotation(rotate: number) {
    this.editor.changeRotation(rotate);
  }

  /**
   * Set scale value, where [scaleX, scaleY]
   * @param scale
   */
  public changeScale(scale: [number, number]) {
    this.editor.changeScale(scale);
  }

  /**
   * Destroy editor
   */
  public destroy() {
    this.editor && this.editor.destroy();
  }
}
