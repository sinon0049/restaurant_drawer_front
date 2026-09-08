<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { swalAlert } from "../utils/helper";

const route = useRoute();
const router = useRouter();

router.push("/profile");
if (route.query.status === "ACCOUNT_ALREADY_CONNECTED") {
  swalAlert.errorMsg("Account has already been connected.");
} else {
  swalAlert.successMsg("Connected successfully.");
}
</script>
