import React from 'react'

import { Language } from '@react-lang/language'

const App = () => {
  return(
    <Language.Consumer>
      {({ lang }) => (
        <p>{lang}</p>
      )}
    </Language.Consumer>
  );
}

export default App
