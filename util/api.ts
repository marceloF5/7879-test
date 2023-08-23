/*

    Simple wrapper around API call to get data:
    For documentation you can go to: https://www.graphqlbin.com/v2/new and enter endpoint address (https://fe-test-server-7879-86f4b8c36d73.herokuapp.com/)


    intended use:

    const portfolioQuery = `{
      portfolio {
        id //Portfolio ID
        currentBalance {
          goldBalance // weight in grams of gold
          platinumBalance // weight in grams of platinum
        }
        history {  //Array of dates with the total value
        date_app
           goldValue { // gold value on date
            currency
            amount
          }
          platinumValue { // platinum value on date
            currency
            amount
          }
          totalValue { // overall value on date
            currency
            amount
          }

        }
        portfolioItems {  //What items are in the portfolio
          image
          sku
          name
          purchasePrice
          weight
          metal
        }
      }
    }`;
    await query(portfolioQuery)
 */
import { request, RequestDocument } from "graphql-request";

const API_ENDPOINT = "https://fe-test-server-7879-86f4b8c36d73.herokuapp.com/";

export const query = (query: RequestDocument) => request(API_ENDPOINT, query);
