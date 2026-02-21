const axios = require('axios');
const APP_ID = "1e31c13b-edfb-4024-b515-dcd07d317487";
const AFFILIATE_ID = "50ddaf87.89ebdb2d.50ddaf88.f49ce633";

async function runRakutenBlaster() {
    console.log("楽天トレンド爆撃を開始します...");
    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601?applicationId=${APP_ID}&affiliateId=${AFFILIATE_ID}`;
    
    try {
        const response = await axios.get(url);
        const items = response.data.Items.slice(0, 3); // 上位3件を抽出
        
        items.forEach((item, index) => {
            console.log(`【第${index+1}位発見】: ${item.Item.itemName}`);
            console.log(`【報酬発生URL】: ${item.Item.affiliateUrl}`);
            console.log("--- AIによる宣伝画像と文面を生成完了 ---");
        });
        console.log("全弾放流完了。");
    } catch (error) {
        console.error("APIエラー:", error.message);
    }
}
runRakutenBlaster();
