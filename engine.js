const axios = require('axios');

// 貴殿の資産
const API_KEY = "AIzaSyDjC-J0eJuz5JuX-1Gk0y1l0U6aljJYU9Q";
const BLOG_ID = "8906449124499933093";

async function forceDeploy() {
    console.log("第4工場：Bloggerへの直接爆撃を試行中...");
    
    try {
        // 1. トレンド取得（GoogleトレンドRSS）
        const trendRes = await axios.get('https://trends.google.com/trends/trendingsearches/daily/rss?geo=JP');
        const latestTrend = trendRes.data.match(/<title>([\s\S]*?)<\/title>/)[1] || "最新ニュース";

        // 2. 記事データ作成
        const postData = {
            title: `【2026速報】「${latestTrend}」が話題！今すぐ確認すべきポイント`,
            content: `今話題のキーワード「${latestTrend}」をAIが分析しました。<br><br><a href="https://hb.afl.rakuten.co.jp/hgc/50ddaf87.89ebdb2d.50ddaf88.f49ce633/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(latestTrend)}%2F">👉 関連商品をチェックする</a>`
        };

        // 3. 直接投稿（Blogger API v3）
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/?key=${API_KEY}`;
        const res = await axios.post(url, postData);
        
        console.log("--- 【着弾：成功】 ---");
        console.log(`公開URL: ${res.data.url}`);

    } catch (e) {
        // エラー内容を詳細に出力して、逃げ場をなくします
        console.error("放流失敗:", e.response ? JSON.stringify(e.response.data) : e.message);
    }
}
forceDeploy();
