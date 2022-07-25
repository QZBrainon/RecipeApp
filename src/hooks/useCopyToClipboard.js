import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function useCopyToClipBoard(isLinkInClipBoard) {
  function toggleClipboardMessage() {
    return (
      (isLinkInClipBoard)
        ? <p>Link copied!</p>
        : <img src={ shareIcon } alt="compartilhar" />
    );
  }

  function toggleClipMessage(index) {
    return (
      (isLinkInClipBoard)
        ? <p>Link copied!</p>
        : (
          <img
            src={ shareIcon }
            alt="compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        )
    );
  }

  const useCopyToClipBoardData = { toggleClipboardMessage, toggleClipMessage };

  return useCopyToClipBoardData;
}

export default useCopyToClipBoard;
