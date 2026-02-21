const axios = require('axios');

async function run() {
    console.log("第4工場：APIを回避し、RSSルートで爆撃を開始...");
    // 楽天の公式ランキングRSS（総合）を利用します。ID不要で取得可能です。
    const url = `https://ranking.rakuten.co.jp/rss/ranking/100227/`;
    
    try {
        const res = await axios.get(url);
        // RSSから商品名とリンクを簡易的に抽出（簡易スクレイピング）
        const items = res.data.match(/<item>([\s\S]*?)<\/item>/g);
        
        if (items) {
            console.log("--- 【API不要：着弾リスト】 ---");
            items.slice(0, 5).forEach((item, i) => {
                const title = item.match(/<title>([\s\S]*?)<\/title>/)[1];
                const link = item.match(/<link>([\s\S]*?)<\/link>/)[1];
                // 貴殿のアフィリエイトIDを後付けで付与
                const affiliateLink = `${link}?scid=af_pc_etc&sc2id=af_101_0_0&affiliateId=50ddaf87.89ebdb2d.50ddaf88.f49ce633`;
                
                console.log(`第${i+1}位: ${title.substring(0, 30)}...`);
                console.log(`報酬URL: ${affiliateLink}`);
            });
            console.log("------------------------------");
        } else {
            console.log("現在、楽天のサーバーが混み合っています。");
        }
    } catch (e) {
        console.error("RSS取得エラー:", e.message);
    }
}
run();
