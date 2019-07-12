import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { StorageService } from './providers/storage.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EngineComponent } from './components/game/engine.component';


import { UiInfobarBottomComponent } from './components/game/hud/ui-infobar-bottom/ui-infobar-bottom.component';
import { UiInfobarTopComponent } from './components/game/hud/ui-infobar-top/ui-infobar-top.component';
import { UiSidebarLeftComponent } from './components/game/hud/ui-sidebar-left/ui-sidebar-left.component';
import { UiSidebarRightComponent } from './components/game/hud/ui-sidebar-right/ui-sidebar-right.component';
import { UiPauseComponent } from './components/game/hud/ui-pause/ui-pause.component';
import { HudComponent } from './components/game/hud/hud.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    EngineComponent,
    HudComponent,
    UiInfobarBottomComponent,
    UiInfobarTopComponent,
    UiSidebarLeftComponent,
    UiSidebarRightComponent,
    UiPauseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
