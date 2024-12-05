<script setup>
import { RouterLink, } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
const urlImg = "http://localhost:8080/vuejs-server/uploads/product/"
const url = "http://localhost:8080/vuejs-server/api.php/products/";
let urlSrch = "http://localhost:8080/vuejs-server/api.php/search-product";
const listProduct = ref([]);
const callAPI = async ()=>{
    let response = await axios.get(url);
    listProduct.value = response.data
    console.log(response.data);
}
onMounted( () => {
callAPI()

})
const convertPrice = (number) => {
    return number.toLocaleString("vi-VN")
}
const productName = ref("")
const searchProduct = async () => {
    console.log(productName.value);
    
    if (productName.value != "") {
        let data = {
            product_name: productName.value
        }
        let response = await axios.post(urlSrch,data)
        listProduct.value = response.data.products
      
        
    }else{
        callAPI()
    }


}
</script>
<template>
    <div class="mt-5 container">
        <div class="d-flex justify-content-between">
            <div class="input-group" style="max-width: 500px;">
            <input type="text" class="form-control border border-dark-subtle" v-model="productName"
                placeholder="Tìm kiếm..." />
            <button class="btn btn-outline-secondary border border-dark-subtle" @click="searchProduct">
                Tìm kiếm
            </button>
        </div>
        <div>
            <h2 class="text-center">Sản phẩm của chúng tôi</h2>
        </div>
        </div>

        <div class="row">
            <div class="col-12 ">
                <ul class="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist">
                  
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab" tabindex="0">
                        <div class="row">
                            <div class="col-3 mt-3" v-for="(product, index) in listProduct" :key="index">
                                <div class="card">
                                    <img :src="urlImg + product.image" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ product.name }}</h5>
                                        <p class="card-text text-danger fw-bolder">{{ convertPrice(Number(product.price))
                                            }}<del class="fw-normal">79.000.000
                                                đ</del> <span class="badge text-bg-warning">19%</span> </p>
                                        <RouterLink :to="`/detail/${product.id}`" class="btn btn-primary">Mua ngay
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>