export class InvalidEmailError extends Error {
  constructor(identifier: string) {
    super(`This "${identifier}" is invalid.`)
  }
}