import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithRouter(component) {
  const customhistory = createMemoryHistory();
  const returnValueRender = render(
    <Router history={ customhistory }>
      {component}
    </Router>,
  );

  return { history: customhistory, ...returnValueRender };
}

export default renderWithRouter;
