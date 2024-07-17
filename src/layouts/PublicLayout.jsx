
import { Outlet } from "react-router-dom";
import { GuestComponent } from "@/fregments";
import { useSavePreviousUrl } from "../hooks";

const PublicLayout = () => {
    useSavePreviousUrl();
    return (
        <div>
            <GuestComponent>
                <Outlet></Outlet>
            </GuestComponent>
        </div>
    )
}

export default PublicLayout
