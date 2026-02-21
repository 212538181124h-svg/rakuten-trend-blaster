const axios = require('axios');

// 貴殿の資産とターゲット
const WALLET_ADDRESS = "0x2d9004051B8062B72e1D69190678F4567227b476";
const FAUCET_URL = "https://artio.faucet.berachain.com/api/claim"; // Berachain Artio Faucet

async function executeAirdropTask() {
    console.log(`--- 第5工場：Berachain 物理爆撃開始 ---`);
    console.log(`対象アドレス: ${WALLET_ADDRESS}`);

    try {
        // 1. トークンの自動請求（Faucet）
        // ※運営側のBot対策を回避するため、最低限必要なヘッダーを付与
        const response = await axios.post(FAUCET_URL, {
            address: WALLET_ADDRESS
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0'
            }
        });

        console.log("--- 【着弾成功】 ---");
        console.log(`ステータス: ${response.status}`);
        console.log(`詳細: $BERA テスト通貨の請求を完了しました。`);

    } catch (e) {
        // 失敗した場合は「嘘」をつかずにエラーの正体を吐き出します
        const errorDetail = e.response ? JSON.stringify(e.response.data) : e.message;
        console.error("【攻撃失敗】:", errorDetail);
        
        if (errorDetail.includes("Too Many Requests")) {
            console.log("対策：24時間の待機時間中です。自動巡回スケジュールに従い、次回の隙を突きます。");
        }
    }
}

executeAirdropTask();
