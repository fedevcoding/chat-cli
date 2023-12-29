const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.download("https://fedev-chatcli-s3bucket.s3.eu-west-3.amazonaws.com/installer.exe", 'Chat CLI installer.exe');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
