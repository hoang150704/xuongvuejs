<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let url = "http://localhost:8080/vuejs-server/api.php/order_detail";
const orderDetail = ref([])

const callAPI = async () => {
    let response = await axios.get(url + "?order_id=" + route.params.id)
    if (response.status == 200) {
        orderDetail.value = response.data
        console.log(response.data);

    }
}
onMounted(() => {
    callAPI()
})
const convertPrice = (number) => {
  return number.toLocaleString("vi-VN");
};
</script>

<template>
    <div class="row justify-content-center mt-5">
        <div class="col-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in orderDetail" :key="index">
                        <td>{{ index+1 }} </td>
                        <td>
                            <RouterLink target="_blank" :to="`/detail/${item.product_id}`">{{ item.product_name }}</RouterLink>
                            
                            
                            </td>
                        <td>{{ convertPrice(Number(item.price)) }}</td>
                        <td>{{ item.quantity }}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>