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
import { MatSliderChange } from '@angular/material/slider';
import { interval, Subject } from 'rxjs';
import { debounce, throttle } from 'rxjs/operators';


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

  private _throttle$ = new Subject();

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
    this.editor.adjustMode();
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
  ) {
    this._throttle$
      .pipe(
        debounce(val => interval(0))
      )
      .subscribe((func: any) => {
        func();
      });
  }

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

    this._editor = new Editor(this._container.nativeElement);
    this._editor.initConfig(this.config);
    this._editor.initEditor(image);
    this._editor.adjustMode();

    this._cdRef.markForCheck();
  }

  /**
   * Set a new brightness filter value for image
   */
  public changeBrightness(event: MatSliderChange) {
    this._throttle$.next(() => { this._editor.changeBrightness(event.value); });
  }

  /**
   * Set a new contrast filter value for image
   */
  public changeContrast(event: MatSliderChange) {
    this._throttle$.next(() => { this._editor.changeContrast(event.value); });
  }

  /**
   * Set a new hue filter value for image
   */
  public changeHue(event: MatSliderChange) {
    this._throttle$.next(() => { this._editor.changeHue(event.value); });
  }

  /**
   * Set a new saturation filter value for image
   */
  public changeSaturation(event: MatSliderChange) {
    this._throttle$.next(() => { this._editor.changeSaturation(event.value); });
  }

  /**
   * Set a new rotation value for image
   */
  public changeRotation(event: MatSliderChange) {
    this._editor.changeRotation(event.value);
  }

  public aspectRatio(ratio) {
    this._editor.aspectRatio(ratio);
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
     this._editor.changeRotation(this.settings.rotate);
  }

  public download() {
    this.editor.download();
  }

}
