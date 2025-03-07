const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // CORSを有効化
app.use(morgan('dev'));// HTTPリクエストのログを出力

// エンドポイント
app.get('/api/autosave/:username/:message', (req, res) => {
	const { username, message } = req.params;

	console.log(`切断通知を受信: ユーザー=${username}, メッセージ=${message}`);
	console.log(`🔥🔥🔥Canvasをmongoに保存して画像取得`);
	res.json({
		status: 'success',
		timestamp: new Date().toISOString(),
		username,
		message,
		received: true
	});
});

// POSTリクエストでも同様の処理を追加（JSONデータ受け取り用）
app.post('/api/autosave', (req, res) => {
	const { username, message } = req.body;

	console.log(`切断通知をPOSTで受信: ユーザー=${username}, メッセージ=${message}`);
	console.log(`🔥🔥🔥Canvasをmongoに保存して画像取得`);

	res.json({
		status: 'success',
		timestamp: new Date().toISOString(),
		username,
		message,
		received: true
	});
});

// ヘルスチェック
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok', serverName: 'KD-LiftingServer' });
});

// 起動
app.listen(PORT, () => {
	console.log(`KD-LiftingServer is running on port ${PORT}`);
	console.log(`Health check: http://localhost:${PORT}/health`);
	console.log(`Disconnect endpoint: http://localhost:${PORT}/api/disconnect/:username/:message`);
});
// エラーハンドリング
process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
