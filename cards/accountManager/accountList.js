const customerData = require('../../data/database/customerProfile/CustomerData')
const config = require('../../utility/config')
const cardHead = require('../common/header')

exports.customerListCard = async (customerListData, cardTitle) => {
    let action = `${config.accountListAction}`
    if(cardTitle === config.cardTitle.createOpportunityAccountList)
    {
        action = "CreateOpportunityCustomerProfile"
    }
    console.log(action,":::::::::::::::::::::::::::::::::::::")
    return new Promise((resolve, reject) => {
        try {
            console.log("called customerListCard");
            var cardToDisplay = cardHead.headerWithoutAccountName(config.logoToDisplay[0], cardTitle)
            for (let i = 0; i < customerListData.length; i++) {
                console.log("called customerListData.length");
                cardToDisplay['cards'][0]["sections"][0]["widgets"][0]["buttons"].push(
                    {
                        "textButton": {
                            "text": `${customerListData[i].CustomerName}`,
                            "onClick": {
                                "action": {
                                    "actionMethodName": `${action}`,
                                    "parameters": [
                                        {
                                            "key": `${i}`,
                                            "value": `${customerListData[i].CustomerId}`
                                        }
                                    ]
                                }
                            }
                        }
                    }

                )
            }
            resolve(cardToDisplay)
        }
        catch (error) {
            console.error(error);
            reject(config.errorMessage)
        }
    })

}