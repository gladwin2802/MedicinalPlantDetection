import { createContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload, userId: action.payload.userId };
        case 'LOGOUT':
            return { user: null, userId: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        userId: null
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.token) {
            const decodedToken = jwtDecode(storedUser.token);
            console.log('UserId', decodedToken);
            dispatch({ type: 'LOGIN', payload: { ...storedUser, userId: decodedToken._id } });
        }
    }, []);
    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
