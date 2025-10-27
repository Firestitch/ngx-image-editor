import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { BaseEditorComponent } from '../base-editor/base-editor.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, BaseEditorComponent]
})
export class ExamplesComponent {
  public config = environment;
}
