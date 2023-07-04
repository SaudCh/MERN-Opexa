import { Outlet, useNavigate } from "react-router-dom";
import './index.css'

import React, { useState } from "react";

import ProfileHeader from "../components/profileHeader";

export default function ProfileLayout() {

    return (
        <div>
            <ProfileHeader />
            <Outlet />
        </div>
    );
}
