export class TutorialNotFound extends Error {
  constructor(publicId: string) {
    super(`Tutorial with publicId '${publicId}' not found.`);
  }
}
