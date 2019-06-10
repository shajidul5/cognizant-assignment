import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CacheComponent } from './cache/cache.component';
import { CacheInterceptor } from './cache.interceptor';
import { RxjsComponent } from './rxjs/rxjs.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserInteractionComponent } from './user-interaction/user-interaction.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    CacheComponent,
    RxjsComponent,
    UserInteractionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
