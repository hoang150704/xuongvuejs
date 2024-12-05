<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { onMounted, reactive } from "vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";
const listCategory = ref([]);
const router = useRouter();
let userLogin = reactive({});
if (localStorage.getItem("userLogin") != null) {
    userLogin = JSON.parse(localStorage.getItem("userLogin"));
}

let url = "http://localhost:8080/vuejs-server/api.php/categories/";
let urlSrch = "http://localhost:8080/vuejs-server/api.php/search-product";

onMounted(async () => {
    let response = await axios.get(url);
    listCategory.value = response.data;
});
// 
const logout = () => {
    localStorage.removeItem("userLogin");
    router.push("/login")
}
const productName = ref("")
const searchProduct = async () => {
    console.log(productName.value);
    
    if (productName.value != "") {
        let data = {
            product_name: productName.value
        }
        let response = await axios.post(urlSrch,data)
        console.log(response.data);
        
    }


}
</script>
<template>
    <div>
        <div class="row text-bg-dark">
            <div class="col-12">
                <div class="container d-flex justify-content-between">
                    <div class="d-flex py-2">
                        <span class="pe-3 d-flex">Số điện thoại:
                            <p class="ps-1 m-0 text-secondary">0796385112</p>
                        </span>
                        <span class="d-flex">Địa chỉ:
                            <p class="ps-1 m-0 text-secondary">68 phố Nhổn</p>
                        </span>
                    </div>
                    <div>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a v-if="userLogin.id" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ userLogin.name }}
                                </a>
                                <a v-else class="nav-link dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </a>
                                <ul class="dropdown-menu" v-if="userLogin.id">
                                    <li >
                                        <a @click.prevent="logout" class="dropdown-item" href="#"><i
                                                class="fa-solid fa-sign-hanging pe-1"></i>Đăng xuất</a>
                                    </li>
                                    <li>
                                        <RouterLink to="/my-order" class="dropdown-item" href="#"><i
                                                class="fa-solid fa-sign-hanging pe-1"></i>Đơn hàng</RouterLink>
                                    </li>



                                </ul>
                                <ul class="dropdown-menu" v-else>
                              
                                    <li>
                                        <RouterLink to="/login" class="dropdown-item" href="#"><i
                                                class="fa-solid fa-sign-hanging pe-1"></i>Đăng nhập</RouterLink>
                                    </li>



                                </ul>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row bg-white mt-4 d-flex align-items-center">
                <div class="col-3">

                </div>
                <div class="col-2"></div>
                <div class="col-2">
                    <img src="../img/logoHDT1.png" width="150px" alt="" />
                </div>
                <div class="col-2"></div>
                <div class="col-3 d-flex flex-row-reverse">
                   <RouterLink to="/cart" class="btn btn-primary">Giỏ hàng</RouterLink>

                    
                </div>
            </div>
        </div>
        <!-- End MidHeader -->
        <!-- Header Bot -->
        <div class="row mt-4 sticky-top bg-white">
            <div class="col-12">
                <div class="container">
                    <hr />
                    <nav class="navbar navbar-expand-lg">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                                <li class="nav-item">
                                    <RouterLink to="/" class="nav-link active" aria-current="page">Trang chủ
                                    </RouterLink>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="lienhe.html">Liên hệ</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Sản phẩm
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li v-for="(category, index) in listCategory" :key="index">
                                            <RouterLink class="dropdown-item" :to="`/san-pham/${category.id}`">{{
                                                category.name }}</RouterLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
