<script setup>
import { RouterLink, } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();
const urlImg = "http://localhost:8080/vuejs-server/uploads/product/"
const url = "http://localhost:8080/vuejs-server/api.php/products";
const listProduct = ref([]);
const callApi = async ()=>{
    let response = await axios.get(url + "?idCategory="+  route.params.id);
    listProduct.value = response.data
    console.log(url + "?idCategory="+  route.params.id);
}
onMounted(async ()=>{
    callApi() 
})
watch(
    ()=>route.params.id,
    (newIDcate)=>{
        callApi()
    }
)
const convertPrice = (number)=>{
    return number.toLocaleString("vi-VN")
}
</script>
<template>
    <div class="mt-5 container">
    <div>
        <h2 class="text-center">Sản phẩm của chúng tôi</h2>
        <p class="text-secondary text-center">Các sản phẩm thiết kế hiện đại,mới nhất</p>
    </div>
    <div class="row">
        <div class="col-12 ">
            <ul class="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist">

            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                    tabindex="0">
                    <div class="row" v-if="listProduct.length > 0 " >
                        <div class="col-3 mt-3"  v-for="(product, index) in listProduct" :key="index">
                            <div class="card">
                                <img :src="urlImg + product.image"
                                    class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">{{ product.name }}</h5>
                                    <p class="card-text text-danger fw-bolder">{{convertPrice(Number(product.price))  }}<del class="fw-normal">79.000.000
                                            đ</del> <span class="badge text-bg-warning">19%</span> </p>
                                    <RouterLink :to="`/detail/${product.id}`" class="btn btn-primary">Mua ngay</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <span class="alert alert-danger">
                            Không có sản phẩm
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>