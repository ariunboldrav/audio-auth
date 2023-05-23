import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import { userActions } from '_store';
import { NavLink, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
export { CampaignList };

function CampaignList() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { users } = useSelector(x => x.users);
    const [campaignItems, setCampaignItems] = useState([]);
    const [company, setCompany] = useState([]);


    useEffect(() => {
        dispatch(userActions.getAll());
        if(users.full_name) {
            handleCampaign()
        } else {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCampaign() {
        const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/campaign/all`)
        if (Array.isArray(data)) {
            setCampaignItems(data)
            if (data.length == 0) {
                navigate('/campaign/edit/0')
            }
        }
    }

    if(!users.full_name) {
        return null
    }

    return (
        <div className="">
            <h2 className="text-black mt-2">キャンペーン情報 List</h2>
            <div className="my-6 relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                {campaignItems ? <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
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
                                <tr className={`${i % 2 == 0 ? 'bg-white hover:text-primary' : 'bg-gray-50  hover:text-white'} hover:bg-primary border-b dark:bg-gray-900 dark:border-gray-700`} key={i}>
                                    <td className="px-6 py-2">
                                        <NavLink className={`${i % 2 == 0 ? 'hover:text-primary' : 'hover:text-white'}`} to={`/campaign/${(item.spec && item.content && item.fileAnswer ? null : 'edit/') + item.id}`}>
                                            {item.name}
                                        </NavLink>
                                    </td>
                                    <td className="px-6 py-2">
                                        {item.brand_name}
                                    </td>
                                    <td className="px-6 py-2">
                                        <Moment format="YYYY/MM/DD HH:mm">{item.created_at}</Moment>
                                    </td>
                                    <td className={`px-6 py-2`}>
                                        {item.spec && item.content && item.fileAnswer ?
                                            <button className='btn bg-success text-white text-sm px-3 py-0'>SUBMITTED</button> : 'DRAFT'}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                    : <div>
                        You havn't any record of campaign!
                    </div>}

                <div className='mb-0 col-span-2  grid grid-flow-row-dense grid-cols-2'>
                    <div></div>
                    <div className='text-right p-2'>
                        <button className='btn bk-primary text-white text-sm' type='button' onClick={() => navigate('/campaign/edit/0')}>Create new campaign</button>
                    </div>
                </div>
            </div>
        </div >
    );
}
