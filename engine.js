const axios = require('axios');

// 貴殿の資産情報を固定値として埋め込みました
const API_KEY = "AIzaSyDjC-J0eJuz5JuX-1Gk0y1l0U6aljJYU9Q";
const BLOG_ID = "8906449124499933093";
const AFFILIATE_ID = "50ddaf87.89ebdb2d.50ddaf88.f49ce633";

async function executeDeployment() {
    console.log("第4工場：Bloggerへの最終爆撃を試行します...");

    try {
        // トレンド取得
        const trendRes = await axios.get('https://trends.google.com/trends/trendingsearches/daily/rss?geo=JP');
        const latestTrend = trendRes.data.match(/<title>([\s\S]*?)<\/title>/)[1] || "最新ニュース";

        // 記事データ（埋もれないためのトレンド直結タイトル）
        const postData = {
            title: `【2026年最新】「${latestTrend}」の話題をAIが解析！今選ぶべきアイテム`,
            content: `
                <p>現在注目を集めている「${latestTrend}」に関する最新情報をお届けします。</p>
                <p>詳細は以下のリンクからご確認いただけます。</p>
                <br>
                <a href="https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(latestTrend)}%2F">
                   <b>👉 【${latestTrend}】の売れ筋ランキングを見る</b>
                </a>
            `
        };

        // Blogger APIへの直接リクエスト
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/`;
        const res = await axios.post(`${url}?key=${API_KEY}`, postData);

        console.log("--- 【着弾：成功】 ---");
        console.log(`ブログが更新されました: ${res.data.url}`);

    } catch (e) {
        // エラーの「証拠」を逃さず出力します
        const errorMsg = e.response ? JSON.stringify(e.response.data) : e.message;
        console.error("【致命的エラー】:", errorMsg);
        
        if (errorMsg.includes("403")) {
            console.error("対策：Google CloudのAPIキー制限で『Blogger API』が正しく選ばれているか再確認が必要です。");
        }
    }
}

executeDeployment();
