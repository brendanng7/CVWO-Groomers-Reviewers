// File: src/context/AuthContext.js
import React, { ReactNode, createContext, useContext, useState } from 'react';

const getters = {
  getAuthToken(state: AppState) {
      return state.auth_token;
  },
  getUserEmail(state: AppState) {
      return state.user?.email;
  },
  getUserID(state: AppState) {
      return state.user?.id;
  },
  isLoggedIn(state: AppState) {
      const loggedOut = state.auth_token == null || state.auth_token == JSON.stringify(null);
      return !loggedOut;
  }
}

interface AppState {
  auth_token: string | null | undefined;
  user: {
    id: number | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
  };
};

interface SignUpState {
  user: {
    email: string | null | undefined;
    password: string | null | undefined;
  }
}

interface LoginState {
  user: {
    email: string | null | undefined;
    password: string | null | undefined;
  }
}

interface AuthContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State and reducer logic here
  const initialState: AppState = {
    auth_token: null,
    user: {
      id: null,
      username: null,
      email: null,
    }
  }

  const [appState, setAppState] = useState<AppState>(initialState);

  return (
    <AuthContext.Provider value={{ appState, setAppState }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { getters, AuthProvider, useAuth, AppState, SignUpState, LoginState };
