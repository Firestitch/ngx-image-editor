import Cropper from 'cropperjs';

const DEFAULT_CROPPER_OPTIONS = {
  zoomable: false,
  zoomOnWheel: false,
  autoCrop: true,
  background: true,
  autoCropArea: 1
};

export class EditorConfig {
  public width: string;
  public height: string;
  public cropperOptions: Cropper.Options;

  constructor(data: any = {}) {
    this.width = data.width || 'auto';
    this.height = data.height || 'auto';

    // global cropper options
    this.cropperOptions = Object.assign({}, data.cropperOptions, DEFAULT_CROPPER_OPTIONS);
  }

}
