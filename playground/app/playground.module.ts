import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FsExampleModule } from '@firestitch/example';
import { FsFileModule } from '@firestitch/file';
import { FsMessageModule } from '@firestitch/message';
import { FsImageEditorModule } from '../../src/public_api';

import { AppComponent } from './app.component';
import { BaseEditorComponent, ExamplesComponent } from './components';
import { DialogComponent } from './components/dialog';
import { AppMaterialModule } from './material.module';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        FsFileModule.forRoot(),
        FsImageEditorModule.forRoot(),
        FsExampleModule.forRoot(),
        FsMessageModule.forRoot(),
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    declarations: [
        AppComponent,
        DialogComponent,
        ExamplesComponent,
        BaseEditorComponent
    ],
    providers: []
})
export class PlaygroundModule {
}
