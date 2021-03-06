import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import { Routes } from '../src/routes'

const App: React.FC = () => (
  // BrowserRouter - tratar as rotas no browser
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
)

export default App;
