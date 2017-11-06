import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {VideoService} from './video.service';
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	FormsModule,
	InfiniteScrollModule
	
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
