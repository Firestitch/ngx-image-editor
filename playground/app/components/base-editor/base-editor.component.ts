import { Component, ViewChild } from '@angular/core';
import { FsImageEditorComponent } from '@firestitch/image-editor';

@Component({
  selector: 'base-editor',
  templateUrl: 'base-editor.component.html',
  styleUrls: ['./base-editor.component.scss']
})
export class BaseEditorComponent {

  @ViewChild(FsImageEditorComponent) public imageEditor: FsImageEditorComponent;

  public config = { width: '400px', height: '300px' };
  public imageUrl = '';
  public images = [
    { url: 'https://i.imgur.com/5zQYr6o.jpg' },
    { url: 'https://i.imgur.com/1Ul1TMZ.jpg' },
    { url: 'https://i.imgur.com/v3Z5sxC.jpg' }
  ];

  constructor() {

  }

  public choseImage(image) {
    this.imageEditor.loadImage(image.url);
  }
}
