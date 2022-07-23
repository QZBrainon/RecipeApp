import { ENDPOINT_FOOD, ENDPOINT_DRINK, ENDPOINT_CATEGORIES_FOODS, ENDPOINT_CATEGORIES_DRINKS, ENDPOINT_DETAIL_FOOD } from "../../hooks/endpoints";
import MOCK_FOOD_DATA from "./food_data";
import MOCK_DRINKS_DATA from "./drinks_data";
import MOCK_FOOD_CATEGORY from "./food_category";
import MOCK_DRINKS_CATEGORY from "./drinks_category";
import MOCK_FOOD_DETAIL from "./food_detail";

function getMock() {
    return global.fetch = jest.fn(async (endpoint) => ({
        json: async  () => {
          if (endpoint === ENDPOINT_FOOD) {
            return MOCK_FOOD_DATA;
          }
          if (endpoint === ENDPOINT_DRINK) {
            return MOCK_DRINKS_DATA;
          }
          if (endpoint === ENDPOINT_CATEGORIES_FOODS) {
            return MOCK_FOOD_CATEGORY;
          }
          if (endpoint === ENDPOINT_CATEGORIES_DRINKS) {
            return MOCK_DRINKS_CATEGORY;
          }
          if (endpoint === ENDPOINT_DETAIL_FOOD) {
            return MOCK_FOOD_DETAIL;
          }
        }
      }))
}

export default getMock;