import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
 
@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit, OnChanges {
 
  @Input() resultUpload;

  result
  copyResult: boolean[] = new Array();
  showPrice = false;
  price: string
  colored = true;

  preferences: boolean[];

  constructor(private uploadService: UploadFileService) { }
 
  ngOnInit() {
    this.result = JSON.parse(this.resultUpload);
    this.copyResultArray();
    //this.copyResult = Object.assign({}, this.result,this.result.pages);
  }

  ngOnChanges() {
    this.result = JSON.parse(this.resultUpload);
    this.copyResult = new Array();
    this.copyResultArray();
    //this.copyResult = Object.assign({}, this.result,this.result.pages);
  }

  copyResultArray(){
    for(var i = 0;i<this.result.pages.length;i++) {
      if (this.result.pages[i])
        this.copyResult[i] = true;
      else
        this.copyResult[i] = false;
    }
  }

  sendPreferences() {
    console.log('send prefs '+JSON.stringify(this.copyResult));
    this.uploadService.sendPreferences(JSON.stringify(this.result),JSON.stringify(this.copyResult)).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('Price calculated!');
        this.showPrice = true;
        this.price = JSON.parse(JSON.stringify(event.body));
      }
    });
 
  }

  makeColoredFlag() {
    if (this.colored) {
      this.colored = false;
      for(var i = 0;i<this.copyResult.length;i++) { 
        this.copyResult[i] = false;
      }
    }
    else{
      this.colored = true;
      for(var i = 0;i<this.copyResult.length;i++) { 
        if (this.result.pages[i])
          this.copyResult[i] = true;
      }
    } 
  }
  getColoredFlag() : boolean{
    return this.colored;
  }
}