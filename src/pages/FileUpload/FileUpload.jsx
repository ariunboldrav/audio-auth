import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import CheckBox from '_components/inputs/CheckBox';
import { userActions } from '_store';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '_helpers/errorHandler';
import TextAreaField from '_components/inputs/TextAreaField';
import { checkBoxItems } from '_helpers/checkSomeData';
import FileUploadField from '_components/inputs/FileUploadField';

export { FileUpload };

function FileUpload() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [answerOne, setAnswerOne] = useState('')
    const [answerTwo, setAnswerTwo] = useState('')
    const [answerThree, setAnswerThree] = useState('')
    const [answerFour, setAnswerFour] = useState('')
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
                const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/file-answers/` + c_id)
                if (data) {
                    setAnswerOne(data.answer_one)
                    setAnswerTwo(data.answer_two)
                    setAnswerThree(data.answer_three)
                    setAnswerFour(data.answer_four)
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
            const answers = await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/file-answers/` + campId, {
                answerOne,
                answerTwo,
                answerThree,
                answerFour
            })
            if (answers) {
                navigate('/campaigns')
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
            <h2 className="text-black mt-2">素材のアップロード</h2>
            <div className="my-6">
                <form>
                    <div className=''>
                        {/* File1 */}
                        <div className="mb-0 col-span-2 grid grid-flow-row-dense grid-cols-2">
                            <div className="mb-6">
                                <div className="text-gray-900 text-sm" htmlFor="talkAdvBudget">
                                    バナーの作成
                                </div>
                                {checkBoxItems.f1.items.map((item, i) => {
                                    return <CheckBox key={`f1${i}`} label={`${item}`} domId={`e4${i}`} setHandle={() => { setAnswerOne(item) }} default={answerOne == item} />
                                })}
                                <TextAreaField error={errorMsg?.answerOne} info="御社で作成される場合はこちらの例をご確認ください。" placeholder={`コメント、リクエスト`} value={answerOne} setValue={setAnswerOne} />
                            </div>
                            <div className='pl-4'>
                                <FileUploadField />
                            </div>
                        </div>
                        {/* File2 */}
                        <div className="mb-0 col-span-2  grid grid-flow-row-dense grid-cols-2">
                            <div className="mb-6">
                                <div className="text-gray-900 text-sm" htmlFor="talkAdvBudget">
                                    原稿の作成
                                </div>
                                <div className='text-gray-500 text-sm'>御社で作成される場合はこちらの例をご確認ください。</div>
                                {checkBoxItems.f2.items.map((item, i) => {
                                    return <CheckBox key={`f2${i}`} label={`${item}`} domId={`e4${i}`} setHandle={() => { setAnswerTwo(item) }} default={answerTwo == item} />
                                })}
                                <TextAreaField error={errorMsg?.answerTwo} info="" placeholder={`その他`} value={answerTwo} setValue={setAnswerTwo} />
                            </div>
                            <div className='pl-4'>
                                <FileUploadField />
                            </div>
                        </div>
                        {/* File2 */}
                        <div className="mb-0 col-span-2  grid grid-flow-row-dense grid-cols-2">
                            <div className="mb-6">
                                <div className="text-gray-900 text-sm" htmlFor="talkAdvBudget">
                                    BGMの作成
                                </div>
                                {checkBoxItems.f3.items.map((item, i) => {
                                    return <CheckBox key={`f3${i}`} label={`${item}`} domId={`e4${i}`} setHandle={() => { setAnswerThree(item) }} default={answerThree == item} />
                                })}
                                <TextAreaField error={errorMsg?.answerThree} placeholder={`その他`} value={answerThree} setValue={setAnswerThree} />
                            </div>
                            <div className='pl-4'>
                                <FileUploadField />
                            </div>
                        </div>
                        {/* File4 */}
                        <div className="mb-0 col-span-2  grid grid-flow-row-dense grid-cols-2">
                            <div className="mb-6">
                                <div className="text-gray-900 text-sm" htmlFor="talkAdvBudget">
                                    その他、広告作成にあたって参考になる素材
                                </div>
                                <div className='text-gray-500 text-sm'>例：含めたいジングル</div>
                                {checkBoxItems.f4.items.map((item, i) => {
                                    return <CheckBox key={`f4${i}`} label={`${item}`} domId={`e4${i}`} setHandle={() => { setAnswerFour(item) }} default={answerFour == item} />
                                })}
                                <TextAreaField error={errorMsg?.answerFour} placeholder={`その他`} value={answerFour} setValue={setAnswerFour} />
                            </div>
                            <div className='pl-4'>
                                <FileUploadField />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => navigate('/content')}
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
