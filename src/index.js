import React, { Component } from "react";
import { Utils } from './utils/utils'
import { ErrorMessage } from './utils/errors'

const defaultContext = {
    lang: ''
}
const defaultFeatures = {
    showErrorOnJsonKeyInvalid: false,
    formatText: true
}
let translations = {};

let currentContext = Object.assign({}, defaultContext)
let currentFeatures = Object.assign({}, defaultFeatures)

const setDefault = function(value) {
    if (typeof value !== 'string') {
        throw new Error(ErrorMessage.ERROR_SET_DEFAULT)
    }
    currentContext.lang = value
}

const setFeatures = function(value, checkEnviroment) {
    if(typeof checkEnviroment === 'function') {
        if(checkEnviroment()) {
            Utils.mergeFeatures(currentFeatures, value)
        }
    } else {
        Utils.mergeFeatures(currentFeatures, value)
    }
}

const setTranslations = function (object) {
    if(object instanceof Object && Object.keys(object).length > 0) {
        translations = object;
    } else {
        throw new Error(ErrorMessage.ERROR_SET_TRANSLATIONS);
    }
}

const LanguageContext = React.createContext();

class Language extends Component {

    state = {}

    constructor(props) {
        super(props);
        if(currentContext.lang === undefined || currentContext.lang === '') {
            throw new Error(ErrorMessage.ERROR_DEFAULT_LANG_MISSING)
        } else if (props.lang !== undefined && props.lang !== '' && props.lang !== currentContext.lang) {
            this.state.lang = props.lang
        } else {
            this.state.lang = currentContext.lang
        }
        this.state.handleSetLanguage = this.handleSetLanguage
        this.state.get = this.get
    }


    get = (...values) => {
        let isGlobalFile = Utils.isGlobalFile(this.state.lang, ...values)

        let translation = '';
        let pathKey = ''
        let translationObj = {}

        if (!isGlobalFile) {
            translationObj = values[0][this.state.lang];
            pathKey = values[1];
        } else {
            translationObj = translations[this.state.lang];
            pathKey = values[0];
        }

        let translationKeys = pathKey.split('.')
        translationKeys.forEach((key) => {
            if(currentFeatures.showErrorOnJsonKeyInvalid) {
                if (!(key in translationObj)) {
                    throw new Error(ErrorMessage.ERROR_KEY_NOT_AVAILABLE);
                }
            }
            const temp = translationObj[key];
            if (Utils.isObject(temp)) {
                translationObj = temp;
            } else if (Utils.isString(temp)) {
                if (currentFeatures.formatText) {
                    let valuesFormatFeature = Utils.getValuesFormatFeature(isGlobalFile, ...values)
                    translation = Utils.format(temp, valuesFormatFeature);
                } else {
                    if (!isGlobalFile) {
                        if (values[2] !== undefined) {
                            throw new Error(ErrorMessage.ERROR_FEATURE_FORMAT)
                        }
                    } else {
                        if (values[1] !== undefined) {
                            throw new Error(ErrorMessage.ERROR_FEATURE_FORMAT)
                        }
                    }
                    translation = temp;
                }
            }
        });

        return translation
    }

    handleSetLanguage = (value) => {
        let state = {...this.state}
        state.lang = value
        this.setState(state)
    }

    render() {
        return(
            <LanguageContext.Provider value={this.state}>
                {this.props.children}
            </LanguageContext.Provider>
        )
    }
}

Language.Consumer = LanguageContext.Consumer

export { Language, setDefault, setFeatures, setTranslations }