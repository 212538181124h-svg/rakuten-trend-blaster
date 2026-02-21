const axios = require('axios');
const APP_ID = "5e6e70cc-b114-49ab-a0ce-840a7629a175";
const AFFILIATE_ID = "50ddaf87.89ebdb2d.50ddaf88.f49ce633";

async function run() {
    console.log("第4工場：爆撃テスト開始...");
    // 最もエラーが起きにくい「ランキングAPI」の基本URLです
    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601?applicationId=${APP_ID}&affiliateId=${AFFILIATE_ID}`;
    
    try {
        const res = await axios.get(url);
        console.log("--- 【着弾：報酬URLリスト】 ---");
        res.data.Items.slice(0, 3).forEach((item, i) => {
            console.log(`[${i+1}] ${item.Item.itemName.substring(0, 20)}...`);
            console.log(`URL: ${item.Item.affiliateUrl}`);
        });
        console.log("------------------------------");
    } catch (e) {
        console.error("APIエラー:", e.response ? JSON.stringify(e.response.data) : e.message);
    }
}
run();
