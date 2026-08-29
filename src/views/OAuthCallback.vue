<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { swalAlert } from "../utils/helper";

const route = useRoute();
const router = useRouter();
const token = route.query.token as string;
localStorage.setItem("token", token);
router.push("/restDraw");
swalAlert.successMsg("Sign in successfully.");
</script>
