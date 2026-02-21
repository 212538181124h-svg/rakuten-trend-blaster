const axios = require('axios');

const API_KEY = "AIzaSyDjC-J0eJuz5JuX-1Gk0y1l0U6aljJYU9Q";
const BLOG_ID = "8906449124499933093";
const AFFILIATE_ID = "50ddaf87.89ebdb2d.50ddaf88.f49ce633";

async function executeDeployment() {
    console.log("第4工場：Bloggerへの物理投稿を再試行します...");

    try {
        const trendRes = await axios.get('https://trends.google.com/trends/trendingsearches/daily/rss?geo=JP');
        const latestTrend = trendRes.data.match(/<title>([\s\S]*?)<\/title>/)[1] || "最新トレンド";

        const postData = {
            title: `【2026最新】話題の「${latestTrend}」をチェック！`,
            content: `現在、SNSや検索で話題の「${latestTrend}」について調査しました。<br><br><a href="https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(latestTrend)}%2F">👉 関連商品を今すぐ見る</a>`
        };

        // 【修正】クエリパラメータをURLに統合して強制送信
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
        const res = await axios.post(url, postData);

        console.log("--- 【着弾：成功】 ---");
        console.log(`物理的に公開されました: ${res.data.url}`);

    } catch (e) {
        // エラー内容をコンソールに強制出力（これが原因究明の証拠になります）
        console.log("エラー詳細:", e.response ? JSON.stringify(e.response.data) : e.message);
    }
}
executeDeployment();
