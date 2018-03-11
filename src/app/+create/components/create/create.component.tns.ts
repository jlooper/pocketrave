import {ViewChild, ElementRef, Inject, NgZone, Component} from '@angular/core';
import {FirebaseService} from '../../../services';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {throttle} from 'lodash';
import * as frame from 'ui/frame';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { ColorPicker } from 'nativescript-color-picker';
import { DrawingPad } from 'nativescript-drawingpad';
import * as imageSource from 'image-source';
import * as appSettings from 'application-settings';
import * as enums from 'ui/enums';
import * as dialogs from 'ui/dialogs';
import * as fs from 'file-system';

@Component({
    moduleId: module.id,
    selector: 'seed-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @ViewChild('DrawingPad') DrawingPad: ElementRef;
  public penColor$: BehaviorSubject<string> = new BehaviorSubject('#FFF');
  public penWidth$: BehaviorSubject<number> = new BehaviorSubject(3);
  public widthChangeThrottle: Function;
  loader = new LoadingIndicator();
  picker = new ColorPicker();
  pad = new DrawingPad();

  id: string;
  imagepath: string;
  image: any;
  private imagePath: string;
  private uploadedImageName: string;
  private uploadedImagePath: string;

  

  constructor(private _router: Router,
    private firebase: FirebaseService,
    private ngZone: NgZone,
  ) {
    // since (propertyChange) event binding is called many times a second, best to throttle it :)
    this.widthChangeThrottle = throttle(this.widthChange.bind(this), 500);
  }



  public saveDrawing(args: any) {


      let pad = this.DrawingPad.nativeElement;

        
        if (frame.topmost().ios) {
          pad.getDrawing().then((data: any) => {
            this.save(data);
        }, (err: any) => {
          this.loader.hide()
          alert(err);
          });
        } else {
            pad.getTransparentDrawing().then((data: any) => {
              this.save(data)
          }, (err: any) => {
            this.loader.hide();
            alert(err);
          });
        }
  }

  public documentsPath(filename: string) {
    return `${fs.knownFolders.documents().path}/${filename}`;
  }

  public save(data: any) {
        let imgsrc = imageSource.fromNativeSource(data);
        let path = this.documentsPath(`drawing-${Date.now()}.png`);
        imgsrc.saveToFile(path,"png");
          this.loader.show({ message: 'Saving your drawing!' });
        console.log(path)
        this.firebase.uploadFile(path).then((uploadedFile: any) => {
          console.log(uploadedFile)
          this.loader.hide();
          this.firebase.getDownloadUrl(uploadedFile.name).then((downloadUrl: string) => {
            //save that url for later
            appSettings.setString('finalUrl', downloadUrl);
          });
          this._router.navigate(['/soundcloud']);
        }, (error: any) => {
          this.loader.hide();
          alert('File upload error: ' + error);
        });

  }

  public clearDrawing(args: any) {

    var options = {
      title: 'Clear drawing?',
      message: 'Do you want to clear your drawing and start over?',
      okButtonText: 'Yes',
      cancelButtonText: 'No'
    };
    dialogs.confirm(options).then((result: boolean) => {
      if (result === true) {
        var pad = this.DrawingPad.nativeElement;
        pad.clearDrawing();
      }
    });

  }

  public selectColor() {

    this.picker.show(this.penColor$.getValue(), 'HEX').then((result: any) => {
      console.log(result);
      this.ngZone.run(() => {
        this.penColor$.next(result);
      });
    }).catch((err: any) => {
      console.log(err);
    });

  }

  public widthChange(e: any) {
    if (e && e.value) {
      // since we throttle this callback, run in zone to be safe
      this.ngZone.run(() => {
        this.penWidth$.next(Math.floor(e.value));
      });
    }
  }
  
}
