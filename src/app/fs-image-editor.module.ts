import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FsImageEditorComponent } from './components/image-editor/image-editor.component';
import { FsImageEditorService } from './services/image-editor.service';


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
  providers: [],
})
export class FsImageEditorModule {
  static forRoot(): ModuleWithProviders<FsImageEditorModule> {
    return {
      ngModule: FsImageEditorModule,
      providers: [FsImageEditorService]
    };
  }
}
