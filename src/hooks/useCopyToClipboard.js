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

  const useCopyToClipBoardData = { toggleClipboardMessage };

  return useCopyToClipBoardData;
}

export default useCopyToClipBoard;
