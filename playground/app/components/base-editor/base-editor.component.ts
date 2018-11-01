import { Component } from '@angular/core';

@Component({
  selector: 'base-editor',
  templateUrl: 'base-editor.component.html',
  styleUrls: ['./base-editor.component.scss']
})
export class BaseEditorComponent {
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
    this.imageUrl = image.url;
  }
}
