import { RouterProvider } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css'
import router from "@/routes";
import '@/App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'suneditor/dist/css/suneditor.min.css';
import 'rsuite/Button/styles/index.less';
import 'rsuite/ButtonToolbar/styles/index.less';
import React, { useEffect } from 'react';
import { CartContextProvider } from '@/contexts/CartContext';
import { PopupConfirmContextProvider } from '@/contexts/PopupConfirmContext';

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

    document.querySelectorAll('.container-scroll').forEach(function (container) {
      container.querySelectorAll('.right-scroll').forEach(function (rightScroll) {
        rightScroll.addEventListener('click', function () {
          var listScroll = container.querySelector('.list-scroll');
          var scrollAmount = listScroll.clientWidth;

          var targetScrollLeft = listScroll.scrollLeft + scrollAmount + 20;

          if (targetScrollLeft > listScroll.scrollWidth - listScroll.clientWidth) {
            targetScrollLeft = 0;
          }

          listScroll.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          });
        });
      });

      container.querySelectorAll('.left-scroll').forEach(function (leftScroll) {
        leftScroll.addEventListener('click', function () {
          var listScroll = container.querySelector('.list-scroll');
          var scrollAmount = listScroll.clientWidth; // Amount to scroll (use clientWidth for visible width)

          var targetScrollLeft = listScroll.scrollLeft - scrollAmount -20;

          if (targetScrollLeft < 0) {
            targetScrollLeft = listScroll.scrollWidth - listScroll.clientWidth;
          }

          listScroll.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          });
        });
      });

      if (container.classList.contains('auto-scroll')) {
        setInterval(function () {
          var listScroll = container.querySelector('.list-scroll');
          var scrollAmount = listScroll.clientWidth;

          var targetScrollLeft = listScroll.scrollLeft + scrollAmount + 20;

          if (targetScrollLeft > listScroll.scrollWidth - listScroll.clientWidth) {
            targetScrollLeft = 0;
          }

          listScroll.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          });
        }, 5000);
      }
    });

    checkInview();

    window.addEventListener('scroll', checkInview);
    window.addEventListener('resize', checkInview);

    return () => {
      window.removeEventListener('scroll', checkInview);
      window.removeEventListener('resize', checkInview);
    };

  }, []);
  
  return (
      <PopupConfirmContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
          <ToastContainer
            autoClose={5000}
            pauseOnFocusLoss={false}
            closeOnClick
            pauseOnHover
          />
        </CartContextProvider>
      </PopupConfirmContextProvider>
  );
}

export default App
