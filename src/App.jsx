import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { PrivateRoute } from '_components';
import { Login, Campaign, Register } from 'pages';
import { Company } from 'pages/Company/Company';
import Layout from '_components/layouts/Layout';
import { Specification } from 'pages/Specification/Specification';
import { Content } from 'pages/Content/Content';
import { FileUpload } from './pages/FileUpload/FileUpload';
import { CampaignList } from 'pages/Campaign/CampaignList';
import { CampaignDetail } from 'pages/Campaign/CampaignDetail';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    function authPage(page) {
        return <PrivateRoute>{page}</PrivateRoute>
    }

    return (
        <div className="app-container bg-gray-50 h-screen">
            <Routes>
                <Route path="/" element={<Layout><Register /></Layout>} />
                <Route path="/company" element={authPage(<Company />)} />
                <Route path="/campaign" element={authPage(<Campaign />)} />
                <Route path="/campaign/detail" element={authPage(<CampaignDetail />)} />
                <Route path="/campaigns" element={authPage(<CampaignList />)} />
                <Route path="/spec" element={authPage(<Specification />)} />
                <Route path="/content" element={authPage(<Content />)} />
                <Route path="/files" element={authPage(<FileUpload />)} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}
