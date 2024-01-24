import React, { useEffect } from "react";
import Routes from "./routes";
import { useState, createContext, SetStateAction } from "react";
import { AppState, useAuth } from "./components/helpers/AuthProvider";
import axios from "axios";

export default () => {
    const {appState, setAppState} = useAuth();

    const BASE_URL = "http://localhost:3000/";

    function loginUserWithToken(payload: AppState) {
    const config = {
        headers: {
            Authorization: payload.auth_token,
        },
    };
    new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URL}member-data`, config)
            .then((response) => {
                // commit("setUserInfoFromToken", response);
                console.log(response);
                setAppState({
                  auth_token: localStorage.getItem("auth_token"),
                  user: JSON.parse(localStorage.getItem("user_info")!),
                })
                console.log(response)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
    useEffect(() => {
        let localAuthToken = localStorage.auth_token;
        let cookieExists = localAuthToken !== undefined && localAuthToken !== null;
        if (cookieExists) {
            const auth_token = localStorage.getItem('auth_token');
            const authTokenExists = typeof auth_token === 'string' && auth_token !== null;
            if (authTokenExists) {
                // store.dispatch("loginUserWithToken", {auth_token})
                loginUserWithToken(appState!);
            }
        }
    }, []);
    

    return (<>{Routes}</>)
};
