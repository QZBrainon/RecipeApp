import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Provider from '../hooks/Provider';
import { act } from 'react-dom/test-utils';

function renderWithRouter(component) {
  const customhistory = createMemoryHistory();
  const returnValueRender = act(() => {
    render(
      <Provider>
      <Router history={ customhistory }>
        {component}
      </Router>
      </Provider>,
    );
  });

  return { history: customhistory, ...returnValueRender };
}

export default renderWithRouter;
