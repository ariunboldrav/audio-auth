import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import { userActions } from '_store';
import { useNavigate } from 'react-router-dom';
import CheckBox from '_components/inputs/CheckBox';
import MyDatePicker from '_components/inputs/MyDatePicker';
// import Datepicker from "flowbite-datepicker/Datepicker";
export { Campaign };

function Campaign() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [totalBudget, setTotalBudget] = useState("");
    const [createBudget, setCreateBudget] = useState("");
    const [checkTotal, setCheckTotal] = useState(false);
    const [checkCreate, setCheckCreate] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState([])


    useEffect(() => {
        dispatch(userActions.getAll());
        handleCampaign()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCampaign() {
        const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/campaign`)
        const user = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/users/profile`)

        if(user.studio) {
            navigate('/campaigns')
        }

        if (data.campaigns.length > 0) {
            const campaign = data.campaigns[0]
            const spec = campaign.spec
            const content = campaign.content

            if (campaign && spec && content) {
                navigate('/campaign/detail')
            }

            setName(campaign.name)
            setBrandName(campaign.brand_name)
            setTotalBudget(campaign.total_budget <= 0 ? '' : campaign.total_budget)
            setCreateBudget(campaign.create_budget <= 0 ? '' : campaign.create_budget)
            setCheckTotal(campaign.total_budget > 0 ? false : true)
            setCheckCreate(campaign.create_budget > 0 ? false : true)
            setStartDate(campaign.when_start)
            setEndDate(campaign.when_end)
        } else {
            // navigate('/login')
        }
    }

    async function onSubmit() {
        const user = await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/campaign`, {
            name: name,
            brandName: brandName,
            totalBudget: totalBudget === '' ? 0 : parseInt(totalBudget),
            createBudget: createBudget === '' ? 0 : parseInt(createBudget),
            startDate: startDate,
            endDate: endDate
        })

        if (user.statusCode === 400) {
            setErrorMessage(errorMessage)
        } else {
            navigate('/spec')
        }
    }

    const onChangeFreeTotal = () => {
        setCheckTotal(!checkTotal)
        if (!checkTotal) {
            setTotalBudget('')
        } else {
            setTotalBudget(totalBudget)
        }
    }

    const onChangeFreeCreate = () => {
        setCheckCreate(!checkCreate)
        if (!checkCreate) {
            setCreateBudget('')
        } else {
            setCreateBudget(createBudget)
        }
    }

    return (
        <div className="">
            <h2 className="text-black mt-2">キャンペーン情報</h2>
            <div className="my-6">
                <form>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="mb-6">
                            <InputField label="キャンペーン名" value={name} setValue={setName} />
                        </div>
                        <div className="mb-6">
                            <InputField label="商品、またはブランドの名前" value={brandName} setValue={setBrandName} />
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className=" mb-6">
                            <InputField label="広告配信の予算" value={totalBudget} setValue={setTotalBudget} disabled={checkTotal} />
                            <div className='mt-2'>
                                <CheckBox label="相談したい" setHandle={onChangeFreeTotal} default={checkTotal} />
                            </div>
                        </div>
                        <div className=" mb-6">
                            <InputField label="広告作成の予算" value={createBudget} setValue={setCreateBudget} disabled={checkCreate} />
                            <div className='mt-2'>
                                <CheckBox label="相談したい" setHandle={onChangeFreeCreate} default={checkCreate} />
                            </div>
                        </div>
                        <div className=" mb-6">
                            {/* <InputField label="広告配信の開始日" value={startDate} setValue={setStartDate} /> */}
                            <MyDatePicker label="広告配信の開始日" value={startDate} setValue={setStartDate} />
                        </div>
                        <div className=" mb-6">
                            {/* <InputField label="広告配信の終了日" value={endDate} setValue={setEndDate} /> */}
                            <MyDatePicker label="広告配信の終了日" value={endDate} setValue={setEndDate} />
                        </div>
                        <div>
                            <button
                                onClick={() => navigate('/company')}
                                type='button'
                                className="flex float-left text-primary border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Back
                            </button>
                            <div className="clear"></div>
                        </div>
                        <div>
                            <button
                                onClick={() => onSubmit()}
                                type='button'
                                className="flex float-right text-white bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Next
                            </button>
                            <div className="clear"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
