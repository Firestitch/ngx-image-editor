import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FsImageEditorComponent } from '../../../../src/public_api';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsImageEditorComponent as FsImageEditorComponent_1 } from '../../../../src/app/components/image-editor/image-editor.component';
import { FsImageEditorActionButtonsDirective } from '../../../../src/app/directives/action-buttons.directive';
import { MatButton } from '@angular/material/button';

@Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    standalone: true,
    imports: [CdkScrollable, MatDialogContent, FsImageEditorComponent_1, FsImageEditorActionButtonsDirective, MatButton, MatDialogClose]
})
export class DialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<DialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);


  public image;

  @ViewChild(FsImageEditorComponent, { static: true })
  public imageEditor: FsImageEditorComponent;

  public config = { width: '400px', height: '300px' };

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
