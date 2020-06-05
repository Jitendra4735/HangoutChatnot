
const databaseConnection = require('../../data/database/DatabaseConnection')
const personaCard = require('../../cards/personaCard')
const config = require('../../utility/config')
const customerData = require('../../data/database/customerProfile/CustomerData')

const SalesManagerMain = require('../salesManager/SalesManagerMain')
const PurchaseManagerMain = require('../purchaseManager/PurchaseManagerMain')
const AccountManagerMain = require('../accountManager/AccountManagerMain')
const InvoiceMain = require('../accountManager/invoiceMain')
const ReceiveablesMain = require('../accountManager/receiveablesMain')
const OpportunityMain = require('../common/OpportunityMain')
const SalesMain = require('../common/SalesMain')
const PrMain = require('../purchaseManager/PRMain')
const PoMain = require('../purchaseManager/POMain')
const { CFOMain, CFOWaterfall } = require('../cfo/CFOMain')
const TeamMain = require('../common/teamMemberMain')
const graphImageMain = require('../common/GraphImageMain')
const { detailbyId, detailByIdWaterfall } = require('../common/findDetailbyID')
const CreateOpportunityMain = require('../common/CreateOpportunityMain')
const purchaseManagerMain = new PurchaseManagerMain();
const prMain = new PrMain();
const poMain = new PoMain();
const teamMain = new TeamMain();
let persona = ''
// declaring dialog variable
function MainDialog() {

    /*async function mainDialogStep1(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context) // creating object to store details of account
            if (accountDetails === undefined) {
                accountDetails = {}
                await this.userData.set(step.context, accountDetails)
            }
            if (step.context.activity.value === undefined) {
                step.context.activity.value = {}
            }
            if (step.context.activity.text) {
                var luisResult = await this.recognizer.recognize(step.context) // recognizing luis results
                this.topIntent = await LuisRecognizer.topIntent(luisResult); //extracting intent from it
                let details = await this.getAccoutId(step, step.context.activity.text) // fetching account details based on account name
                let id = await this.getId(step, step.context.activity.text) // fetching deatils of id to be used in all functionalities
                // checking intent or action to move to next flow
                if (this.topIntent) {
                    step.context.activity.value.action = this.topIntent.replace(/_/g, " ") // assigning intent value to action to ease flow
                    await step.next();
                } else {
                    await step.next();
                }
            }
            else {// if nothing matches show persona card
                if (step.context.activity.value && step.context.activity.value.id) {
                    accountDetails.Id = step.context.activity.value.id
                    await this.userData.set(step.context, accountDetails)
                }
                await step.next();
            }
        } catch (error) {
            console.error("---", error);
            await step.context.sendActivity("I'm still learning, could not understand this. Here are few options you can try!");
            return await this.beginDialog('mainWaterfall')
        }

        return Dialog.EndOfTurn
    }*/
    async function mainDialogStep2(req, res) {
        const accountManagerMain = new AccountManagerMain();
        const invliceMain = new InvoiceMain();
        const receiveablesMain = new ReceiveablesMain();
        const saleMain = new SalesMain();
        const opportunityMain = new OpportunityMain()
        const salesManagerMain = new SalesManagerMain()
        const createOpportunityMain = new CreateOpportunityMain()
        var accountId = '0000000052';
        try {
            if (req.body.type == 'MESSAGE' || req.body.type == 'CARD_CLICKED') {
                switch (req.body.message.text || req.body.action.actionMethodName) {


                    case config.personaList[0].nameToDisplay: case config.accountListAction:
                        accountManagerMain.accountManagerWaterfallStep1(req, res);
                        break;
                    /*case config.personaList[1].nameToDisplay:
                        return await step.beginDialog('salesManagerWaterfall', step.options)*/
                    case config.personaList[2].nameToDisplay:
                        persona = config.personaList[2].nameToDisplay
                        purchaseManagerMain.purchaseManagerWaterfallStep1(req, res);
                        break;

                    /*case config.personaList[1].nameToDisplay:
                        salesManagerMain.salesManagerStep11(req, res);
                        break;
                    /*case config.personaList[3].nameToDisplay:
                        return await step.beginDialog('CFOWaterfall', step.options)
                    // routing services in account manager persona
                    // case config.accountManagerServiceList[0]: case config.listCardAction.opportunity: case config.salesManagerServiceList[1]:
                    //     return await step.beginDialog('opportunityWaterfall', step.options)
                    case config.accountManagerServiceList[1]:
                        return await step.beginDialog('createOpportunityWaterfall', step.options)*/
                    // case config.accountManagerServiceList[2]: case config.listCardAction.sales: case config.salesManagerServiceList[0]:
                    //     return await step.beginDialog('salesWaterfall', step.options)
                    // case config.accountManagerServiceList[3]: case config.listCardAction.invoice:
                    //     return await step.beginDialog('invoiceWaterfall', step.options)
                    // case config.accountManagerServiceList[4]: case config.listCardAction.receiveables:
                    //     return await step.beginDialog('receiveablesWaterfall', step.options)

                    /*case config.accountManagerServiceList[5]:
                        console.log("CCCCCCCCCCCCCCCCCCC")

                        accountDetails.accountName = null
                        accountDetails.accountId = null
                        await this.userData.set(step.context, accountDetails)
                        return await step.replaceDialog('accountManagerWaterfall', step.options)
                    /*case config.accountManagerServiceList[6]:
                        console.log("DDDDDDDDDDDDD")

                        accountDetails = {}
                        await this.userData.set(step.context, accountDetails)
                        await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(personaCard.cardToDisplay(step.context.activity.from.name))] })
                        break;*/
                    // routing services in purchase manager persona
                    case "CreateOpportunityCustomerProfile":
                        console.log(req.body,"{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{")
                        break;
                    case config.accountManagerServiceList[1]: case config.salesManagerServiceList[6]:
                        createOpportunityMain.createOpportunityWaterfallStep1(req,res)
                        break;
                    case config.salesManagerServiceList[4]: case config.salesManagerServiceList[0]:
                        saleMain.salesStep1(req, res, null)
                        break;
                    case config.purchaseManagerServiceList[0]: case config.purchaseManagerServiceList[1]: case config.purchaseManagerServiceList[2]: case config.salesManagerServiceList[2]: case config.personaList[1].nameToDisplay:
                        salesManagerMain.salesManagerStep11(req, res)
                        break;
                    case config.salesManagerServiceList[1]: case config.salesManagerServiceList[5]:
                        opportunityMain.opportunityWaterfallStep1(null, res);
                        break;
                    case config.purchaseManagerServiceList[3]:
                        teamMain.teamWaterfallStep1(req, res, persona)
                        break;
                    case config.purchaseManagerServiceList[4]:
                        prMain.prWaterfallStep1(req, res);
                        break;
                    case config.listCardAction.pr:
                        prMain.prWaterfallStep2(req, res)
                        break;
                    case config.purchaseManagerServiceList[5]:
                        poMain.poWaterfallStep1(req, res);
                        break;
                    case config.listCardAction.po:
                        poMain.poWaterfallStep2(req, res);
                        break;
                    case config.accountManagerServiceList[3]:
                        invliceMain.invoiceList(accountId, res);
                        break;
                    case config.accountManagerServiceList[4]:
                        receiveablesMain.receiveablesList(accountId, res);
                        break;
                    case config.accountManagerServiceList[2]:
                        saleMain.salesStep1(req, res);
                        break;
                    case config.accountManagerServiceList[0]:
                        opportunityMain.opportunityWaterfallStep1(accountId, res);
                        break;
                    case config.listCardAction.sales:
                        saleMain.salesStep2(req, res)
                        break;
                    case config.listCardAction.opportunity:
                        opportunityMain.opportunityWaterfallStep2(req, res)
                        break;
                    case config.listCardAction.invoice:
                        invliceMain.invoiceDetail(req, res)
                        break;
                    case config.listCardAction.receiveables:
                        receiveablesMain.receiveablesDetail(req, res)
                        break;
                    default:
                        let card = personaCard.showPersonaCard(req.body.message.sender.displayName);
                        return res.json(card)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function mainDialogStep3(step) {
        return await step.beginDialog('mainWaterfall', { "persona": "mainWaterfall" })
    }

    async function getAccoutId(step, text) {
        try {
            let accountDetails = await this.userData.get(step.context);
            if (text.toLowerCase().includes("contoso")) {
                let temp = text.toLowerCase().split(" ");
                var index = temp.indexOf("contoso")
                var account = temp[index].trim() + " " + temp[index + 1].trim()
                await customerData.getCustomerData(process.env.accountManagerId).then(async customerListData => {
                    for (let i = 0; i < customerListData.length; i++) {
                        if (customerListData[i].CustomerName.trim().toLowerCase() === account.trim().toLowerCase()) {
                            accountDetails.accountId = customerListData[i].CustomerId
                            accountDetails.accountName = customerListData[i].CustomerName
                            await this.userData.set(step.context, accountDetails)
                            return accountDetails
                        } else if (i === customerListData.length) {
                            return config.errorMessage
                        }
                    }
                })
            } else {
                return config.errorMessage
            }
        } catch (error) {
            console.error(error);
            return config.errorMessage
        }
    }

    async function getId(step, text) {
        try {
            let accountDetails = await this.userData.get(step.context);
            if (/\d/.test(text)) {
                let temp = text.split(" ");
                for (let j = 0; j < temp.length; j++) {
                    if (/\d/.test(temp[j].trim())) {
                        accountDetails.Id = temp[j].trim()
                        await this.userData.set(step.context, accountDetails)
                        if (temp.length === 1) {
                            this.topIntent = null
                        }
                        return accountDetails
                    } else if (j === temp.length) {
                        return config.errorMessage
                    }
                }
            } else {
                return config.errorMessage
            }
        } catch (error) {
            console.error(error);
            return config.errorMessage
        }
    }
    return {
        mainDialogStep2
    }
}

module.exports = MainDialog;

