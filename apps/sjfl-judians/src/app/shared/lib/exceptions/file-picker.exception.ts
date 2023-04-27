export class FilePickerCancelled extends Error {
  constructor() {
    super('pickFiles canceled.');
  }
}

export class GalleryPickCancelled extends Error {
  constructor() {
    super('User cancelled photos app');
  }
}
