const personaList = require('../utility/config').personaList
const logos = require('../utility/logos')
const cardType = require('../utility/config').cardType
const errorMessage = require('../utility/config').errorMessage
var header = require('./common/header')
exports.showPersonaCard = (userName) => {
    var text = "Hello " + userName + ", Please select a persona";
    var card = header.headerWithoutAccountName(logos.CelebalTech, text)
    let i = 0;
    try {
        for (let i = 0; i < personaList.length; i++) {
            card['cards'][0]["sections"].push(
                {

                    "widgets": [

                        {
                            "buttons": [
                                {
                                    "textButton": {
                                        "text": `${personaList[i].nameToDisplay}`,
                                        "onClick": {
                                            "action": {
                                                "actionMethodName": `${personaList[i].nameToDisplay}`,
                                                "parameters": [
                                                    {
                                                        "key": `${personaList[i].nameToDisplay}`,
                                                        "value": "personaName"
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]


                }
            )
        }
        return card;
    }
    catch (error) {
        console.error(error);
        return errorMessage
    }

}