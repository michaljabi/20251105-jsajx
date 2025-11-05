import { addNumbers, averageFrom } from './main/helpers/my-things.js'
import { firstLetterToUpper } from './main/tools/tool-1.js'
import { countWords } from './main/tools/tool-2.js'
import someUtil, { toSecondPower } from './main/utils/some-util.js'

export const stringHelper = {
    lastLetter: someUtil.lastLetter,
    numberOfChars: someUtil.numberOfChars,
    countWords: countWords,
    capitalize: firstLetterToUpper,
}


export const numberHelper = {
    toSecondPower: toSecondPower,
    addNumbers: addNumbers,
    averageFrom: averageFrom,
}