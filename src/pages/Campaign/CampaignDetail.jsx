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
        }
    }

    return (
        <div className="">
            <CsvDownloadButton data={[content]} delimiter="," />
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

            <h1 className='mt-3'>依頼主様情報</h1>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
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
            </table>
            {JSON.stringify(content)}
            <h1 className='mt-3 mb-3'>依頼主様情報</h1>
            <div className='pl-2'>
                <div>E1. 内容</div>
                <div className='text-sm mb-2 mt-1'>{content.content}</div>
                <div>E1. 今回のキャンペーンでの目標を教えてください。</div>
                <div className='text-sm mb-2 mt-1'>{content.goal}</div>
                <div>E2. 希望のCTA (Call-to-Action)</div>
                <div className='text-sm mb-2 mt-1'>{content.desired}</div>
                <div>E3. 広告のターゲットオーディエンスを教えたください。</div>
                <div className='text-sm mb-2 mt-1'>{content.target_audience}</div>
                <div>E4. 広告のスタイルの希望はありますか？</div>
                <div className='text-sm mb-2 mt-1'>{content.style_adv}</div>
                <div>E5. 広告を聞いた後、オーディエンスに感じて欲しい気持ちを教えてください。</div>
                <div className='text-sm mb-2 mt-1'>{content.audience_feel}</div>
                <div>E6. ナレーターのキャラクターや話し方のトーンに希望はありますか？</div>
                <div className='text-sm mb-2 mt-1'>{content.hope}</div>
                <div>E7. 広告内で伝えたい製品・サービスの特徴をご記入ください。</div>
                <div className='text-sm mb-2 mt-1'>{content.features}</div>
                <div>E8. 広告での訴求ポイント・キーメッセージについて</div>
                <div className='text-sm mb-2 mt-1'>{content.key_messages}</div>
                <div>E9. ブランドガイドラインやトーン＆マナーについて</div>
                <div className='text-sm mb-2 mt-1'>{content.guide_tone}</div>
                <div>E10. その他コメント </div>
                <div className='text-sm mb-2 mt-1'> {content.comments}</div>
            </div>
        </div>
    );
}
