const listCard = require('../../cards/common/listCard')
const detailCard = require('../../cards/common/detailCard')
const config = require('../../utility/config')
const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const invoiceData = require('../../data/database/accountManager/invoiceData')

function invoiceMain() {
    async function invoiceList(accountId, res) {
        try {
            var errorMessage;
            let result = await invoiceData.getinvoiceData(accountId);
            if ((result.length > 0) && (result !== config.errorMessage)) {
                return res.send(await listCard.itemListCard(result, config.logoToDisplay[0],
                    config.cardTitle.invoiceListCard, config.listCardAction.invoice))
            } else {
                errorMessage = "No Invoices found, Please try again!"
                return res.send({ errorMessage });
            }
        } catch (error) {
            console.error(error);
            errorMessage = "Error occured while showing Invoice List, Please try again!"
            return res.send({ errorMessage });
        }
    }
    async function invoiceDetail(req, res) {
        try {
            var errorMessage;
            let result = await invoiceData.getinvoiceData(req.body.action.parameters[0].value);
            if ((result.length > 0) && (result !== config.errorMessage)) {
                return res.send(await detailCard.detailCard(result[0], config.invoiceDetailCard, 'invoice', config.logoToDisplay[0],
                    config.cardTitle.invoiceDetailCard))
            } else {
                errorMessage = "No Invoice found with given details. Here are some Invoices you might want to see!"
                return res.send({ errorMessage });
            }
        } catch (error) {
            console.error(error);
            errorMessage = "Error occured while showing Invoice Detail, Please try again!"
            return res.send({ errorMessage });
        }
    }
    return {
        invoiceList,
        invoiceDetail
    }
}

module.exports = invoiceMain