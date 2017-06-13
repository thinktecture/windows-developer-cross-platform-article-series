/// <reference types="node" />

import { NgModule, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import {AppModule} from './module';
import {RootComponent} from './components/root/root';

export class ServerFactoryLoader extends NgModuleFactoryLoader {
  load(path: string): Promise<NgModuleFactory<any>> {
    return new Promise((resolve, reject) => {
      const [file, className] = path.split('#');
      const classes = require('../../dist/ngfactory/src/app' + file.slice(1) + '.ngfactory');
      resolve(classes[className + 'NgFactory']);
    });
  }
}

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  bootstrap: [RootComponent],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: ServerFactoryLoader }
  ]
})
export class AppServerModule { }
