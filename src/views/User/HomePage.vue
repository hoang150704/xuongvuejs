<script setup>
import  {RouterView, RouterLink}  from 'vue-router';
import Header from '@/components/User/Header.vue';
import Footer from '@/components/User/Footer.vue';
import { useRoute } from 'vue-router';
import { watch,ref } from 'vue';
const route = new useRoute();
const titleHeader = ref("");
</script>


<template>
        <div class="container-fluid">
        <div class="row">
            <!-- Main -->
            
                <!-- Header -->
                <Header/>
                <!-- ENd header -->
                <!-- COntent -->
                <RouterView />
                <!-- End content -->
                <!-- Footer -->
                <Footer />
                <!-- End footer -->
           
            <!-- ENd main -->
        </div>
    </div>
</template>
<style scoped lang="css">
    
</style>