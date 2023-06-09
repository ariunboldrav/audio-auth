import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import { userActions, authActions } from '_store';
import { useNavigate } from 'react-router-dom';
import PasswordField from '_components/inputs/PasswordField';
import { Nav } from '_components';
import ErrorHandler from '_helpers/errorHandler';

export { Register };

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const [compName, setCompName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [errorMsg, setErrorMsg] = useState()
    useEffect(() => {
        // dispatch(userActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit() {
        if (password != confPass && password.length < 6) {
            setErrorMsg({ password: 'Password isn\'t matching to Confirmation' })
            return null;
        } else {
            try {
                const register = await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                    email: email,
                    fullName: fullName,
                    phone: phone,
                    compName: compName,
                    password: password
                    // currentPass: currentPass
                })
                if (register.company) {
                    return dispatch(authActions.login({ email, password }));
                }
            } catch (error) {
                if (Array.isArray(error)) {
                    const err = ErrorHandler(error)
                    setErrorMsg(err)
                }
            }
        }
    }

    return (
        <div className="">
            <h2 className="text-black mt-2">依頼主様登録 (v1.0.12)</h2>
            <div className="my-6">
                <form>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="mb-6">
                            <InputField error={errorMsg?.compName} label="会社名" value={compName} setValue={setCompName} />
                        </div>
                        <div className="mb-6">
                            <InputField error={errorMsg?.fullName} label="担当者様 氏名" value={fullName} setValue={setFullName} />
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="mb-6">
                            <InputField error={errorMsg?.email} label="担当者様 メールアドレス" value={email} setValue={setEmail} />
                        </div>
                        <div className="mb-6">
                            <InputField error={errorMsg?.phone} label="担当者様 電話番号" value={phone} setValue={setPhone} />
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="mb-6">
                            <PasswordField error={errorMsg?.password} label="新規パスワード" value={password} setValue={setPassword} />
                        </div>
                        <div className="mb-6">
                            <PasswordField error={password != confPass ? 'Password isn\'t matching to confirmation ' : null} label="新規パスワード（確認)" value={confPass} setValue={setConfPass} />
                        </div>
                        <div></div>
                        <div>
                            <button
                                onClick={() => onSubmit()}
                                type='button'
                                className="flex float-right text-white bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Register
                            </button>
                            <div className="clear"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
