import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

import { FsImageEditorComponent } from './components/image-editor/image-editor.component';
import { FsImageEditorActionButtonsDirective } from './directives/action-buttons.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  exports: [
    FsImageEditorComponent,
    FsImageEditorActionButtonsDirective,
  ],
  declarations: [
    FsImageEditorComponent,
    FsImageEditorActionButtonsDirective,
  ],
})
export class FsImageEditorModule {
  static forRoot(): ModuleWithProviders<FsImageEditorModule> {
    return {
      ngModule: FsImageEditorModule,
    };
  }
}
