import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = localStorage.getItem('user');
  const userEmail = JSON.parse(user);
  const history = useHistory();

  const logoutHandleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <Header />
      <h1 data-testid="profile-email">{ userEmail.email }</h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutHandleClick }
      >
        Logout
      </button>
      <Footer />
    </main>
  );
}

export default Profile;
