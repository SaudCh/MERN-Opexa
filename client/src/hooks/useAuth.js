import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const Login = (user) => {
        setUser({
            email: user.email,
            id: user.userId,
            name: user.name
        });
        setToken(user.token);

        localStorage.setItem("user", JSON.stringify({
            email: user.email,
            id: user.userId,
            name: user.name
        }));

        localStorage.setItem("token", user.token);
    };

    const Logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
            console.log(storedUser, storedToken);
        }

    }, []);


    return { user, Login, Logout, token };
}
