const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './inno-setup/Output/Chat cli.exe');
    res.download(filePath, 'installer.exe');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});