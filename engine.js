const axios = require('axios');

const API_KEY = "AIzaSyDjC-J0eJuz5JuX-1Gk0y1l0U6aljJYU9Q";
const BLOG_ID = "8906449124499933093";
const AFFILIATE_ID = "50ddaf87.89ebdb2d.50ddaf88.f49ce633";

async function executeDeployment() {
    console.log("第4工場：Bloggerへの物理投稿を最終試行します...");

    try {
        const trendRes = await axios.get('https://trends.google.com/trends/trendingsearches/daily/rss?geo=JP');
        const latestTrend = trendRes.data.match(/<title>([\s\S]*?)<\/title>/)[1] || "最新ニュース";

        const postData = {
            kind: "blogger#post",
            blog: { id: BLOG_ID },
            title: `【2026速報】話題の「${latestTrend}」をAIが分析！`,
            content: `
                今話題のキーワード「${latestTrend}」について調査しました。<br>
                詳細は以下のリンクからご確認いただけます。<br><br>
                <a href="https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(latestTrend)}%2F">
                👉 関連商品を今すぐ見る
                </a>
            `
        };

        // エンドポイントの末尾を修正し、明示的にJSONを送信
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
        const res = await axios.post(url, postData, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log("--- 【着弾：成功】 ---");
        console.log(`物理公開URL: ${res.data.url}`);

    } catch (e) {
        console.error("【致命的エラー報告】");
        if (e.response) {
            // Googleからの生の「拒絶理由」をログに出力します
            console.error("ステータス:", e.response.status);
            console.error("内容:", JSON.stringify(e.response.data));
        } else {
            console.error("メッセージ:", e.message);
        }
        // ここでエラーを投げて、GitHubのチェックを「赤のバツ」に強制します
        process.exit(1); 
    }
}

executeDeployment();
