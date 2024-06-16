import { RouterProvider } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css'
import router from "@/routes";
import '@/App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'suneditor/dist/css/suneditor.min.css';
import 'rsuite/Button/styles/index.less';
import 'rsuite/ButtonToolbar/styles/index.less';
import React, { useEffect, useRef } from 'react';

const App = () => {
  useEffect(() => {
    function getTranslateValues(el) {
      var style = window.getComputedStyle(el);
      var transform = style.transform || style.webkitTransform; // Get the transform property

      if (!transform || transform === 'none') {
        return { translateX: 0, translateY: 0 };
      }

      var matrix = transform.match(/\((.*?)\)/); // Extracts the matrix value inside parentheses
      if (matrix) {
        var matrixValues = matrix[1].split(','); // Split matrix values into an array
        if (matrixValues.length >= 6) {
          var translateX = parseFloat(matrixValues[4]);
          var translateY = parseFloat(matrixValues[5]);
          return { translateX: translateX, translateY: translateY };
        }
      }

      return { translateX: 0, translateY: 0 };
    }

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      var { translateX, translateY } = getTranslateValues(el);
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Calculate the center of the element vertically
      var elementCenterY = rect.top + rect.height / 2 + translateY;

      // Return true if the center of the element is within the viewport height
      return elementCenterY >= 0 && elementCenterY <= viewportHeight;
    }

    function checkInview() {
      document.querySelectorAll('.animation-iv').forEach(function (element) {
        if (isElementInViewport(element)) {
          element.classList.add('in-view');
        } else {
          if (element.classList.contains('anmt-repeat')) {
            element.classList.remove('in-view');
          }
        }
      });
    }

    checkInview();

    window.addEventListener('scroll', checkInview);
    window.addEventListener('resize', checkInview);

    return () => {
      window.removeEventListener('scroll', checkInview);
      window.removeEventListener('resize', checkInview);
    };

  }, []);

  return (
    <>
      <RouterProvider router={ router} />
      <ToastContainer 
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App
