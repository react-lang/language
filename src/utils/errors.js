const ERROR_FEATURE_FORMAT = "Feature format text want's to be used but is disable. see setFeatures() documentation."
const ERROR_SET_DEFAULT = "setDefault function value must be string"
const ERROR_SET_TRANSLATIONS = "setTranslations object is not a instance of an object or it haves 0 keys"
const ERROR_DEFAULT_LANG_MISSING = "default lang is empty, please use setDefault function to set language to a default value"
const ERROR_LANG_INVALID = "The language '{lang}' is invalid. key not exists"
const ERROR_KEY_NOT_AVAILABLE = "the key is not available on object or file"
const ERROR_VALUE_IS_NOT_STRING = "value is not string. please provide a string or a content"
const ERROR_GET_VALUES_INVALID = "Some values given in get(..., value0, value1) are not string."

class ErrorMessage {
    static get ERROR_FEATURE_FORMAT() { return ERROR_FEATURE_FORMAT }
    static get ERROR_SET_DEFAULT() { return ERROR_SET_DEFAULT }
    static get ERROR_SET_TRANSLATIONS() { return ERROR_SET_TRANSLATIONS }
    static get ERROR_DEFAULT_LANG_MISSING() { return ERROR_DEFAULT_LANG_MISSING }
    static get ERROR_LANG_INVALID() { return ERROR_LANG_INVALID }
    static get ERROR_KEY_NOT_AVAILABLE() { return ERROR_KEY_NOT_AVAILABLE }
    static get ERROR_VALUE_IS_NOT_STRING() { return ERROR_VALUE_IS_NOT_STRING }
    static get ERROR_GET_VALUES_INVALID() { return ERROR_GET_VALUES_INVALID }
}

export { ErrorMessage }