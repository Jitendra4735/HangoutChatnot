const config = require('./Utility/config')
const MainDialog = require('./dialogs/main/MainDialog')
const express = require('express');
const PORT = process.env.PORT || 3978;


const mainDialog = new MainDialog();


const app = express()
    .use(express.urlencoded({ extended: false }))
    .use(express.json());

app.post('/', (req, res) => {
    //console.log("here1")
    mainDialog.mainDialogStep2(req,res);
});

app.listen(PORT, () => {
    console.log(`Server is running in port - ${PORT}`);
});
