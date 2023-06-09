import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import InputField from '_components/inputs/InputField';
import { userActions } from '_store';
import { useNavigate } from 'react-router-dom';
import { checkBoxItems } from '_helpers/checkSomeData';
import CheckBox from '_components/inputs/CheckBox';
import TextAreaField from '_components/inputs/TextAreaField';
import ErrorHandler from '_helpers/errorHandler';
export { Content };

function Content() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [desired, setDesired] = useState('');
    const [audienceFeel, setAudienceFeel] = useState('');
    const [comments, setComments] = useState('');
    const [goal, setGoal] = useState('');
    const [keyMessages, setKeyMessages] = useState('');
    const [features, setFeatures] = useState('');
    const [hope, setHope] = useState('');
    const [styleAdv, setStyleAdv] = useState('');
    const [guidelineTone, setGuidelineTone] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [campId, setCampId] = useState('');
    const [errorMsg, setErrorMsg] = useState([])

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
                const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/content/` + c_id)
                if (data) {
                    setContent(data.content)
                    setDesired(data.desired)
                    setGoal(data.goal)
                    setAudienceFeel(data.audience_feel)
                    setComments(data.comments)
                    setKeyMessages(data.key_messages)
                    setFeatures(data.features)
                    setHope(data.hope)
                    setStyleAdv(data.style_adv)
                    setGuidelineTone(data.guideline_tone)
                    setTargetAudience(data.target_audience)
                }
            } catch (error) {
                if (c_id == null) {
                    navigate('/campaigns')
                }
            }
        }

    }

    function handleE1d(value) {
        if (goal) {
            var isMatch = goal.toLocaleLowerCase().includes(`, ${value}`.toLocaleLowerCase())
            var isMatch2 = goal.toLocaleLowerCase().includes(`${value}`.toLocaleLowerCase())
            if (isMatch) {
                var newData = goal.replaceAll(`, ${value}`, '')
                setGoal(newData)
            } else if (isMatch2) {
                var newData = goal.replaceAll(`${value}`, '')
                setGoal(newData)
            } else {
                setGoal(goal + `, ${[value]}`)
            }
        } else {
            setGoal(`${[value]}`)
        }

    }

    function checkE1d(value) {
        if (goal) {
            return goal.toLocaleLowerCase().includes(`${value}`.toLocaleLowerCase())
        }
        return false
    }

    async function onSubmit() {
        try {
            const contents = await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/content/` + campId, {
                content,
                goal,
                desired,
                audienceFeel,
                comments,
                keyMessages,
                features,
                hope,
                styleAdv,
                audienceFeel,
                guidelineTone,
                targetAudience
            })
            if (contents) {
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
        <div className="">
            <h2 className="text-black mt-2">広告の内容</h2>
            <div className="my-6">
                <form>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E. 内容" value={content} setValue={setContent} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <div className="text-gray-900 text-sm" htmlFor="talkAdvBudget">
                                E1. 今回のキャンペーンでの目標を教えてください。
                            </div>
                            <div>
                                {checkBoxItems.e1.items.map((item, i) => {
                                    return <CheckBox key={`e1${i}`} label={`${item}`} domId={`e4${i}`} setHandle={() => { handleE1d(item) }} default={checkE1d(item)} />
                                })}
                            </div>
                            <TextAreaField value={goal} setValue={setGoal} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E2. 希望のCTA (Call-to-Action)" info={`例：詳細はこちら、情報を入手、サイトを見る、チケット購入、クーポンを入手、プロフィールを見る、続きはこちら、お店を探す、ダウンロード、今すぐ共有、今すぐ購入、今すぐ登録、今すぐ聴く`} value={desired} setValue={setDesired} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E3. 広告のターゲットオーディエンスを教えたください。" info={`訴求商品やサービスのターゲット像を説明ください。 性年代・ライフステージとともに、ペルソナ（ライフスタイル ・好きな音楽・趣味嗜好性）、訴求ブランドとの関係性について、 分かる範囲でお知らせ下さい。`} value={targetAudience} setValue={setTargetAudience} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <div className="text-gray-900 text-sm" htmlFor="talkAdvBudget">
                                E4. 広告のスタイルの希望はありますか？
                            </div>
                            {checkBoxItems.e4.items.map((item, i) => {
                                return <CheckBox key={`e4${i}`} label={`${item}`} domId={`e4${i}`} setHandle={() => { setStyleAdv(item) }} default={styleAdv == item} />
                            })}
                            <TextAreaField value={styleAdv} setValue={setStyleAdv} index={`e4${checkBoxItems.e4.items.length + 1}`} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E5. 広告を聞いた後、オーディエンスに感じて欲しい気持ちを教えてください。" value={audienceFeel} setValue={setAudienceFeel} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E6. ナレーターのキャラクターや話し方のトーンに希望はありますか？" info={`男性、女性、若い／シニアなどの年齢層、話すスタイル、アクセント、ナレーターのランク(中堅〜ベテラン)等。＜各キャストの内訳＞ナレーションおよび声優の、性別、人数、年齢、テイスト`} value={hope} setValue={setHope} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E7. 広告内で伝えたい製品・サービスの特徴をご記入ください。" info={`原稿に含めるべきキーワードがある場合にはそちらも明記ください。`} value={features} setValue={setFeatures} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E8. 広告での訴求ポイント・キーメッセージについて" info={`商品・サービスのUSPやベネフィット、キャンペーンのメインメッセージ、サウンドロゴやジングル、耳のこりをさせたいフレーズなど、広告での主要訴求要素についてお知らせ下さい。`} value={keyMessages} setValue={setKeyMessages} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E9. ブランドガイドラインやトーン＆マナーについて" info={`制作において考慮・遵守する必要がある、ブランドフレーズ、タグライン、法的に必要な文言、またはブランドマーケティングで使用される表現がある場合はお知らせ下さい。`} value={guidelineTone} setValue={setGuidelineTone} />
                        </div>
                    </div>
                    <div className="mb-0 col-span-2">
                        <div className="mb-6">
                            <TextAreaField label="E10. その他コメント" info={`他に制作に役立つ関連情報・コメントがあれば教えてください。過去キャンペーンなど参考とすべきものがありましたら、併せてお知らせ下さい。`} value={comments} setValue={setComments} />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => navigate('/spec')}
                            type='button'
                            className="flex float-left text-primary border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Back
                        </button>
                    </div>
                    <div className="mb-0 col-span-2">
                        <button
                            onClick={() => onSubmit()}
                            type='button'
                            className="flex float-right text-white bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
