# @react-lang/language

This is a React library for changing the language within your application.

We offer several advantages over other existing libraries:

- Great flexibility in the code. for example using the function [(setTranslations)](https://github.com/martuuamengual/-react-lang-language#setTranslations) `setTranslations({ en })` you can define your language files, however, **to maintain the scalability of your app**, it is better to use the concept of [Encapsulation](https://github.com/martuuamengual/-react-lang-language#Encapsulation)
- Enviroment feature for showing or not errors in production, suppose we need to show serious errors in the development environment, but in production we do not want to show them, for example an error of some key that does not exist in our language file, for that we will use `setFeatures()` which in addition to enable any feature, we can define in which environment it can be enabled. See [setFeatures](https://github.com/martuuamengual/-react-lang-language#setFeatures) for more info.
- Format text values included in translations files. If you need a translation with a dynamic value, for example you need to print this text `Hi there my name is: Jhon`, you can do this by `Hi there my name is: {name}` or `Hi there my name is: {0}`. For more info see [Format Text Feature](https://github.com/martuuamengual/-react-lang-language#Format-Text-Feature)
- We use React Context, therefore this allows us to use **Redux** for our app **without doing any refactor**

[See Documentation](https://github.com/martuuamengual/-react-lang-language#Documentation) <br />
[See Incoming New features](https://github.com/martuuamengual/-react-lang-language#Incoming-New-Features)

**If someone want's to contribute to develop more features, please see [How to contribute](https://github.com/martuuamengual/-react-lang-language#How-to-contribute)**

## Installation

**NPM**

```console
npm install @react-lang/language
```

**Yarn**

```console
yarn install @react-lang/language
```

## Getting Started

First we need to create the languages files, for example we create the `en.json`

```json
{
  "message": "Hello world how are you?"
}
```

Then we need to setup this files, we recomend do that in you're `index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import { Language, setDefault, setTranslations } from '@react-lang/language'
import en from './en.json'
import en from './es.json'

setDefault('en')
setTranslations({ en, es })

ReactDOM.render(
  <React.StrictMode>
    <Language>
      <App />
    </Language>
  </React.StrictMode>,
  document.getElementById('root')
)
```

Now we need to get the information of the language files, to do that we have to make some changes to my `App.jsx`. We use [React Context](https://es.reactjs.org/docs/context.html) for this.

```jsx
import { Language } from '@react-lang/language'

function App() {
  return (
    <Language.Consumer>
      {({ get, handleSetLanguage, lang }) => <p>{get('message')}</p>}
    </Language.Consumer>
  )
}
```

For more info of the Consumer functions see [Consumer Functions](https://github.com/martuuamengual/-react-lang-language#Consumer-functions)

## Format Text Feature

By default this feature is enabled, if yo want to disable it you can use [setFeatures](https://github.com/martuuamengual/-react-lang-language#setFeatures). If you disable this feature and someone uses it `get('message', name)`, this throws an error message `Error: feature format text want's to be used but is disable. see setFeatures() documentation.`

Suppose that we need to print this text `Hi there my name is: Jhon Felix`, what we need to do is write in our json something like this:

`en.json`

```json
{
  "message": "Hi there my name is: {name} {surname}"
}
```

or

```json
{
  "message": "Hi there my name is: {0} {1}"
}
```

Once we have our json assembled, we will proceed to assemble the react component or function

`full-example.jsx`

```jsx
import { Language } from '@react-lang/language'

function ShowMessage() {
  let name = 'Jhon'
  let surname = 'Felix'

  return (
    <Language.Consumer>
      {({ get }) => <p>{get('message', { name: name, surname: surname })}</p>}
    </Language.Consumer>
  )
}
```

or

```jsx
import { Language } from '@react-lang/language'

function ShowMessage() {
  let name = 'Jhon'
  let surname = 'Felix'

  return (
    <Language.Consumer>
      {({ get }) => <p>{get('message', name, surname)}</p>}
    </Language.Consumer>
  )
}
```

## Encapsulation

The concept of encapsulation, that we use, is that all variables consumed for a component must be inside it and nobody can modify it. So with that concept if we want to create for example a UserInfo component we need to specify the language content values inside UserInfo. Lets create it

```jsx
// dont forget the imports :)

export default class UserInfo extends Component {
  state = {}

  content = {
    en: {
      message: 'Hello world how are you?'
    },
    es: {
      message: 'Hola mundo como estas?'
    }
  }

  render() {
    return (
      <Language.Consumer>
        {({ get }) => <p>{get(this.content, 'message')}</p>}
      </Language.Consumer>
    )
  }
}
```

## Documentation

We use [React Context](https://es.reactjs.org/docs/context.html) if you want more info read it.

### Language

This is the Context class that returns a provider and consumer.

Usage of `Provider`

```jsx
import { Language } from '@react-lang/language'

ReactDOM.render(
  <React.StrictMode>
    <Language>
      <App />
    </Language>
  </React.StrictMode>,
  document.getElementById('root')
)
```

If you want to override lang for a specific provider you can use the prop `lang=`. If lang is not passed as prop, the language setted in `setDefault()` will be taken

```jsx
<Language lang="fr">
    <App />
</Language>
);
```

Usage of `Consumer`

```jsx
import { Language } from '@react-lang/language'

function SomeComponent() {
  return (
    <Language.Consumer>
      {({ get }) => <p>{get('someKey')}</p>}
    </Language.Consumer>
  )
}
```

### setTranslations

This function sets the content of the languages files passed inside `{}`

Usage

```jsx
import { setTranslations } from '@react-lang/language'
import en from './en.json'

setTranslations({ en })
```

### setFeatures

This function is **optional**, can enable or disable some features. It also has an enviroment function **optional**, that if return `true`, the features passed in the first variable are set. if return `false` these features are not set. In the example below, only when the `env` is `'dev'` will the `showErrorOnJsonKeyInvalid` be set to `true`. For more info of Features see [Features Keys](https://github.com/martuuamengual/-react-lang-language#Features-Keys)

Usage

```jsx
import { setFeatures } from '@react-lang/language'

setFeatures({ formatText: false })

setFeatures({ showErrorOnJsonKeyInvalid: true }, () => {
  if (env === 'dev') {
    return true
  } else {
    return false
  }
})
```

or

```jsx
import { setFeatures } from '@react-lang/language'

setFeatures({ showErrorOnJsonKeyInvalid: true })
```

## Consumer functions

[`get`](https://github.com/martuuamengual/-react-lang-language#get)
[`handleSetLanguage`](https://github.com/martuuamengual/-react-lang-language#handleSetLanguage)
[`lang`](https://github.com/martuuamengual/-react-lang-language#lang)

### get

This function gets the text of languages files or content.

Usage

```json
{
  "en": {
    "user": {
      "name": "Jhon",
      "surname": "Felix"
    }
  }
}
```

```jsx
<Language.Consumer>
  {({ get }) => (
    <p>
      {get('user.name')} {get('user.surname')}
    </p>
  )}
</Language.Consumer>
```

Usage with [Encapsulation](https://github.com/martuuamengual/-react-lang-language#Encapsulation)

```jsx
<Language.Consumer>
  {({ get }) => <p>{get(this.content, 'someKey')}</p>}
</Language.Consumer>
```

or

```jsx
<Language.Consumer>
  {({ get }) => <p>{get(this.content, 'someKey', { key: value })}</p>}
</Language.Consumer>
```

Usage with [Format Text Feature](https://github.com/martuuamengual/-react-lang-language#Format-Text-Feature)

```jsx
<Language.Consumer>
  {({ get }) => <p>{get('someKey', { key: value })}</p>}
</Language.Consumer>
```

or

```jsx
<Language.Consumer>
  {({ get }) => <p>{get('someKey', value0, value1)}</p>}
</Language.Consumer>
```

or

```jsx
<Language.Consumer>
  {({ get }) => <p>{get('someKey', ...values)}</p>}
</Language.Consumer>
```

### handleSetLanguage

This function sets the language given in value

Usage

```jsx
<Language.Consumer>
{({ get, handleSetLanguage }) => (
    <p>{get('someKey')}</p>
    <button onClick={() => handleSetLanguage('fr')}>Change language to FR</button>
)}
</Language.Consumer>
```

### lang

This is the current lang value

Usage

```jsx
<Language.Consumer>
{({ handleSetLanguage, lang }) => (
    <p>Current language is: {lang}</p>
    <button onClick={() => handleSetLanguage('fr')}>Change language to FR</button>
)}
</Language.Consumer>
```

## Features Keys

- `showErrorOnJsonKeyInvalid`: Shows an error when making **'get(value)'** the _value_ passed isn't inside the **'en.json'**
- `formatText`: Allows the feature [Format Text](https://github.com/martuuamengual/-react-lang-language#Format-Text-Feature). If this feature is disable and someone want to use it, throws an error.

# Incoming New Features

- [ ] Cookies to remember the state of the language setted

## How to contribute

If you want to contribute to this proyect, follow this steps.

1. Fork this proyect
1. Make the changes
1. Create a pull request to `dev` branch. (if we need to merge maybe i call you to make it together if necesary)

## Contact

<img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" width="20"> martuu.amengual@gmail.com <br />
<img src="https://www.svgrepo.com/show/305955/discord.svg" width="20"> Martu16#9882

### 2021
