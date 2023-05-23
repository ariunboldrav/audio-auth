import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import { userActions } from '_store';
import { useNavigate } from 'react-router-dom';
import PasswordField from '_components/inputs/PasswordField';

export { Company };

function Company() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const [compName, setCompName] = useState('');
    const [empName, setEmpName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [currentPass, setCurrentPass] = useState('');
    const { from } = history.location.state || { from: { pathname: '/' } };

    useEffect(() => {
        dispatch(userActions.getAll());
        handleCompany()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCompany() {
        const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/users/profile`)
        
        if (data) {
            if (data.companies) {
                setCompName(data.companies[0].name)
                setEmpName(data.full_name)
                setEmail(data.email)
                setPhone(data.phone)
            }
        } else {
            navigate('/login')
        }
    }

    async function onSubmit() {
        const user = await fetchWrapper.patch(`${process.env.REACT_APP_API_URL}/users`, {
            email: email,
            fullName: empName,
            phone: phone,
            compName: compName
            // currentPass: currentPass
        })
        if (user) {
            navigate('/campaigns')
        }
    }

    return (
        <div className="">
            <h2 className="text-black mt-2">依頼主様情報</h2>
            <div className="my-6">
                <form>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="mb-6">
                            <InputField label="会社名" value={compName} setValue={setCompName} />
                        </div>
                        <div className="mb-6">
                            <InputField label="担当者様 氏名" value={empName} setValue={setEmpName} />
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className=" mb-6">
                            <InputField label="担当者様 メールアドレス" value={email} setValue={setEmail} />
                        </div>
                        <div className=" mb-6">
                            <InputField label="担当者様 電話番号" value={phone} setValue={setPhone} />
                        </div>
                        {/* <div className=" mb-6">
                            <PasswordField label="担当者様 電話番号" value={currentPass} setValue={setCurrentPass} />
                        </div>
                        <div></div> */}
                        <div></div>
                        <div>
                            <button
                                onClick={() => onSubmit()}
                                type='button'
                                className="flex float-right text-white bk-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
