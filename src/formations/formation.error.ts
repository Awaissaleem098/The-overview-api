export class FormationNotFound extends Error {
  constructor(publicId: string) {
    super(`Formation with publicId '${publicId}' not found.`);
  }
}
