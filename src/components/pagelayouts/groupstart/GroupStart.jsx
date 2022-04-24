import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const GroupStart = () => {
    const navigate = useNavigate();


    useEffect(() => {
        setTimeout(() => {
            navigate("/groupstarted", { replace: true });
        }, 4000);
    }, [navigate]);

    return (
        <React.Fragment>
            <h1>Creating Group...</h1>
            <h2>Please wait...</h2>
        </React.Fragment>
    )
}

export default GroupStart;