const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const config = require('../../utility/config')
const graphImageCard = require('../../cards/common/graphImageCard')
const logos = require('../../utility/logos')

function salesManagerMain() {
    async function salesManagerStep11(req,res) {

        try {
            return res.send(graphImageCard.graphImage(logos.CelebalTech, config.salesManagerServiceList[2], config.salesManagerServiceList))
            await (1000);
        } catch (error) {
            console.error(error);
            return res.send(graphImageCard.graphImage(logos.CelebalTech, config.salesManagerServiceList, config.salesManagerServiceList[2]))
        }

    }
    return{
        salesManagerStep11
    }
    
}



module.exports = salesManagerMain
