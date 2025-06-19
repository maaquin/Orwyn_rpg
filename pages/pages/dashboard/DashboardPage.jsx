/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";

export const DashboardPage = () => {

    return (
        <div className="dashboard-container">
            <Content/>
        </div>
    );
};
