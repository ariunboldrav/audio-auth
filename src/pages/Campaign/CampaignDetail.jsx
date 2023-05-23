import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import CsvDownloadButton from 'react-json-to-csv'
import { useParams } from 'react-router-dom'
import Moment from 'react-moment';
// import Datepicker from "flowbite-datepicker/Datepicker";
export { CampaignDetail };

function CampaignDetail() {
    // const dispatch = useDispatch();
    const [company, setCompany] = useState("");
    const [campaign, setCampaign] = useState("");
    const [spec, setSpec] = useState("");
    const [content, setContent] = useState("");
    const [fileAnswer, setFileAnswer] = useState("");
    let { id } = useParams();
    useEffect(() => {
        // dispatch(userActions.getAll());
        handleCampaign()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCampaign() {
        const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/campaign/` + id)
        const campaign = data
        if (campaign) {
            setCampaign(campaign)
            setSpec(campaign.spec)
            setContent(campaign.content)
            setFileAnswer(campaign.fileAnswer)
        }
    }

    return (
        <div className="">

            <div className="my-6">
            </div>
            <h1 className='mt-3'>キャンペーン情報</h1>

            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <tbody>
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>キャンペーン名</td>
                        <td className='p-2'>{campaign.name}</td>
                        <td className='p-2'>商品、またはブランドの名前</td>
                        <td className='p-2'>{campaign.brand_name}</td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>広告配信の予算</td>
                        <td className='p-2'>{campaign.total_budget}</td>
                        <td className='p-2'>広告作成の予算</td>
                        <td className='p-2'>{campaign.create_budget}</td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>広告配信の開始日</td>
                        <td className='p-2'><Moment format='YYYY/MM/DD HH:mm'>{campaign.when_start}</Moment></td>
                        <td className='p-2'>広告配信の終了日</td>
                        <td className='p-2'><Moment format='YYYY/MM/DD HH:mm'>{campaign.when_end}</Moment></td>
                    </tr>
                </tbody>
            </table>

            <h1 className='mt-3'>広告のスペック</h1>
            {spec ? <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <tbody>
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>配信先のメディアフォーマット</td>
                        <td className='p-2'>{spec.media}</td>
                        <td className='p-2'></td>
                        <td className='p-2'></td>
                    </tr>
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>広告の長さと個数</td>
                        <td className='p-2'>{spec.seconds}秒</td>
                        <td className='p-2'> - </td>
                        <td className='p-2'>{spec.seconds_freq}</td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>コンパニオンバナーのサイズと個数</td>
                        <td className='p-2'>{spec.banner_size}</td>
                        <td className='p-2'> - </td>
                        <td className='p-2'>{spec.banner_freq}</td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>ロゴのサイズと個数</td>
                        <td className='p-2'>{spec.logo_size}</td>
                        <td className='p-2'> - </td>
                        <td className='p-2'>{spec.logo_freq}</td>
                    </tr>
                </tbody>
            </table> : 'No Specs'}
            {/* {JSON.stringify(content)} */}
            <h1 className='mt-3 mb-3'>広告の内容</h1>
            {/* {content ? <div className='pl-2'>
                <div className="font-bold">E. 内容</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.content}</div>
                <div className="font-bold">E1. 今回のキャンペーンでの目標を教えてください。</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.goal}</div>
                <div className="font-bold">E2. 希望のCTA (Call-to-Action)</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.desired}</div>
                <div className="font-bold">E3. 広告のターゲットオーディエンスを教えたください。</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.target_audience}</div>
                <div className="font-bold">E4. 広告のスタイルの希望はありますか？</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.style_adv}広告を聞いた後、オーディエンスに感じて欲しい気持ちを教えてください。</div>
                <div className="font-bold">E5. </div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.audience_feel}</div>
                <div className="font-bold">E6. ナレーターのキャラクターや話し方のトーンに希望はありますか？</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.hope}</div>
                <div className="font-bold">E7. 広告内で伝えたい製品・サービスの特徴をご記入ください。</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.features}</div>
                <div className="font-bold">E8. 広告での訴求ポイント・キーメッセージについて</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.key_messages}</div>
                <div className="font-bold">E9. ブランドガイドラインやトーン＆マナーについて</div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'>{content.guide_tone}</div>
                <div className="font-bold">E10. その他コメント </div>
                <div className='text-sm mb-2 mt-1 mb-3 text-gray-500'> {content.comments}</div>
            </div> : 'No Content'} */}

            {content ? <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <tbody>
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E. 内容</td>
                        <td className='p-2'>{content.content}</td>
                    </tr>
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E1. 今回のキャンペーンでの目標を教えてください。</td>
                        <td className='p-2'>{content.goal}</td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E2. 希望のCTA (Call-to-Action)</td>
                        <td className='p-2'>{content.desired}</td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E3. 広告のターゲットオーディエンスを教えたください。</td>
                        <td className='p-2'>{content.target_audience}</td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E4. 広告のスタイルの希望はありますか？</td>
                        <td className='p-2'>{content.style_adv}</td>
                    </tr><tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E5. 広告を聞いた後、オーディエンスに感じて欲しい気持ちを教えてください。</td>
                        <td className='p-2'>{content.audience_feel}</td>
                    </tr><tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E6. ナレーターのキャラクターや話し方のトーンに希望はありますか？</td>
                        <td className='p-2'>{content.hope}</td>
                    </tr><tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E7. 広告内で伝えたい製品・サービスの特徴をご記入ください。</td>
                        <td className='p-2'>{content.features}</td>
                    </tr><tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E8. 広告での訴求ポイント・キーメッセージについて</td>
                        <td className='p-2'>{content.key_messages}</td>
                    </tr><tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E9. ブランドガイドラインやトーン＆マナーについて</td>
                        <td className='p-2'>{content.guide_tone}</td>
                    </tr><tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>E10. その他コメント</td>
                        <td className='p-2'>{content.comments}</td>
                    </tr>
                </tbody>
            </table> : 'No Contents'}

            <h1 className='mt-3 mb-3'>素材のアップロード</h1>
            {fileAnswer ? <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <tbody>
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>バナーの作成</td>
                        <td className='p-2'>{fileAnswer.answer_one}</td>
                        <td className='p-2'></td>
                    </tr>
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>原稿の作成</td>
                        <td className='p-2'>{fileAnswer.answer_two}</td>
                        <td className='p-2'></td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>BGMの作成</td>
                        <td className='p-2'>{fileAnswer.answer_three}</td>
                        <td className='p-2'></td>
                    </tr>
                    <tr className='bg-grey-50 border-b dark:bg-gray-900 dark:border-gray-700'>
                        <td className='p-2'>その他、広告作成にあたって参考になる素材</td>
                        <td className='p-2'>{fileAnswer.answer_four}</td>
                        <td className='p-2'></td>
                    </tr>
                </tbody>
            </table> : 'No Files'}
            <CsvDownloadButton data={[{
                campaign, spec, content, fileAnswer
            }]} delimiter="," style={{ //pass other props, like styles
                boxShadow: "inset 0px 1px 0px 0px #e184f3",
                background: "linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                borderRadius: "6px",
                border: "1px solid #a511c0",
                display: "inline-block",
                cursor: "pointer", "color": "#ffffff",
                fontSize: "15px",
                fontWeight: "bold",
                padding: "6px 24px",
                textDecoration: "none",
                textShadow: "0px 1px 0px #9b14b3"
            }} className="bk-primary" filename={`audio_ai_tool_${campaign.when_start}.csv`}>Download CSV</CsvDownloadButton>
        </div>
    );
}
