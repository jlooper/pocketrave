import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES } from './app.common';
//angularfire, UI, auth helpers
import {
    AuthMethods,
    AuthProvider,
    AuthProviderWithCustomConfig,
    CredentialHelper,
    FirebaseUIAuthConfig,
    FirebaseUIModule
  } from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
//light show
import { PhotonService } from './services/photon.service';

Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
    providers: [
      AuthProvider.Password
    ],
    method: AuthMethods.Popup,
    tos: 'http://www.jenlooper.com/privacy-policy/',
    credentialHelper: CredentialHelper.None
  };

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
        HttpClientModule ,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        ...SHARED_MODULES
    ],
    providers: [ PhotonService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
