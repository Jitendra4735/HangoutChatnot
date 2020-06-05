const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const config = require('../../utility/config')
const graphImageCard = require('../../cards/common/graphImageCard')

const purchaseManagerWaterfall = 'purchaseManagerWaterfall'


function PurchaseManagerMain() {
    async function purchaseManagerWaterfallStep1(req, res) {
        //console.log("Purchase")
        try {
            //Displaying the service card
            ServiceCard = serviceList.cardtoDisplay(config.purchaseManagerServiceList)
            return res.json(ServiceCard)
        } catch (error) {
            console.error();
        }
    }
    async function purchaseManagerWaterfallStep2(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context);
            accountDetails.Id = null
            accountDetails.accountId = null
            accountDetails.accountName = null
            await this.userData.set(step.context, accountDetails);
        } catch (error) {
            console.error(error);
        }
        return await step.replaceDialog('mainWaterfall', { "persona": config.personaList[2].nameToDisplay })
    }
    return {
        purchaseManagerWaterfallStep1,
        purchaseManagerWaterfallStep2
    }
}

module.exports = PurchaseManagerMain
