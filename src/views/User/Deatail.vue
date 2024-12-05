<script setup>
import { RouterLink, useRouter, } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();
const router = useRouter();
const urladdCart = "http://localhost:8080/vuejs-server/api.php/cart/";
const urlImg = "http://localhost:8080/vuejs-server/uploads/product/"
const url = "http://localhost:8080/vuejs-server/api.php/product-detail";
const product = ref([]);
const callApi = async ()=>{
    let response = await axios.get(url + "?product_id=" +route.params.id);
    product.value = response.data.products
    console.log(product);
    

}
onMounted(async ()=>{
    callApi() 
})

const quantity = ref(1)
const convertPrice = (number)=>{
    return number.toLocaleString("vi-VN")
}
// 
const addCart = async ()=>{
    if(quantity.value>=1){
        //let link = `/cart/${product.value.id}/${quantity.value}`
        let url = urladdCart + "?product_id="+product.value.id + "&quantity="+quantity.value + "&user_id="+JSON.parse(localStorage.getItem("userLogin")).id
        console.log(url);
        
        let response = await axios.get(url)
        alert(response.data.message);
        
       
        
    }else{
        alert("Số lượng phải lớn hơn bằng 1")
    }
}
</script>
<template>
<div class="container">
    <div class="row">
        <div class="col-12">
            <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
                class="border" aria-label="breadcrumb">
                <ol class="breadcrumb m-0 py-2 ps-3">
                    <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{product.name}}</li>
                </ol>
            </nav>
        </div>
    </div>
    <!-- End breadcump -->
    <!-- Sản phầm -->
    <div class="card mt-4 border-0">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="urlImg + product.image" v-if="product.image != null"
                    class="img-fluid rounded-start" alt="..."> 
                    <span v-else class="text-bg-warning p-1 ">Không có ảnh</span>
            </div>
            <div class="col-md-4">
                <div class="card-body">
                    <h5 class="card-title">{{product.name}}</h5>
                    <span class="card-text fw-bold fs-3 text-danger">{{product.price }} đ</span>
                    <p class="card-text m-0">Giá chính hãng: <del>590.000 đ</del></p>
                    <p class="card-text">Tiết kiệm lên tới: <span class="fw-bold fs-3 text-danger">100.000 đ</span>
                    </p>
                    <p class="card-text">Danh mục: {{product.categoryName}}</p>
                    <p class="card-text">Moo tar: {{product.description}}</p>
                    <div class="d-flex align-items-center ">
                        <p class="m-0 pe-2">Số lượng:</p>
                        <input type="number" class="w-25" v-model="quantity" >
                    </div>
                    <div class="mt-3 d-flex flex-column">
                        <button class="btn btn-primary mb-3" @click="addCart">Thêm vào giỏ hàng</button>
                 
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
            <div class="col-3">
                <ul class="list-group">
                    <li class="list-group-item"><i class="fa-solid fa-truck pe-1"></i>Miễn phí vận chuyển toàn quốc
                    </li>
                    <li class="list-group-item"><i class="fa-solid fa-phone pe-1"></i>Hõ trợ 24/7</li>
                    <li class="list-group-item"> <i class="fa-solid fa-rotate-right pe-1"></i>Đổi trả hàng trong
                        vòng 7 ngày</li>
                    <li class="list-group-item"> <i class="fa-solid fa-ticket-simple pe-1"></i>Ưu đãi lên đến 50%
                    </li>
                    <li class="list-group-item"><i class="fa-solid fa-circle-check pe-1"></i>Sản phẩm chính hãng
                    </li>
                </ul>
            </div>
        </div>
    </div>

</div>
</template>