
import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { Sidebar, UserHeader } from "@/fregments";
import { useSavePreviousUrl } from "../hooks";

const PublicLayout = () => {
    const [expanded, setExpand] = useState(true);
    useSavePreviousUrl();
    return (
        <div className="flex h-full lg:min-h-[100vh] md:min-h-[1024px] min-h-[935px] relative">
            <div className={`${expanded ? 'lg:w-72' : 'lg:w-14'} w-14 transform transition-all duration-200 ease-in-out`}></div>
            <div className="flex flex-col h-full min-h-[100vh] fixed top-0 left-0 z-10 bg-white overflow-auto hidden-scroll-bar">
                <Sidebar expanded={expanded} setExpand={setExpand}/>
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
