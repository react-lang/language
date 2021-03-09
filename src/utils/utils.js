
import { ErrorMessage } from './errors'

class Utils {

    static mergeFeatures(current, toMerge) {
        Object.keys(toMerge).forEach((toMergekey) => {
            let valuetoMerge = toMerge[toMergekey]
            if (!(toMergekey in current)) {
                throw new Error(ErrorMessage.ERROR_KEY_NOT_AVAILABLE);
            }
            current[toMergekey] = valuetoMerge
        })
    }

    static isGlobalFile(lang, ...values) {
        let value = values[0]

        if (Utils.isParamObject('0', ...values)) {
            if (lang in value) {
                return false;
            } else {
                throw new Error(Utils.format(ErrorMessage.ERROR_LANG_INVALID, { lang: lang }));
            }
        } else if (Utils.isNotString(value)) {
            throw new Error(ErrorMessage.ERROR_VALUE_IS_NOT_STRING);
        }


        return true;
    }

    static isParamObject(index, ...values) {
        for (let k in values) {
            let value = values[k]
            let isIndexParam = (k === index)
            if(isIndexParam) {
                if (Utils.isObject(value)) {
                    return true;
                }
            }
        }
        return false;
    }

    static isObject(value) {
        if (typeof value === 'object') {
            return true;
        } else {
            return false;
        }
    }

    static isString(value) {
        if (typeof value === 'string') {
            return true;
        } else {
            return false;
        }
    }

    static isNotString(value) {
        return (!Utils.isString(value))
    }

    static getValuesFormatFeature(isGlobalFile, ...values) {
        if (!isGlobalFile) {
            if (Utils.isParamObject('2', ...values)) {
                return values[2]
            } else {
                let array = []

                for (let key in values) {
                    let value = values[key]
                    if(key !== '0' && key !== '1' && value !== undefined) {
                        if(Utils.isNotString(value)) {
                            throw new Error(ErrorMessage.ERROR_GET_VALUES_INVALID)
                        }
                        array.push(value)
                    }
                }
                return array
            }
        } else {
            if (Utils.isParamObject('1', ...values)) {
                return values[1]
            } else {
                let array = []

                for (let key in values) {
                    let value = values[key]
                    if(key !== '0' && value !== undefined) {
                        if(Utils.isNotString(value)) {
                            throw new Error(ErrorMessage.ERROR_GET_VALUES_INVALID)
                        }
                        array.push(value)
                    }
                }
                return array
            }
        }
    }

    static format(value, values) {
        for (let k in values) {
            value = value.replace("{" + k + "}", values[k])
        }
        return value;
    }
}

export { Utils }