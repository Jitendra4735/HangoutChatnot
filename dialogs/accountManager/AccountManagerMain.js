const accountList = require('../../cards/accountManager/accountList');
const accountProfile = require('../../cards/accountManager/accountProfile')
const config = require('../../utility/config')
const customerData = require('../../data/database/customerProfile/CustomerData')
const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const userProfileApi = require('../../data/api/userProfile')
const personaCard = require('../../cards/personaCard')

function AccountManagerMain() {
    async function accountManagerWaterfallStep1(req, res) {
        //console.log("called accountManagerWaterfallStep1");
        // showing account list 
        var errorMessage;
        try {
            var customerListData = await customerData.getCustomerData(process.env.accountManagerId);
            // checking if customer data is there or not
            if ((customerListData.length > 0) && (customerListData !== "")) {
                // displaying customer list
               //let customerListCard = await accountList.customerListCard(customerListData, config.cardTitle.customerList);
               let serviceListCard=serviceList.cardtoDisplay(config.accountManagerServiceList) 
               //return res.send(customerListCard)
               return res.send(serviceListCard)
            } else {
                errorMessage = "No Accounts found, Please try again!"
                return res.send(errorMessage);
            }
        } catch (error) {
            console.error(error);
            errorMessage = "Error occured while showing Account List, Please try again!";
            return res.send(errorMessage);
        }

    }
    return {
        accountManagerWaterfallStep1
    };

}
module.exports = AccountManagerMain;
