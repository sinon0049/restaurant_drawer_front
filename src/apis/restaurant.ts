import api from "@/utils/helper";
import type { NewRestaurant } from "env";

export const restaurantsAPI = {
  createRecord: function (payLoad: NewRestaurant) {
    return api.post("/restaurants", payLoad);
  },
  getRecord: function () {
    return api.get("/restaurants");
  },
  deleteRecord: function (restaurantId: number) {
    return api.delete(`/restaurants/${restaurantId}`);
  },
};
