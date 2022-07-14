import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testes da Tela de Login', () => {
  test('01. Os campos de email e senha, além do botão "Enter" são renderizados', () => {
    render(<App />);
    const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const inputPwd = screen.getByLabelText(/password/i);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPwd).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

})