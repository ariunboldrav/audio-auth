import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import { userActions, authActions } from '_store';
import { useNavigate } from 'react-router-dom';
import PasswordField from '_components/inputs/PasswordField';
import { Nav } from '_components';

export { Register };

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const [compName, setCompName] = useState('');
    const [empName, setEmpName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+15713570011');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');

    useEffect(() => {
        // dispatch(userActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit() {

        if (password != confPass && password.length < 6) {
            return null;
        }

        const register = await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
            email: email,
            fullName: empName,
            phone: '+15713570099',
            compName: compName,
            password: password
            // currentPass: currentPass
        })
        if (register.company) {
            return dispatch(authActions.login({ email, password }));
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
                        <div className="mb-6">
                            <InputField label="担当者様 メールアドレス" value={email} setValue={setEmail} />
                        </div>
                        <div className="mb-6">
                            <InputField label="担当者様 電話番号" value={phone} setValue={setPhone} />
                            <div className='text-sm text-gray-500'>Enter U.S Cellphone number. Please(test)</div>
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="mb-6">
                            <PasswordField label="Password" value={password} setValue={setPassword} />
                        </div>
                        <div className="mb-6">
                            <PasswordField label="Password" value={confPass} setValue={setConfPass} />
                        </div>
                        <div></div>
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
