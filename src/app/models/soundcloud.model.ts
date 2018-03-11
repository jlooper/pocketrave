export class SoundCloudModel {
  artwork_url: string;
  title: string;
  [key: string]: string;  
  constructor(model?: any) {
    if (model) {
      for (let key in model) {
        this[key] = model[key];
      }
    }
  }
}
