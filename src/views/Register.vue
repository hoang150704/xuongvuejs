<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const route = useRoute();
const router = useRouter();
const url = "http://localhost:8080/vuejs-server/api.php/register";
const email = ref("");
const name = ref("");
const password = ref("");
const emailErr = ref("");
const nameErr = ref("");
const passwordErr = ref("");

// 
const handleSubmit = async () => {
  checkValidate(); // Gọi hàm kiểm tra trước khi gửi
  if (nameErr.value == "" && emailErr.value == "" && passwordErr.value == "") { // Kiểm tra lỗi trước khi gửi
    let data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    try {
      let response = await axios.post(url, data);
      if (response.status == 200) {
        alert("Bạn đã đăng ký thành công");
        // Chuyển hướng người dùng sau khi đăng ký thành công (ví dụ: về trang đăng nhập)
        router.push("/login"); 
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error); // Xử lý lỗi khi gọi API
    }
  }
};

const checkValidate = () => {
  // Kiểm tra name
  if (name.value == "") {
    nameErr.value = "Bạn cần phải nhập tên";
  } else {
    nameErr.value = "";
  }

  // Kiểm tra email
  if (email.value == "") {
    emailErr.value = "Bạn cần phải nhập email";
  } else if (!isValidEmail(email.value)) {
    emailErr.value = "Email không hợp lệ";
  } else {
    emailErr.value = "";
  }

  // Kiểm tra password
  if (password.value == "") {
    passwordErr.value = "Bạn cần phải nhập mật khẩu";
  } else if (password.value.length < 6) {
    passwordErr.value = "Mật khẩu phải có ít nhất 6 ký tự";
  } else {
    passwordErr.value = "";
  }
};

// Hàm kiểm tra định dạng email
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
</script>
<template>
    <div class="vh-100 d-flex justify-content-center align-items-center">
        <form class="w-25 border p-5" @submit.prevent="handleSubmit">
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

            <!-- Password input -->
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form2Example2">Password</label>
                <input type="password" v-model="password" id="form2Example2" class="form-control" />

                <span v-if="passwordErr != ''" class="text-danger mb-2">{{
                    passwordErr
                    }}</span>
            </div>

            <!-- 2 column grid layout for inline styling -->
            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                    <!-- Checkbox -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label class="form-check-label" for="form2Example31">
                            Remember me
                        </label>
                    </div>
                </div>

                <div class="col">
                    <!-- Simple link -->
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            <!-- Submit button -->
            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">
                Register
            </button>

            <!-- Register buttons -->
            <div class="text-center">
                <p>You are member? <RouterLink to="/login">Login</RouterLink>
                </p>
                <p>or sign up with:</p>
                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                </button>

                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                </button>

                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                </button>
            </div>
        </form>
    </div>
</template>