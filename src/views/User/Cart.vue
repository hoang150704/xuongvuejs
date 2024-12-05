<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";

let urlUp = "http://localhost:8080/vuejs-server/api.php/cart-update";
let url = "http://localhost:8080/vuejs-server/api.php/cart-detail";
const cart = ref({});
const cartDetail = ref([]);

const callAPi = async () => {
  let user_id = JSON.parse(localStorage.getItem("userLogin")).id;
  let response = await axios.get(url + "/?user_id=" + user_id);
  if (response.data.status) {
    cart.value = response.data.cart;
    cartDetail.value = response.data.cart_details;
    console.log(cartDetail);
  }
};

onMounted(() => {
  callAPi();
});
const convertPrice = (number) => {
  return number.toLocaleString("vi-VN");
};
const totalPrice = computed(()=>{
    let total = 0;
    cartDetail.value.forEach(item=>{
        total = total+(item.price * item.quantity)
    })
    return total;
})
// 
const updateQuantity = async (actions,product_id)=>{
    let link = urlUp + "/?cart_id="+cart.value.id
     + "&action="+actions
      + "&product_id="+product_id
    let response = await axios.get(link)
    if(response.status ==200){
        alert("Bạn đã update giỏ hàng thành công")
        callAPi()
        
    }
    
}
</script>

<template>
  <div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <tr v-if="cartDetail.length == 0">
                <td colspan="6"><p>Không có sản phẩm trong giỏ hàng. <RouterLink to="/">Tiếp tục mua hàng</RouterLink></p></td>
            </tr>
          <tr v-else v-for="(item, index) in cartDetail" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ convertPrice(Number(item.price)) }}</td>
            <td>
                <button class="btn btn-info" @click="updateQuantity('decrease',item.product_id)">-</button>
                <span class="px-1">{{ item.quantity }}</span>
                <button class="btn btn-info" @click="updateQuantity('increase',item.product_id)">+</button>
            </td>
            <td>{{ convertPrice(Number(item.price) * Number(item.quantity))  }}</td>
            <td><button class="btn btn-danger" @click="updateQuantity('delete',item.product_id)">Xoa</button></td>
          </tr>
          <tr>
            <td colspan="5"></td>
            <td>Tổng tiền: {{ convertPrice(totalPrice) }}</td>
            <td><RouterLink to="/checkout" class="btn btn-danger">Thanh toán</RouterLink></td>
          </tr>
        </tbody>
      </table>
      <!--  -->
    </div>
  </div>
</template>