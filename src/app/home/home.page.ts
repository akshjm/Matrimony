import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectToBeDel=0;
  images:Photo[]=[];
  isActionSheetOpen = false;
  isToastOpen:boolean=false;
  isAlertOpen:boolean=false;
  public actionSheetButtons = [
    {
      text: 'Upload from Gallery',
      icon:'images-outline',
      handler:()=>{
        this.getPicFromGallery();
      }
    },
    {
      text: 'Take a Photo',
      icon:'camera-outline',
      handler:()=>{
        this.getPicFromCamera();
      }
    },
    {
      text: 'WhatsApp your photo to us',
      icon:'logo-whatsapp',
      handler: ()=>{
        this.openWhatsApp();
      }
    },
  ];
  public alertButtons = [
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        this.removeImg(this.selectToBeDel);
      },
      cssClass:'alertYes'
    },
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.selectToBeDel=0;
        this.isAlertOpen=false;
      },
      cssClass:'alertNo'
    },
  ];


  constructor() {}
  openWhatsApp(){
    let url='https://wa.me/9500130495'
    window.location.href = url;
  }

  checkPlatform(){
    if(Capacitor.getPlatform()=='web' )
    return true;
    else{
      return false;
    }
  }

  async getPicFromCamera(){
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Camera,
      resultType: this.checkPlatform()? CameraResultType.DataUrl:CameraResultType.Uri
    });
    this.images.push(image);
    this.isToastOpen=true;
    if(this.checkPlatform()){

      this.images[this.images.length-1].webPath=image.dataUrl;
    }
    console.log(this.images);
  }

  async getPicFromGallery(){
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Photos,
      resultType: this.checkPlatform()? CameraResultType.DataUrl:CameraResultType.Uri
    });
    this.images.push(image);
    this.isToastOpen=true
    if(this.checkPlatform()){

      this.images[this.images.length-1].webPath=image.dataUrl;
    }
    console.log(this.images);
  }
  drop(event: any) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }
  removeImg(index:any){

    this.images.splice(index,1);
  }
}
