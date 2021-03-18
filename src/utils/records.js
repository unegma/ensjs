import { addressUtils } from '@0xproject/utils'
import { validateContent } from './contents'

/**
 * @typedef { "address" | "content" | "oldcontent" } recordType
 */

/**
 * Validate Record
 * @param {Object} record
 * @param {recordType} record.type The record type
 * @param {string} record.value The record value
 * @throws {Error} will throw an error if unrecognised record type
 * @returns {boolean|any}
 */
export function validateRecord(record) {
  // todo removeme Info: using typescript means that we can verify record.type whilst we are coding/compile time instead of at run time
  if (!record.type) {
    return false
  }

  const { type, value } = record

  if (type == 'content' && record.contentType === 'oldcontent') {
    return value.length > 32
  }

  switch (type) {
    case 'address':
      return addressUtils.isAddress(value)
    case 'content':
      return validateContent(value) // todo wil this ever be reached? if type is 'content', the above if statement will be triggered
    default:
      throw new Error('Unrecognised record type')
  }
}

/**
 * @typedef { "contenthash" } contentType
 */

/**
 * Get Place Holder
 * @param {recordType} recordType
 * @param {contentType} contentType
 * @returns {string}
 */
export function getPlaceholder(recordType, contentType) {
  switch (recordType) {
    case 'address':
      return 'Enter an Ethereum address'
    case 'content':
      if (contentType === 'contenthash') {
        return 'Enter a content hash (eg: ipfs://..., bzz://..., onion://..., onion3://...)'
      } else {
        return 'Enter a content'
      }
    default:
      return ''
  }
}

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'
