import api from "@/utils/helper";
import type { restaurantRecord } from "env";

export const restaurantsAPI = {
  createRecord: function (payLoad: restaurantRecord) {
    return api.post("/restaurants", payLoad);
  },
  getRecord: function () {
    return api.get("restaurants");
  },
};
