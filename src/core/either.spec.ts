import { Either, left, right } from "./either";

function doSomethin(shouldSuccess: boolean): Either<string, string> {
  if(shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

describe('Either', () => {
  it('should return success', () => {
    const result = doSomethin(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  it('should return error', () => {
    const result = doSomethin(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})