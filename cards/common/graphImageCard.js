var header = require('./header')
var graphData = require('../../data/database/common/graphData')
var imageApi = require('../../data/api/graphApi')
const config = require('../../utility/config')
var serviceListCard = require('./serviceList')
//const genImage = require('./generateSpendbyGraphImage')
exports.graphImage = (logo,cardTitle,serviceList) => {
  try {
    var card = header.headerWithoutAccountName(logo,cardTitle)
    /*if (cardTitle === config.purchaseManagerServiceList[0]) {
      var data = await graphData.getSpendByHeadData();
      // var image = await imageApi.spendByHeadImage(data);
      return genImage.generateImage(data, card)
    }
    else if (cardTitle === config.purchaseManagerServiceList[1]) {
      var data = await graphData.getDirectIndirect();
      var image = await imageApi.directIndirectImage(data);
    }
    else if (cardTitle === config.purchaseManagerServiceList[2]) {
      var data = await graphData.getplannedActual();
      var image = await imageApi.plannedActualImage(data);
    }
    else if (cardTitle === config.salesManagerServiceList[2]) {
      var data = await graphData.getOppPipelineData();
      // var image = await imageApi.plannedActualImage(data);
      return genImage.generatePipelineImage(data, card)
    }*/
    card['cards'][0]["sections"].push(
      {
            "widgets": [
              {
                "image": {
                  "imageUrl": "https://matplotlib.org/3.1.1/_images/sphx_glr_bar_stacked_001.png",
                  "onClick": {
                    "openLink": {
                      "url": "https://example.com/"
                    }
                  }
                }
              }
            ]
      }
    );
    return serviceListCard.cardtoDisplay(serviceList,card);
    }

    catch (error) {
      console.error(error);
      return errorMessage
    }

  }