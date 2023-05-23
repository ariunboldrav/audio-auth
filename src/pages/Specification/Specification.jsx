import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import InputFieldMore from '_components/inputs/InputFieldMore';
import CheckBox from '_components/inputs/CheckBox';
import { userActions } from '_store';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '_helpers/errorHandler';

export { Specification };

function Specification() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const checkMediaList = [
        { lable: '音楽', check: false },
        { lable: 'ポッドキャスト', check: false }
    ]

    const [media, setMedia] = useState('');

    const [seconds, setSeconds] = useState('');
    const [secondsFreq, setSecondsFreq] = useState(0);

    const [bannerSize, setBannerSize] = useState('');
    const [bannerFreq, setBannerFreq] = useState(0);

    const [logoSize, setLogoSize] = useState('');
    const [logoFreq, setLogoFreq] = useState(0);
    const [errorMsg, setErrorMsg] = useState()
    const [campId, setCampId] = useState(null)
    // const [currentPass, setCurrentPass] = useState('');

    useEffect(() => {
        dispatch(userActions.getAll());
        handleCompany()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCompany() {
        const c_id = localStorage.getItem('campId')
        if (c_id == null) {
            navigate('/campaigns')
        } else {
            setCampId(c_id)
            try {
                const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/spec/` + c_id)
                if (data) {
                    setMedia(data.media ? data.media : '')
                    setSeconds(data.seconds ? data.seconds : data.seconds)
                    setSecondsFreq(data.seconds_freq ? data.seconds_freq : 0)
                    setBannerSize(data.banner_size ? data.banner_size : '')
                    setBannerFreq(data.banner_freq ? data.banner_freq : 0)
                    setLogoSize(data.logo_size ? data.logo_size : '')
                    setLogoFreq(data.logo_freq ? data.logo_freq : 0)
                }
            } catch (error) {
                if (c_id == null) {
                    navigate('/campaigns')
                }
            }
        }

    }

    async function onSubmit() {
        try {
            const spec = await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/spec/` + campId, {
                media: media,
                seconds: seconds,
                secondsFreq: secondsFreq,
                bannerSize: bannerSize,
                bannerFreq: bannerFreq,
                logoSize: logoSize,
                logoFreq: logoFreq,
                // currentPass: currentPass
            })
            if (spec) {
                navigate('/content')
            }
        } catch (error) {
            if (Array.isArray(error)) {
                const err = ErrorHandler(error)
                setErrorMsg(err)
            }
        }
    }

    return (
        <div className="delay-1000">
            <h2 className="text-black mt-2">広告のスペック</h2>
            <div className="my-6">
                <form>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <InputField error={errorMsg?.media} label="配信先のメディアフォーマット" placeholder={`その他`} value={media} setValue={setMedia} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <InputField error={errorMsg?.seconds} label="広告の長さと個数" placeholder={`その他`} value={seconds} setValue={setSeconds} extInput1={
                                <InputFieldMore
                                    type="text"
                                    value={secondsFreq}
                                    setValue={setSecondsFreq}
                                    info="30秒"
                                    label="Spotifyでは30秒までの長さを配信できます"
                                />
                            } />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <InputField error={errorMsg?.bannerSize} label="コンパニオンバナーのサイズと個数" placeholder={`その他`} value={bannerSize} setValue={setBannerSize} extInput1={
                                <InputFieldMore
                                    type="text"
                                    value={bannerFreq}
                                    setValue={setBannerFreq}
                                    info="600 x 600"
                                    label="Spotifyでは最低このサイズでアスペクト比1:1のものが必要となります"
                                />
                            } />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className=" mb-6">
                            <InputField error={errorMsg?.logoSize} label="ロゴのサイズと個数" placeholder={`その他`} value={logoSize} setValue={setLogoSize}
                                extInput1={
                                    <InputFieldMore
                                        type="text"
                                        value={logoFreq}
                                        setValue={setLogoFreq}
                                        info="112 x 112"
                                        label="Spotifyでは最低このサイズでアスペクト比1:1のものが必要となります"
                                        class="formInput"
                                    />
                                } />
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <button
                            onClick={() => navigate('/campaign')}
                            type='button'
                            className="flex float-left text-primary border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Back
                        </button>
                        <div className="clear"></div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <button
                            onClick={() => onSubmit()}
                            type='button'
                            className="flex float-right text-white bk-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Next
                        </button>
                        <div className="clear"></div>
                    </div>
                </form>
            </div>
        </div>
    );
}
