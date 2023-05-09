import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from './core/interceptors/header.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatModule } from './core/mat/mat.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatModule,
    SidebarComponent,
    HeaderComponent,
    NgxSpinnerModule.forRoot({ type: 'ball-pulse-sync' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
