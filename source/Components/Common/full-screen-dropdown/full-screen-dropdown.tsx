import ArrowsPointingInIcon from '@heroicons/react/24/solid/ArrowsPointingInIcon';
import ArrowsPointingOutIcon from '@heroicons/react/24/solid/ArrowsPointingOutIcon';

import React, { useState } from 'react';

const FullScreenDropdown = () => {
  /*
  mode
  */
  const [isFullScreenMode, setIsFullScreenMode] = useState(true);

  /*
  full screen
  */
  const toggleFullscreen = () => {
    let document: any = window.document;
    document.body.classList.add("fullscreen-enable");

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      setIsFullScreenMode(false);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      setIsFullScreenMode(true);
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }

    // handle fullscreen exit
    const exitHandler = () => {
      if (
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      )
        document.body.classList.remove("fullscreen-enable");
    };
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
  };
  return (
    <React.Fragment>
      <div className="flex">
        <button
          onClick={toggleFullscreen}
          type="button"
          className="text-white"
        >
          {
            isFullScreenMode &&
            <ArrowsPointingOutIcon className="w-5 h-5" />
          }
          {
            !isFullScreenMode &&
            <ArrowsPointingInIcon className="w-5 h-5" />
          }
        </button>
      </div>
    </React.Fragment>
  );
};

export default FullScreenDropdown;