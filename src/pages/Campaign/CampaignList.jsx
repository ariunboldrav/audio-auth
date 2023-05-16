import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import { userActions } from '_store';
import { NavLink, useNavigate } from 'react-router-dom';
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
            setCampaignItems(data)
        } else {
            // navigate('/login')
        }
    }

    return (
        <div className="">
            <h2 className="text-black mt-2">Campaign List</h2>
            <div className="my-6 relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-sm'>
                        <tr>
                            <th scope="col" className="px-6 py-2">Name</th>
                            <th scope="col" className="px-6 py-2">Brand Name</th>
                            <th scope="col" className="px-6 py-2">Created At</th>
                            <th scope="col" className="px-6 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignItems.map((item, i) => {
                            return (
                                <tr className={`${i % 2 == 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-primary border-b dark:bg-gray-900 dark:border-gray-700`} key={i}>
                                    <td className="px-6 py-2">
                                        <NavLink className={`hover:text-primary`} to={`campaign/detail/${item.id}`}>
                                            {item.name}
                                        </NavLink>
                                    </td>
                                    <td className="px-6 py-2">
                                        {item.brand_name}
                                    </td>
                                    <td className="px-6 py-2">
                                        <Moment format="YYYY/MM/DD HH:mm">{item.created_at}</Moment>
                                    </td>
                                    <td className="px-6 py-2">
                                        {item.campaigns ? 'Finished' : 'Draft'}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
