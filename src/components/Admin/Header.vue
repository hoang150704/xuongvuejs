<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    titleHeader:{
        type:String,
        required:true,
        default: "Admin",
    },

});
const logout = ()=>{
    localStorage.removeItem("userLogin");
    router.push("/login")
}
</script>
<template>
    <div class="bg-primary ps-4 pt-4" style="height: 100px; width: 100%;">
    <div class="d-flex justify-content-between ps-2 pe-3">
    <h3 class="text-light">{{ props.titleHeader }}</h3>
    <button @click.prevent="logout" class="btn btn-info">Đăng xuất</button>
    </div>
        
    </div>
</template>