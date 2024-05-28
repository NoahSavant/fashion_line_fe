import { useEffect } from "react";
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Panel, Carousel } from "rsuite";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {

        if (searchParams.has('code') && !searchParams.has('state')) {
            navigate('/signup?code=' + searchParams.get('code'));
            return;
        }

        if (searchParams.has('code') && searchParams.has('state')) {
            navigate('/signup-employee?code=' + searchParams.get('code') + "&state=" + searchParams.get('state'));
            return;
        }
    }, []);

    return (
        <div>
            <Carousel autoplay height="400">
                <div></div>
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1"/>
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2"/>
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3"/>
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4"/>
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"/>
            </Carousel>
        </div>
    )

}

export default Home
