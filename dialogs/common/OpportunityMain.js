const listCard = require('../../cards/common/listCard')
const detailCard = require('../../cards/common/detailCard')
const config = require('../../utility/config')
const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const opportunityData = require('../../data/database/common/opportunityData')


function opportunityMain() {
    async function opportunityWaterfallStep1(accountId, res) {
        try {
            var text;
           
            let result = await opportunityData.getOpportunityData(accountId)
            if ((result.length > 0) && (result !== config.errorMessage)) {
                let cardToSend = await listCard.itemListCard(result, config.logoToDisplay[1],
                    config.cardTitle.opportunityListCard, config.listCardAction.opportunity, config.accountManagerServiceList)
                return res.send(cardToSend)
            } else {
                text = "No Opportunities found, Please try again!";
                return res.send(text);
            }

        } catch (error) {
            console.error(error);
            text = "Error occured while showing Opportunity List, Please try again!";
            return res.send(text);

        }
    }
    async function opportunityWaterfallStep2(req, res) {
        try {
            var errorMessage;
            let result = await opportunityData.getOpportunityData(req.body.action.parameters[0].value)
            if ((result.length > 0) && (result !== config.errorMessage)) {
                let cardToSend = await detailCard.detailCard(result[0], config.opportunityDetailCard, 'opportunity', config.cardTitle.opportunityDetailCard, config.accountManagerServiceList)
                
                return res.send(cardToSend);

            } else {
                errorMessage = "No Opportunity found with given details. Here are some Opportunities you might want to see!";
                return res.send({ errorMessage });
            }
        } catch (error) {
            console.error(error);
            errorMessage = "Error occured while showing Opportuntiy Detail, Please try again!";
            return res.send({ errorMessage });
        }
    }
    return {
        opportunityWaterfallStep1,
        opportunityWaterfallStep2
    }
}

module.exports = opportunityMain
