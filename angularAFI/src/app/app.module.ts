import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './nav.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


import { AuthGuard } from '@auth0/auth0-angular';
import { GameComponent } from './game/game.component';



var routes: any = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [AuthGuard]
  }
  

];

@NgModule({
  declarations: [
    AppComponent, HomeComponent, NavComponent, GameComponent
  ],
  imports: [
    BrowserModule, FormsModule, NgxPaginationModule, HttpClientModule,
    RouterModule.forRoot(routes), ReactiveFormsModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatExpansionModule,
    MatSlideToggleModule, MatButtonToggleModule,
    AuthModule.forRoot({
      domain: 'david-mcm.eu.auth0.com',
      clientId: 'oS8yms0R3ZdB8zjh9QaqKTSQWte2q7Bh'
    }),
    BrowserAnimationsModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
