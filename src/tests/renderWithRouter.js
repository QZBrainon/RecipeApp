import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Provider from '../hooks/Provider';

function renderWithRouter(component) {
  const customhistory = createMemoryHistory();
  const returnValueRender = render(
    <Provider>
    <Router history={ customhistory }>
      {component}
    </Router>
    </Provider>,
  );

  return { history: customhistory, ...returnValueRender };
}

export default renderWithRouter;
