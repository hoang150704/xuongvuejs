<script setup>
import  {RouterView, RouterLink}  from 'vue-router';
import sidebar from '@/components/Admin/Sidebar.vue';
import Header from '@/components/Admin/Header.vue';
import Footer from '@/components/Admin/Footer.vue';
import { useRoute } from 'vue-router';
import { watch,ref } from 'vue';
const route = new useRoute();
const titleHeader = ref("");
watch (
    ()=>route.name,
    (newName)=>{
        switch (newName){
            case "dashboard":{
                titleHeader.value = "Admin | Dashboard";
                document.title = "Admin Dashboard";
                break;
            }
            case "category":{
                titleHeader.value = "Admin | Danh mục";
                document.title = "Admin Danh mục";
                break;
            }
            case "addcategory":{
                titleHeader.value = "Admin | Thêm danh mục";
                document.title = "Admin Thêm danh mục";
                break;
            }
            case "updatecategory":{
                titleHeader.value = "Admin | Cập nhật danh mục";
                document.title = "Admin Cập nhật danh mục";
                break;
            }
            case "product":{
                titleHeader.value = "Admin | Sản phẩm";
                document.title = "Admin Sản phẩm";
                break;
            }
            case "order":{
                titleHeader.value = "Admin | Đơn hàng";
                document.title = "Admin Đơn hàng";
                break;
            }
            case "account":{
                titleHeader.value = "Admin | Tài khoản";
                document.title = "Admin Tải khoản";
                break;
            }
            case "addaccount":{
                titleHeader.value = "Admin | Thêm tài khoản";
                document.title = "Admin Tải khoản";
                break;
            }
            case "updateaccount":{
                titleHeader.value = "Admin | Cập nhật tài khoản";
                document.title = "Admin Tài khoản";
                break;
            }
            
        }
    },{immediate:true}
)
</script>


<template>
        <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <sidebar />
            <!-- End sibar -->
            <!-- Main -->
            <div class="col-9 offset-3 p-0 position-relative">
                <!-- Header -->
                <Header :titleHeader ="titleHeader" />
                <!-- ENd header -->
                <!-- COntent -->
                <RouterView />
                <!-- End content -->
                <!-- Footer -->
                <Footer />
                <!-- End footer -->
            </div>
            <!-- ENd main -->
        </div>
    </div>
</template>
<style scoped lang="css">
    
</style>