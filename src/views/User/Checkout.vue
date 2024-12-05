<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";
const name = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");
const nameErr = ref("");
const addressErr = ref("");
const phoneErr = ref("");
const emailErr = ref("");
const router = useRouter();
let url = "http://localhost:8080/vuejs-server/api.php/cart-detail";
let urlcheckout = "http://localhost:8080/vuejs-server/api.php/check-out"
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
const totalPrice = computed(() => {
    let total = 0;
    cartDetail.value.forEach((item) => {
        total = total + item.price * item.quantity;
    });
    return total;
});

const handleSubmit = async ()=>{
    checkValidate();
  if (nameErr.value == "" && emailErr.value == "" && phoneErr.value == "" && addressErr.value == "") {
    let user_id = JSON.parse(localStorage.getItem("userLogin")).id;
    let formData = new FormData();
    formData.append("user_id",user_id);
    formData.append("name",name.value);
    formData.append("address",address.value);
    formData.append("phone",phone.value);
    formData.append("email",email.value);

    let response = await axios.post(urlcheckout,formData);
    if(response.data){
        alert("Bạn đã thanh toán thành công")
        router.push("/");
    }
  }

    
}
const checkValidate = () => {
  // Name validation
  if (name.value == "") {
    nameErr.value = "Bạn cần phải nhập tên";
  } else {
    nameErr.value = "";
  }

  // Email validation (reuse from previous example)
  if (email.value == "") {
    emailErr.value = "Bạn cần phải nhập email";
  } else if (!isValidEmail(email.value)) { 
    emailErr.value = "Email không hợp lệ";
  } else {
    emailErr.value = "";
  }

  // Phone validation
  if (phone.value == "") {
    phoneErr.value = "Bạn cần phải nhập số điện thoại";
  } else if (!isValidPhoneNumber(phone.value)) { // Implement isValidPhoneNumber
    phoneErr.value = "Số điện thoại không hợp lệ"; 
  } else {
    phoneErr.value = "";
  }

  // Address validation
  if (address.value == "") {
    addressErr.value = "Bạn cần phải nhập địa chỉ";
  } else { 
    addressErr.value = "";
  }
};
</script>

<template>
    <div class="row main-web">
        <div class="col-12">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <form class="" @submit.prevent="handleSubmit">
                            <!-- Name input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form2Example2">Name</label>
                                <input type="text" v-model="name" id="form2Example2" class="form-control" />

                                <span v-if="nameErr != ''" class="text-danger mb-2">{{
                                    nameErr
                                    }}</span>
                            </div>
                            <!-- Email input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form2Example1">Email address</label>
                                <input type="text" v-model="email" id="form2Example1" class="form-control" />

                                <span v-if="emailErr != ''" class="text-danger mb-2">{{
                                    emailErr
                                    }}</span>
                            </div>

                            <!-- Name input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form2Example2">Phone</label>
                                <input type="text" v-model="phone" id="form2Example2" class="form-control" />

                                <span v-if="phoneErr != ''" class="text-danger mb-2">{{
                                    phoneErr
                                    }}</span>
                            </div>
                            <!-- Name input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form2Example2">Address</label>
                                <input type="text" v-model="address" id="form2Example2" class="form-control" />

                                <span v-if="addressErr != ''" class="text-danger mb-2">{{
                                    addressErr
                                    }}</span>
                            </div>

                            <button class="btn btn-success">Thanh toán</button>
                        </form>
                    </div>
                    <div class="col-6">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in cartDetail" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.product_name }}</td>
                                    <td>{{ convertPrice(Number(item.price)) }}</td>
                                    <td>
                                        <span class="px-1">{{ item.quantity }}</span>
                                    </td>
                                    <td>
                                        {{
                                            convertPrice(Number(item.price) * Number(item.quantity))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4"></td>
                                    <td>Tổng tiền: {{ convertPrice(totalPrice) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>