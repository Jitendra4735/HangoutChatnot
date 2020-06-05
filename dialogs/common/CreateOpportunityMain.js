const config = require('../../utility/config')
const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const customerData = require('../../data/database/customerProfile/CustomerData')
const accountList = require('../../cards/accountManager/accountList');
const createOpportunityCard = require('../../cards/common/createOpportunityCard')
const createOpportunityApi = require('../../data/salesforce/createOpportunityApi')
const opportunityData = require('../../data/database/common/opportunityData')


function createOpportunityMain(){

    async function createOpportunityWaterfallStep1(req,res) {
        console.log("-----------------------------------------------------------------------")
        try{
            var customerListData = await customerData.getCustomerData(process.env.accountManagerId);
            if ((customerListData.length > 0) && (customerListData !== "")) {
                res.send(await accountList.customerListCard(customerListData, config.cardTitle.createOpportunityAccountList));
            } else {
                return res.send("No Accounts found, Please try again!")
            }
        } 
        catch (error) {
            console.error(error);
            return res.send("Error occured while showing Account List to Create Opportunity, Please try again!")
        }
    }
    /*async function createOpportunityWaterfallStep2(req,res) {
        try {
            if (req.body.action.actionMethodName === "CreateOpportunityCustomerProfile"){
                    accountDetails.accountId = step.context.activity.value.accountIdInfo
                    accountDetails.accountName = step.context.activity.value.accountNameInfo
                    await this.userData.set(step.context, accountDetails)
                
                await step.context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(createOpportunityCard.creatOpportuniy(
                        config.logoToDisplay[1], config.cardTitle.createOpportunity, accountDetails.accountName
                    ))]
                })
            } else {
                await step.next()
            }
        } catch (error) {
            console.error(error);
            await step.context.sendActivity("Error occured while showing Create Opportunity card, Please try again!")
            if (step.options.persona === config.personaList[0].nameToDisplay) {
                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.accountManagerServiceList))] })
            } else {
                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.salesManagerServiceList))] })
            }
        }
        return Dialog.EndOfTurn
    }
    async createOpportunityWaterfallStep3(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context);
            if ((step.context.activity.value && step.context.activity.value.action === config.createOpportunityAction[0])) {
                var value = step.context.activity.value
                if (value.opportunityName && value.amount && value.closeDate && value.opportunityStage &&
                    value.opportunityType && value.leadSource) {
                    var sfId = 'test';
                    if (accountDetails.accountName.toLowerCase() === 'contoso manufacturing') {
                        sfId = '0010o00002gY2YH'
                    } else {
                        sfId = '0010o00002apCVa'
                    }
                    await createOpportunityApi(value.opportunityName, value.amount, value.closeDate, value.opportunityStage,
                        value.opportunityType, value.leadSource, sfId).then(async result => {// hardcoded salesforce account id to contoso retail
                            opportunityData.createOpportunity(value.opportunityName, value.amount, value.closeDate, value.opportunityStage,
                                value.opportunityType, value.leadSource, accountDetails.accountName, accountDetails.accountId, result.id)
                            await step.context.sendActivity(`Opportunity successfully created, To access, click on **[${value.opportunityName}](https://ap8.salesforce.com/${result.id})**`);
                            if (step.options.persona === config.personaList[0].nameToDisplay) {
                                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.accountManagerServiceList))] })
                            } else {
                                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.salesManagerServiceList))] })
                            }
                        }).catch(async (error) => {
                            await step.context.sendActivity('Error occured while Create Opportunity, Please try again!');
                            return await step.beginDialog(this.id, step.options)
                        })
                }
                else {
                    await step.context.sendActivity("All fields are required. Please try again!");
                    return await step.beginDialog(this.id, step.options)
                }
            } else if ((step.context.activity.value && step.context.activity.value.action === config.createOpportunityAction[1])) {
                await step.context.sendActivity("You have cancelled Opportunity creation, here are few options you can try!");
                if (step.options.persona === config.personaList[0].nameToDisplay) {
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.accountManagerServiceList))] })
                } else {
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.salesManagerServiceList))] })
                }
            } else {
                await step.next()
            }
        } catch (error) {
            console.error(error);
            await step.context.sendActivity("Error occured while Create Opportunity, Please try again!")
            return await step.beginDialog(this.id, step.options)
        }
        return Dialog.EndOfTurn
    }
    async createOpportunityWaterfallStep4(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        return await step.beginDialog('mainWaterfall', step.options)
    }

}*/
return {
    createOpportunityWaterfallStep1
}
}


module.exports = createOpportunityMain