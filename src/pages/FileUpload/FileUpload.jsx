import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import { userActions } from '_store';
import { useNavigate } from 'react-router-dom';
import CheckBox from '_components/inputs/CheckBox';
import MyDatePicker from '_components/inputs/MyDatePicker';
// import Datepicker from "flowbite-datepicker/Datepicker";
export { FileUpload };

function FileUpload() {
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
        const campaign = data[0]
        if (campaign) {
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
            <h2 className="text-black mt-2">素材のアップロード</h2>
            <div className="my-6">
                <form>
                    <div className="grid gap-4 grid-cols-2">
                        <div>
                            <button
                                onClick={() => navigate('content')}
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
                                Submit
                            </button>
                            <div className="clear"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
