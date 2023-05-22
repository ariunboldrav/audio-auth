import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import { userActions } from '_store';
import { useNavigate, useParams } from 'react-router-dom';
import CheckBox from '_components/inputs/CheckBox';
import MyDatePicker from '_components/inputs/MyDatePicker';
import moment from 'moment';
import ErrorHandler from '_helpers/errorHandler';

export { Campaign };


function Campaign() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    let { id } = useParams();

    const [name, setName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [totalBudget, setTotalBudget] = useState("");
    const [createBudget, setCreateBudget] = useState("");
    const [checkTotal, setCheckTotal] = useState(false);
    const [checkCreate, setCheckCreate] = useState(false);

    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
    const [errorMsg, setErrorMsg] = useState()

    useEffect(() => {
        dispatch(userActions.getAll());
        handleCampaign()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCampaign() {
        if (id != 0) {
            try {
                const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/campaign/` + id)
                if (data) {
                    const campaign = data
                    setName(campaign.name)
                    setBrandName(campaign.brand_name)
                    setTotalBudget(campaign.total_budget <= 0 ? '' : campaign.total_budget)
                    setCreateBudget(campaign.create_budget <= 0 ? '' : campaign.create_budget)
                    setCheckTotal(campaign.total_budget > 0 ? false : true)
                    setCheckCreate(campaign.create_budget > 0 ? false : true)
                    setStartDate(campaign.when_start)
                    setEndDate(campaign.when_end)

                    localStorage.setItem('campId', campaign.id)
                }
            } catch (error) {
                if (Array.isArray(error)) {
                    const err = ErrorHandler(error)
                    setErrorMsg(err)
                }
            }
        }
    }

    async function onSubmit() {
        setCheckTotal(totalBudget === '' ? true : false)
        setCheckCreate(createBudget === '' ? true : false)

        try {
            const campaign = await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/campaign`, {
                name: name,
                brandName: brandName,
                totalBudget: totalBudget === '' ? 0 : parseInt(totalBudget),
                createBudget: createBudget === '' ? 0 : parseInt(createBudget),
                startDate: startDate,
                endDate: endDate ? endDate : moment().format('YYYY-MM-DD')
            })

            navigate('/spec/' + campaign.id)
        } catch (error) {
            if (Array.isArray(error)) {
                const err = ErrorHandler(error)
                setErrorMsg(err)
            }
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
                            <InputField error={errorMsg?.name} label="キャンペーン名" value={name} setValue={setName} />
                        </div>
                        <div className="mb-6">
                            <InputField error={errorMsg?.brandName} label="商品、またはブランドの名前" value={brandName} setValue={setBrandName} />
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className=" mb-6">
                            <InputField error={errorMsg?.totalBudget} label="広告配信の予算" value={totalBudget} setValue={setTotalBudget} disabled={checkTotal} />
                            <div className='mt-2'>
                                <CheckBox label="相談したい" setHandle={onChangeFreeTotal} default={checkTotal} />
                            </div>
                        </div>
                        <div className=" mb-6">
                            <InputField error={errorMsg?.createBudget} label="広告作成の予算" value={createBudget} setValue={setCreateBudget} disabled={checkCreate} />
                            <div className='mt-2'>
                                <CheckBox label="相談したい" setHandle={onChangeFreeCreate} default={checkCreate} />
                            </div>
                        </div>
                        <div className=" mb-6">
                            {/* <InputField label="広告配信の開始日" value={startDate} setValue={setStartDate} /> */}
                            <MyDatePicker error={errorMsg?.when_start} label="広告配信の開始日" value={startDate} setValue={setStartDate} />
                        </div>
                        <div className=" mb-6">
                            {/* <InputField label="広告配信の終了日" value={endDate} setValue={setEndDate} /> */}
                            <MyDatePicker error={errorMsg?.when_end} label="広告配信の終了日" value={endDate} setValue={setEndDate} />
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
