import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import firebase = require("nativescript-plugin-firebase");

import { AppModule } from "./app.module";

firebase.init({
        persist: true,
        storageBucket: 'gs://pocketrave-644be.appspot.com',        
      }).then(() => {
        console.log('firebase.init done');
      }, (error: any) => {
        console.log('firebase.init error: ' + error);
      });

platformNativeScriptDynamic().bootstrapModule(AppModule);
