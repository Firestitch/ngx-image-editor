import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FsImageEditorComponent } from './components/image-editor/image-editor.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatSliderModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  exports: [
    FsImageEditorComponent,
  ],
  declarations: [
    FsImageEditorComponent,
  ],
})
export class FsImageEditorModule {
  static forRoot(): ModuleWithProviders<FsImageEditorModule> {
    return {
      ngModule: FsImageEditorModule,
    };
  }
}
