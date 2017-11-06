import { Component,OnInit  } from '@angular/core';
import { VideoService } from './video.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'app';
	filterText : String = '';
	videosDataArray: any;
	scrollArray :any;
	allVideos:any;
	errorMessage: string; 
	pageNumRequested : number;
	totalPages : number;
	filteredVideos : any;
	constructor(private _videoService: VideoService) {
 
}

ngOnInit(): void {
             this._videoService.getVideos("CONTENTLISTINGPAGE-PAGE1.json").subscribe(videos => {
                    this.videosDataArray = videos;
					
					this.totalPages = this.videosDataArray.page['total-content-items'];
					this.pageNumRequested = this.videosDataArray.page['page-num-requested'];
                },
				
                    error => this.errorMessage = <any>error);
}

onScroll () : void{
	if(this.filterText == "") {
		this.pageNumRequested++;
		if(this.videosDataArray.page['content-items'].content.length < this.totalPages ) {
        this._videoService.getVideos("CONTENTLISTINGPAGE-PAGE"+this.pageNumRequested+".json").subscribe(videos => {
                   this.scrollArray = videos;
				 
				   
					for (var i = 0; i <  this.scrollArray.page['content-items'].content.length; i++) {
						 this.videosDataArray.page['content-items'].content.push(this.scrollArray.page['content-items'].content[i]);
			}
			console.log( this.videosDataArray.page['content-items'].content.length );
                },
		
                    error => this.errorMessage = <any>error);
		}			
    }
}
filterList(): void {
	
	var filterTextValue = this.filterText;
	if(this.filterText == ""){
		 this._videoService.getVideos("CONTENTLISTINGPAGE-PAGE1.json").subscribe(videos => {
                    this.videosDataArray = videos;
					
					this.totalPages = this.videosDataArray.page['total-content-items'];
					this.pageNumRequested = this.videosDataArray.page['page-num-requested'];
                },
				
                    error => this.errorMessage = <any>error);
	}
	else {
	// video service -- 
	this._videoService.getVideos("CONTENTLISTINGPAGE-ALLPAGE.json").subscribe(videos => {
		this.allVideos = videos;
		this.videosDataArray.page['content-items'].content = this.allVideos.page['content-items'].content.filter((video : any) => video.name.toLocaleLowerCase().indexOf(filterTextValue) !== -1);
			  
			  
					/*this.filteredVideos = this.allVideos.page['content-items'].content.map(function(video){
    					return video.name.contains(this.filterText);
					}) 
					this.videosDataArray.page['content-items'].content = this.filteredVideos;*/
		
                },
				
                    error => this.errorMessage = <any>error);

}
}

clearSearch() : void {
	this.filterText = '';
	this.ngOnInit();
}
}
