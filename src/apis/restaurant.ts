import { apiInstance } from "@/utils/helper";
import type { drawRestaurantRequest, NewRestaurant } from "env";

export const restaurantsAPI = {
  createRecord: function (payLoad: NewRestaurant) {
    return apiInstance.post("/restaurants", payLoad);
  },
  getRecord: function () {
    return apiInstance.get("/restaurants");
  },
  deleteRecord: function (restaurantId: number) {
    return apiInstance.delete(`/restaurants/${restaurantId}`);
  },
  drawRandomRestaurant: function (request: drawRestaurantRequest) {
    return apiInstance.post("/restaurants/draw", request);
  },
};
