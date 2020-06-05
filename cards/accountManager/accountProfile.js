const customerData = require('../../data/database/customerProfile/CustomerData')
const config = require('../../utility/config')
const cardHead = require('../common/header')
const logos = require('../../utility/logos')

exports.accountProfile = async (userPersonalProfileData, imageData) => {
    return new Promise(async (resolve, reject) => {
        try {
            var cardToDisplay = cardHead.headerWithoutAccountName(config.logoToDisplay[0], config.cardTitle.customerProfile)
            cardToDisplay['body'].push({
                "type": "Container",
                "items": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "style": "default",
                                "spacing": "Small",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": `${userPersonalProfileData[0].CustomerName}`,
                                        "size": "Large",
                                        "weight": "Bolder"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": `[${userPersonalProfileData[0].CompanyWebite}](${userPersonalProfileData[0].CompanyWebite})`,
                                        "size": "Small",
                                        "weight": "Lighter",
                                        "spacing": "None"
                                    }
                                ],
                                "selectAction": {
                                    "type": "Action.OpenUrl",
                                    "url": `${userPersonalProfileData[0].CompanyWebite}`
                                }
                            },
                            {
                                "type": "Column",
                                "width": "auto",
                                "style": "default",
                                "spacing": "Small",
                                "items": [
                                    {
                                        "type": "Image",
                                        "altText": "Profile Logo",
                                        "size": "Medium",
                                        "url": `${userPersonalProfileData[0].Logo}`
                                    }
                                ],
                                "verticalContentAlignment": "Center"
                            }
                        ]
                    }
                ],
                "separator": true
            }, {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "spacing": "Small",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Contact Person",
                                "weight": "Bolder",
                                "size": "Medium"
                            },
                            {
                                "type": "ColumnSet",
                                "spacing": "Small",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "spacing": "None",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "altText": "person image",
                                                "size": "Small",
                                                "url": `${logos.userIcon}`
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "spacing": "Small",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": `${userPersonalProfileData[0].PersonName}`,
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    }
                                ]
                            },
                            {
                                "type": "ColumnSet",
                                "spacing": "Small",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "spacing": "None",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "altText": "business phone image",
                                                "size": "Small",
                                                "url": `${logos.busniessPhoneIcon}`
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "spacing": "Small",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Business:",
                                                "weight": "Bolder",
                                                "spacing": "None"
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": `[+${userPersonalProfileData[0].TelephoneNumber.replace(/[^A-Z0-9]/g, "")}](+${userPersonalProfileData[0].TelephoneNumber.replace(/[^A-Z0-9]/g, "")})`,
                                                "spacing": "None",
                                                "size": "Small",
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Center",
                                        "selectAction": {
                                            "type": "Action.OpenUrl",
                                            "url": `tel:+${userPersonalProfileData[0].TelephoneNumber.replace(/[^A-Z0-9]/g, "")}`
                                        }
                                    }
                                ]
                            },
                            {
                                "type": "ColumnSet",
                                "spacing": "Small",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "spacing": "None",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "altText": "mobile image",
                                                "size": "Small",
                                                "url": `${logos.mobileIcon}`
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "spacing": "Small",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Mobile:",
                                                "weight": "Bolder",
                                                "spacing": "None"
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": `[+${userPersonalProfileData[0].MobileNumber.replace(/[^A-Z0-9]/g, "")}](+${userPersonalProfileData[0].MobileNumber.replace(/[^A-Z0-9]/g, "")})`,
                                                "spacing": "None",
                                                "size": "Small",
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Center",
                                        "selectAction": {
                                            "type": "Action.OpenUrl",
                                            "url": `tel:+${userPersonalProfileData[0].MobileNumber.replace(/[^A-Z0-9]/g, "")}`
                                        }
                                    }
                                ]
                            },
                            {
                                "type": "ColumnSet",
                                "spacing": "Small",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "spacing": "None",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "altText": "mail image",
                                                "size": "Small",
                                                "url": `${logos.mailIcon}`
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "spacing": "Small",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": `[${userPersonalProfileData[0].Email}](mailto:${userPersonalProfileData[0].Email})`,
                                                "wrap": true,
                                                "size": "Small"
                                            }
                                        ],
                                        "verticalContentAlignment": "Center",
                                        "selectAction": {
                                            "type": "Action.OpenUrl",
                                            "url": `mailto:${userPersonalProfileData[0].Email}`
                                        }
                                    }
                                ]
                            },
                            {
                                "type": "ColumnSet",
                                "spacing": "Small",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "spacing": "None",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "altText": "location image",
                                                "size": "Small",
                                                "url": `${logos.locationIcon}`
                                            }
                                        ],
                                        "verticalContentAlignment": "Center"
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "spacing": "Small",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": `[Office Location]('https://www.google.com/maps/place/N+Marketplace+Blvd,+Delta+Charter+Township,+MI+48917,+USA/@42.7388795,-84.6750431,17z/data=!3m1!4b1!4m5!3m4!1s0x8822be1e6eadeaf3:0xb2b6cf14f1359f4b!8m2!3d42.7388795!4d-84.6728544')`,
                                                "wrap": true
                                            }
                                        ],
                                        "verticalContentAlignment": "Center",
                                        "selectAction": {
                                            "type": "Action.OpenUrl",
                                            "url": "https://www.google.com/maps/place/N+Marketplace+Blvd,+Delta+Charter+Township,+MI+48917,+USA/@42.7388795,-84.6750431,17z/data=!3m1!4b1!4m5!3m4!1s0x8822be1e6eadeaf3:0xb2b6cf14f1359f4b!8m2!3d42.7388795!4d-84.6728544"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "auto",
                        "spacing": "Small",
                        "items": [
                            {
                                "type": "Image",
                                "altText": "Total Sales Data",
                                "url": `data:image/png;base64,${imageData[0]}`,
                                "size": "Large",
                                "spacing": "ExtraLarge"
                            },
                            {
                                "type": "Image",
                                "altText": "Gross Profit Data",
                                "url": `data:image/png;base64,${imageData[1]}`,
                                "size": "Large",
                                "spacing": "ExtraLarge"
                            }
                        ],
                        "verticalContentAlignment": "Center"
                    }
                ]
            })
            resolve(cardToDisplay)

        } catch (error) {
            console.error(error);
            reject(config.errorMessage)
        }
    })
}