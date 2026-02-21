const axios = require('axios');

// 貴殿がもぎ取った「鍵」と「拠点」をセットしました
const API_KEY = "AIzaSyDjC-J0eJuz5JuX-1Gk0y1l0U6aljJYU9Q";
const BLOG_ID = "8906449124499933093";

async function deployPost() {
    console.log("第4工場：トレンド爆撃を開始します...");

    try {
        // 1. 最新トレンドの捕捉
        const trendRes = await axios.get(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=JP`);
        const latestTrend = trendRes.data.match(/<title>([\s\S]*?)<\/title>/)[1] || "最新トレンド";

        // 2. 記事の自動生成（埋もれないためのSEO構成）
        const postData = {
            kind: "blogger#post",
            blog: { id: BLOG_ID },
            title: `【2026年最新】今話題の「${latestTrend}」を徹底調査！売れ筋商品は？`,
            content: `
                <p>今、SNSや検索で話題の「${latestTrend}」について調査しました。</p>
                <p>関連する注目アイテムや、今すぐチェックすべき情報をまとめています。</p>
                <hr>
                <p><a href="https://hb.afl.rakuten.co.jp/hgc/50ddaf87.89ebdb2d.50ddaf88.f49ce633/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(latestTrend)}%2F">👉 【${latestTrend}】の関連商品を今すぐチェックする</a></p>
                <p>※本記事はAIエージェントにより24時間体制で更新されています。</p>
            `
        };

        // 3. Bloggerへの物理放流
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/?key=${API_KEY}`;
        await axios.post(url, postData);
        
        console.log(`--- 【着弾成功】 ---`);
        console.log(`トレンドワード: ${latestTrend}`);
        console.log(`ステータス: ブログに記事を公開しました。`);

    } catch (e) {
        console.error("放流エラー:", e.response ? JSON.stringify(e.response.data) : e.message);
    }
}

deployPost();
