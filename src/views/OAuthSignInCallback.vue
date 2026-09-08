<script lang="ts" setup>
import { useRouter } from "vue-router";
import { swalAlert } from "../utils/helper";

const router = useRouter();
router.push("/restDraw");
swalAlert.successMsg("Sign in successfully.");
</script>
