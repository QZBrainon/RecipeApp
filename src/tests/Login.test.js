import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da Tela de Login', () => {
  beforeEach(() => {
    render(<App />);
  })
  test('01. Os campos de email e senha, além do botão "Enter" são renderizados', () => {
    const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const inputPwd = screen.getByLabelText(/password/i);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPwd).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  test('02. Verifica se o botão só é habilitado após email e senha válidos', () => {
    const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const inputPwd = screen.getByLabelText(/password/i);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });

    expect(buttonEnter).toBeDisabled();

    userEvent.type(inputEmail, 'juma_marrua');
    userEvent.type(inputPwd, '123456');

    expect(buttonEnter).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputPwd);

    userEvent.type(inputEmail, 'juma_marrua@pantanal.com.br');
    userEvent.type(inputPwd, '1234567');

    expect(buttonEnter).toBeEnabled();

  });

  test('03. Verifica se é possível clicar no botão', () => {
    const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const inputPwd = screen.getByLabelText(/password/i);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, 'juma_marrua@pantanal.com.br');
    userEvent.type(inputPwd, '1234567');
    userEvent.click(buttonEnter);

  });

})