const assert = require("chai").assert
require("chai").should()
const expect = require("chai").expect

describe("Test", () => {
  describe('Something1', () => {
    it('should pass', () => {
      const obj = 5
      obj.should.be.equal(5)
    })
  })
})

describe("Test", () => {
  describe('Something1', () => {
    it('should pass', () => {
      const obj = { test: 5 }
      obj.should.be.deep.equal({ test: 5 })
    })
  })
})
