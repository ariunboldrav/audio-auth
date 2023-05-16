import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import { userActions } from '_store';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
export { CampaignList };

function CampaignList() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [campaignItems, setCampaignItems] = useState([]);
    const [company, setCompany] = useState([]);


    useEffect(() => {
        dispatch(userActions.getAll());
        handleCampaign()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCampaign() {
        const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/campaign/all`)
        if (data) {
            setCompany(data)
            setCampaignItems(data.campaigns)
        } else {
            // navigate('/login')
        }
    }

    return (
        <div className="">
            <h2 className="text-black mt-2">キャンペーン情報</h2>
            <div className="my-6 relative overflow-x-auto">
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='font-bold'>
                        <td>Company</td>
                        <td>Name</td>
                        <td>Brand Name</td>
                        <td>Created At</td>
                        <td>Status</td>
                    </thead>
                    {campaignItems.map((item) => {
                        return <tr>
                            <td>{company.name}</td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.brand_name}
                            </td>
                            <td>
                                <Moment format="YYYY/MM/DD HH:mm">{item.created_at}</Moment>
                            </td>
                            <td>
                                {item.campaigns ? 'Finished' : 'Draft'}
                            </td>
                        </tr>
                    })}
                </table>
            </div>
        </div>
    );
}
