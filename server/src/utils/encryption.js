const crypto = require("crypto")

const ivSize = 16
const saltSize = 64
const keySize = 32
const defaultHashingAlgorithm = "shake256"
const defaultEncryptionAlgorithm = "aes-256-gcm"

let parsedConfigKey = undefined

/**
 * @return {Buffer}
 */
const parseConfigKey = () => {
  if (parsedConfigKey) return parsedConfigKey
  const configKey = process.env["ENCRYPTION_KEY"] ?? (() => {
    throw new Error("No encryption key provided")
  })()
  parsedConfigKey = parseKey(configKey)
  return parsedConfigKey
}

/**
 * @param {Buffer|string} key
 * @return {Buffer}
 */
const parseKey = (key) => {
  if (Buffer.isBuffer(key)) {
    if (key.length !== keySize) throw new Error(`Key size should be ${keySize} bytes, but was ${key.length}`)
    return key
  }

  const utf8Key = Buffer.from(key, 'utf8')
  if (utf8Key.length === keySize) return utf8Key

  const base64Key = Buffer.from(key, 'base64')
  if (base64Key.length === keySize) return base64Key

  const hexKey = Buffer.from(key, 'hex')
  if (hexKey.length === keySize) return hexKey

  throw new Error(`Key size should be ${keySize} bytes, but was utf8: ${utf8Key.length}, base64: ${base64Key.length}, hex: ${hexKey.length}`)
}

/**
 *
 * @param {Buffer|*} input
 * @return {Buffer}
 */
const convertInputToBuffer = (input) => {
  let stringBuffer
  if (Buffer.isBuffer(input)) {
    stringBuffer = input
  } else {
    stringBuffer = Buffer.from(input)
  }
  return stringBuffer
}

/**
 *
 * @param {Buffer|string|*} input
 * @return {Buffer}
 */
const convertInputToHashBuffer = (input) => {
  let hashBuffer
  if (Buffer.isBuffer(input)) {
    hashBuffer = input
  } else {
    if (typeof input === "string") {
      hashBuffer = Buffer.from(input, "base64")
    } else {
      hashBuffer = input.digest()
    }
  }
  return hashBuffer
}

/**
 * @param {number} size
 * @return {Buffer}
 */
const generateRandomBuffer = (size = saltSize) => {
  const buffer = Buffer.alloc(size)
  crypto.webcrypto.getRandomValues(buffer)
  return buffer
}

/**
 * @param {Buffer|string} raw
 * @param {Buffer|string?} salt
 * @return {Buffer}
 */
const generateHash = (raw, salt) => {
  let buffer = convertInputToBuffer(raw)
  if (salt) {
    buffer = Buffer.concat([buffer, convertInputToBuffer(salt)])
  }
  const hash = crypto.createHash(process.env["HASHING_ALGORITHM"] ?? defaultHashingAlgorithm)
  hash.update(buffer)
  return hash.digest()
}

/**
 *
 * @param {string} raw
 * @return {Buffer}
 */
const encryptPassword = (raw) => {
  const salt = generateRandomBuffer(saltSize)
  const hash = generateHash(raw, salt)
  return encryptData(Buffer.concat([hash, salt]), parseConfigKey())
}

/**
 * @param {string} raw
 * @param {Buffer} encrypted
 * @return {boolean}
 */
const matchPassword = (raw, encrypted) => {
  const hashAndSalt = decryptData(encrypted, parseConfigKey())
  const hashLength = hashAndSalt.length - saltSize
  const hash = hashAndSalt.subarray(0, hashLength)
  const salt = hashAndSalt.subarray(hashLength)
  return matchHash(raw, hash, salt)
}

/**
 * @param {string|Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array|Int8Array|Int16Array|Int32Array|BigUint64Array|Float32Array|Float64Array|DataView} data
 * @param {Buffer|string} key
 * @return {Buffer}
 */
const encryptData = (data, key) => {
  key = parseKey(key)
  const iv = generateRandomBuffer(ivSize)
  const cipher = crypto.createCipheriv(process.env["ENCRYPTION_ALGORITHM"] ?? defaultEncryptionAlgorithm, key, iv)
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()])
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted])
}

/**
 * @param {Buffer} data
 * @param {Buffer|string} key
 * @return {Buffer}
 */
const decryptData = (data, key) => {
  key = parseKey(key)
  const iv = data.subarray(0, ivSize)
  const authTag = data.subarray(ivSize, ivSize + 16)
  const payload = data.subarray(ivSize + 16)
  const decipher = crypto.createDecipheriv(process.env["ENCRYPTION_ALGORITHM"] ?? defaultEncryptionAlgorithm, key, iv)
  decipher.setAuthTag(authTag)
  return Buffer.concat([decipher.update(payload), decipher.final()])
}

/**
 * @param {string} string
 * @param {Buffer} hash
 * @param {Buffer?} salt
 */
const matchHash = (string, hash, salt) => {
  const stringHash = generateHash(string, salt)
  return stringHash.equals(hash)
}

module.exports = {
  encryptData,
  decryptData,
  encryptPassword,
  matchPassword,
  generateHash,
  matchHash
}
