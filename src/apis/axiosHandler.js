import { getAuthentication, setAuthentication, signOut } from "@/helpers/authenHelpers";
import api from "./axiosConfig";
import authenticationEndpoints from "./enpoints/authentication";
import { ResponseCode } from "@/constants";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


let isRefreshing = false;
let refreshQueue = [];

const recallApi = async (rememberToken) => {
  try {
    const newAuth = await api.post(authenticationEndpoints.refresh, { remember_token: rememberToken });

    if (!newAuth.original?.error) {
      await setAuthentication(newAuth.original);
    }

    refreshQueue.forEach((request) => request());
    
    refreshQueue = [];

    return api.request(error.config); 
  } catch (refreshError) {
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

const queueRequestPush = (error) => {
  return new Promise((resolve, reject) => {
    refreshQueue.push(() => {
      try {
        resolve(api.request(error.config));
      } catch (queueError) {
        reject(queueError);
      }
    });
  });
}

const errorHandler = async (error) => {
  if (error?.code === 'ERR_NETWORK') {
    toast.error("Your network is not working");
  }

  if (error.response?.status === ResponseCode.UNAUTHEN) {
    const authen = getAuthentication();
    if(!authen) {
      return Promise.reject(error);
    }

    const rememberToken = getAuthentication()?.remember_token;
    const navigate = useNavigate();

    if (rememberToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        recallApi(rememberToken);
        return queueRequestPush(error);
      } else {
        return queueRequestPush(error);
      }
    }
    signOut();
    navigate('/login');
  }

  return Promise.reject(error);
};

const successHandler = (response) => {
  return response.data;
};

export { errorHandler, successHandler };
