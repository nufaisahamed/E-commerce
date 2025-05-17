import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom";
import { checkAuthStatus } from "../features/authSlice";
import { useEffect } from "react";

const UserLayout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuthStatus());
    }, []);

    return (
        <div>
            <Header />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default UserLayout;