import { useState, useEffect } from "react";
import api from "@/apis/axiosConfig";
import { toast } from 'react-toastify';

const useApi = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

      var elementCenterY = rect.top + rect.height / 2 + translateY;

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
  }, [loading]);

  const errorMessageMap = (errorMessages) => {
    const messages = Object.values(errorMessages).flatMap(errors => errors);
    return messages.map((message, index) => <div key={index}>{message}</div>);
  };

  const callApi = async (endpoint, options) => {
    try {
      setLoading(true);
      const response = await api.request(endpoint, options);
      setLoading(false);
      setData(response);

      if (response.successMessage) {
        toast.success(response.successMessage);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response);

      if (error.response?.data?.errors) {
        toast.error(<div>
          {errorMessageMap(error.response.data.errors)}
        </div>);
      } if (error.response?.data?.errorMessage) {
        toast.error(error.response.data.errorMessage);
      }
    }
  };

  return { data, error, loading, callApi };
}

export default useApi
