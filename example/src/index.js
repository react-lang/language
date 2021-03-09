import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Language, setDefault } from '@react-lang/language'

setDefault('en')

ReactDOM.render(
    <React.StrictMode>
        <Language>
            <App />
        </Language>
    </React.StrictMode>,
    document.getElementById('root')
  );
