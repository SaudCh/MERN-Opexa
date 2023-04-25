import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);

    const Login = (user) => {
        setUser({
            email: user.email,
            id: user.userId,
            name: user.name
        });

        localStorage.setItem("user", JSON.stringify({
            email: user.email,
            id: user.userId,
            name: user.name
        }));

    };

    const Logout = () => {
        setUser(null);

        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            setUser(storedUser);
        }

    }, []);

    return { user, Login, Logout };
}
