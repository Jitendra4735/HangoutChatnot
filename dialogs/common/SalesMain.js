const listCard = require('../../cards/common/listCard')
const detailCard = require('../../cards/common/detailCard')
const config = require('../../utility/config')
const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const salesData = require('../../data/database/common/salesData')


function salesMain() {
    async function salesStep1(req, res,accountId) {

        try {
            if (req.body.action.actionMethodName === config.salesManagerServiceList[0]) {
                let result = await salesData.getSalesCurrentPeriod()
                console.log(result,";;;;;;;;;;;;;;")
                if ((result.length > 0) && (result !== config.errorMessage)) {
                    return res.send(listCard.itemListCard(result, config.logoToDisplay[0],
                        config.cardTitle.salesListCard, config.listCardAction.sales,config.salesManagerServiceList))

                } else {
                    return res.send({ message: "No Sales Order found, Please try again!" })
                }
            } else {
                let result = await salesData.getSalesData(accountId)
                if ((result.length > 0) && (result !== config.errorMessage)) {
                    return res.send(await listCard.itemListCard(result, config.logoToDisplay[0],
                        config.cardTitle.salesListCard, config.listCardAction.sales,config.salesManagerServiceList))
                } else {
                    return res.send({ message: "No Sales Order found, Please try again!" })
                }
            }

        } catch (error) {
            console.error(error);
            return res.send({ message: "Error occured while showing Sales Order List, Please try again!" })
        }
    }

    async function salesStep2(req, res) {
        try {
            let id;
            if ((req.body.action.actionMethodName === config.listCardAction.sales) || req.body.action.parameters[0].value) {
                if (req.body.action.actionMethodName === config.listCardAction.sales) {
                    id = req.body.action.parameters[0].value
                }
                let result = await salesData.getSalesData(id)
                if ((result.length > 0) && (result !== config.errorMessage)) {
                    return res.send(await detailCard.detailCard(result[0], config.salesDetailCard, 'sales', config.cardTitle.salesDetailCard, config.salesManagerServiceList)
                    )
                } else {
                    id = null
                    return res.send({ message: "No Sales Order found with given details. Here are some Sales Order you might want to see!" })
                }
            }
        } catch (error) {
            console.error(error);
            return res.send({ message: "Error occured while showing Sales Order Detail, Please try again!" })
        }

    }
    return {
        salesStep1,
        salesStep2
    }
}

module.exports = salesMain 
