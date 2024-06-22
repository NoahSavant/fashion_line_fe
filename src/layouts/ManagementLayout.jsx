
import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { Sidebar, UserHeader } from "@/fregments";


const PublicLayout = () => {
    return (
        <div className="flex h-full min-h-[100vh] relative">
            <div className="lg:w-0 w-14"></div>
            <div className="flex flex-col h-full min-h-[100vh] lg:relative absolute top-0 left-0 z-10 bg-white">
                <Sidebar/>
            </div>
            <div className="w-full flex flex-col bg-[#f7f8fa]">
                <div className="flex justify-end px-5 pt-2 pb-3">
                    <UserHeader/>
                </div>
                <div className="flex flex-col">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default PublicLayout
