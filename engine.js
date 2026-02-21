const axios = require('axios');
// 正しいアプリケーションIDに修正しました
const APP_ID = "5e6e70cc-b114-49ab-a0ce-840a7629a175"; 
const AFFILIATE_ID = "50ddaf87.89ebdb2d.50ddaf88.f49ce633";

async function run() {
    console.log("楽天トレンド解析を再開します...");
    // 確実に動作する「キーワード検索API」に切り替え、トレンドを狙い撃ちします
    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${APP_ID}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('最新トレンド')}&sort=%2BitemPrice`;
    
    try {
        const res = await axios.get(url);
        if (res.data.Items && res.data.Items.length > 0) {
            console.log("--- 【爆撃リスト：有効な弾丸を検知】 ---");
            res.data.Items.slice(0, 5).forEach((item, i) => {
                console.log(`第${i+1}位: ${item.Item.itemName.substring(0, 30)}...`);
                console.log(`報酬URL: ${item.Item.affiliateUrl}`);
            });
        } else {
            console.log("商品が見つかりませんでした。");
        }
    } catch (e) {
        console.error("APIエラー:", e.response ? e.response.status : e.message);
    }
}
run();
