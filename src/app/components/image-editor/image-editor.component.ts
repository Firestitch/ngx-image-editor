import { Editor } from './../../classes/editor';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ISettings } from '../../interfaces/settings.interface';
import { ModeList } from '../../models/mode-list';
import { EditorConfig } from '../../models/editor-config.model';


@Component({
  selector: 'fs-image-editor',
  templateUrl: 'image-editor.component.html',
  styleUrls: [ 'image-editor.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsImageEditorComponent implements OnInit, OnDestroy {

  @ViewChild('container', { static: true }) private _container: ElementRef;

  @Input() public config: EditorConfig;
  @Input() public image: string

  get editor() {
    return this._editor;
  }

  public selectedIndexChange(index) {
    if (index === 0) {
      this.editor.adjustMode();
    }
    if (index === 1) {
      this.editor.transformMode();
    }
  }

  public adjustMode() {
    this.editor.transform.destroy();
  }

  public transformMode() {
    this.editor.transformMode();
  }

  public modes = ModeList;
  public mode: ModeList = ModeList.Home;
  public settings: ISettings = {
    brightness: 0,
    contrast: 0,
    hue: 0,
    saturation: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1
  };

  private _editor: Editor;

  constructor(
    private _el: ElementRef,
    private _zone: NgZone,
    private _cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    if (this.image) {
      this.loadImage(this.image);
    }
  }

  public ngOnDestroy() {
    this._editor.destroy();
  }

  public loadImage(image: string) {

    if (this._editor) {
      this._editor.destroy();
    }

    this._editor = new Editor(this._container.nativeElement, this._zone);
    this._editor.initConfig(this.config);
    this._editor.initEditor(image);
    this._editor.adjustMode();

    this._cdRef.markForCheck();
  }

  /**
   * Set a new brightness filter value for image
   */
  public changeBrightness(brightness) {
    this._editor.changeBrightness(brightness);
  }

  /**
   * Set a new contrast filter value for image
   */
  public changeContrast(contrast) {
    this._editor.changeContrast(contrast);
  }

  /**
   * Set a new hue filter value for image
   */
  public changeHue(hue) {
    this._editor.changeHue(hue);
  }

  /**
   * Set a new saturation filter value for image
   */
  public changeSaturation(saturation) {
    this._editor.changeSaturation(saturation);
  }

  /**
   * Set a new rotation value for image
   */
  public changeRotation(rotate) {
    this._editor.changeRotation(rotate);
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
    this.changeRotation(this.settings.rotate);
  }

    public urlToFile (url, filename) {
    return fetch(url)
      .then((res) => {
        return res.arrayBuffer();
      })

      .then((buf) => {
        return new File([buf], filename);
      });
  }

  public downloadBase64File() {

    const fileData = this.editor.base64data.replace(/.*base64,/, '');
    const fileUrl = `data:application/octet-stream;base64,${fileData}`;
    const fileName = 'test.png';

    this.urlToFile(fileUrl, fileName)
      .then((file) => {
        const blob = new Blob([file], { type: 'application/octet-stream' });
        const blobURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }

}
