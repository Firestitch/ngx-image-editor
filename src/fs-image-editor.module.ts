import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FsImageEditorComponent } from './components/fs-image-editor/';
import { FsImageEditorService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FsImageEditorComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsImageEditorComponent,
  ],
  providers: [
      FsImageEditorService,
  ],
})
export class FsImageEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsImageEditorModule,
      providers: [FsImageEditorService]
    };
  }
}
