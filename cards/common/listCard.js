const header = require('./header')
const cardType = require('../../utility/config').cardType
const errorMessage = require('../../utility/config').errorMessage
const config = require('../../utility/config')
const serviceListCard = require('./serviceList')
module.exports.itemListCard = (data, logo, cardTitle, action, serviceList) => {

  var card = header.headerWithoutAccountName(logo,cardTitle)
  let i = 0;
  try {
    for (let i = 0; i < data.length; i++) {
      card['cards'][0]["sections"].push(
        {
        
              "widgets": [
                {
                  "buttons": [
                    {
                      "textButton": {
                        "text": "<b>" + data[i].Description + "</b>",
                        "onClick": {
                          "action": {
                            "actionMethodName": `${action}`,
                            "parameters": [
                              {
                                "key": `${i}`,
                                "value": data[i].id
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "textParagraph": {
                    "text": data[i].date + "<font color=\"#008000\"> \t" + data[i].Status + "</font>\t" + data[i].Amount,
                  }
                }
              ]
           
        }
      )
    }
    return serviceListCard.cardtoDisplay(serviceList,card);

  }

  catch (error) {
    console.error(error);
    return errorMessage
  }
}