import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWrapper } from '_helpers';
import CsvDownloadButton from 'react-json-to-csv'
// import Datepicker from "flowbite-datepicker/Datepicker";
export { CampaignDetail };

function CampaignDetail() {
    // const dispatch = useDispatch();
    const [company, setCompany] = useState("");
    const [campaign, setCampaign] = useState("");
    const [spec, setSpec] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        // dispatch(userActions.getAll());
        handleCampaign()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCampaign() {
        const data = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/campaign`)
        const campaign = data.campaigns[0]
        const spec = campaign.spec
        setCompany(data)
        setCampaign(campaign)
        setSpec(campaign.spec)
        setContent(campaign.content)
    }

    return (
        <div className="">
            <CsvDownloadButton data={company.campaigns} delimiter=";" />
            <h2 className="text-black mt-2">キャンペーン情報</h2>
            <div className="my-6">
                <div>{campaign.name}</div>
                <div>{campaign.brand_name}</div>
                <div>{campaign.total_budget}</div>
                <div>{campaign.create_budget}</div>
                <div>{campaign.when_start}</div>
                <div>{campaign.when_end}</div>
            </div>
            <h2>Spec</h2>
            <div>
                <div>{spec.seconds}</div>
                <div>{spec.seconds_freq}</div>
                <div>{spec.banner_size}</div>
                <div>{spec.banner_freq}</div>
                <div>{spec.logo_size}</div>
                <div>{spec.logo_freq}</div>
            </div>
            <h2>Content</h2>
            <div>
                <div>{content.goal}</div>
                <div>{content.desired}</div>
                <div>{content.goal}</div>
                <div>{content.hope}</div>
                <div>{content.target_audience}</div>
                <div>{content.style_adv}</div>
                <div>{content.audience_feel}</div>
                <div>{content.features}</div>
                <div>{content.key_messages}</div>
                <div>{content.guide_tone}</div>
                <div>{content.comments}</div>
                <div>{JSON.stringify(content)}</div>
            </div>
        </div>
    );
}
