import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FsImageEditorComponent } from '@firestitch/image-editor';

@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public image;

  @ViewChild(FsImageEditorComponent, { static: true })
  public imageEditor: FsImageEditorComponent;

  public config = { width: '400px', height: '300px' };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  public ngOnInit() {

    this.dialogRef.addPanelClass('image-editor-panel');

    if (this.data.imageUrl) {
      this.imageEditor.loadImageUrl(this.data.imageUrl);
    }

    if (this.data.imageBlob) {
      this.imageEditor.loadImageBlob(this.data.imageBlob);
    }
  }

  public download() {
    this.imageEditor.download();
  }
}
