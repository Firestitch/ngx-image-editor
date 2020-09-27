import { DialogComponent } from './../dialog/dialog.component';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FsImageEditorComponent } from '@firestitch/image-editor';
import { FsFile } from '@firestitch/file';

@Component({
  selector: 'base-editor',
  templateUrl: 'base-editor.component.html',
  styleUrls: ['./base-editor.component.scss']
})
export class BaseEditorComponent {

  public imageUrl = '';
  public images = [
    { url: 'https://i.imgur.com/5zQYr6o.jpg' },
    { url: 'https://i.imgur.com/1Ul1TMZ.jpg' },
    { url: 'https://i.imgur.com/v3Z5sxC.jpg' }
  ];

  constructor(
    public dialog: MatDialog,
  ) {}

  public open(data) {
    const dialogRef = this.dialog.open(DialogComponent,
      {
        data,
        height: '80%',
        width: '80%',
      });

    dialogRef.afterClosed()
      .subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public uploadImage(fsFile: FsFile) {
    this.open({ imageBlob: fsFile.file });
  }

  public selectImage(image) {
    this.open({ imageUrl: image.url });
  }
}
