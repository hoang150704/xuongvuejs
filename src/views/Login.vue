<script setup>
import { RouterLink, } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import axios from "axios";
const route = useRoute();
const router = useRouter();
const url = "http://localhost:8080/vuejs-server/api.php/login";
const email = ref("")
const password = ref("")
const emailErr = ref("")
const passwordErr = ref("")

const handleSubmit = async () => {
  checkValidate(); // Gọi hàm kiểm tra trước khi gửi
  if (emailErr.value == "" && passwordErr.value == "") { 
    try {
      let data = {
        email: email.value,
        password: password.value
      };
      let response = await axios.post(url, data);
      let message = response.data;

      if (message.status == true) {
        localStorage.removeItem("userLogin");
        let userLogin = {
          id: message.data.id,
          name: message.data.name,
          email: message.data.email,
          role: message.data.role
        };

        localStorage.setItem("userLogin", JSON.stringify(userLogin));

        if (message.data.role == 'user') {
          router.push("/");
        } else {
          router.push("/admin");
        }
      } else {
        alert("Tài khoản hoặc mật khẩu không đúng"); 
      }
    } catch (error) {
      console.log(`Lỗi call API ${error}`);
    }
  }
};

const checkValidate = () => {
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
  }  else {
    passwordErr.value = "";
  }
};

// Hàm kiểm tra định dạng email (sử dụng biểu thức chính quy)
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
</script>
<template>
<div class="vh-100 d-flex justify-content-center align-items-center">
    <form class="w-25 border p-5" @submit.prevent="handleSubmit">
        
        <!-- Email input -->
        <div data-mdb-input-init class="form-outline mb-4">
            <label class="form-label"  for="form2Example1">Email address</label>
            <input type="text" v-model="email" id="form2Example1" class="form-control" />
            
            <span v-if="emailErr!=''" class="text-danger mb-2">{{emailErr}}</span>
        </div>

        <!-- Password input -->
        <div data-mdb-input-init class="form-outline mb-4">
            <label class="form-label" for="form2Example2">Password</label>
            <input type="password" v-model="password" id="form2Example2" class="form-control" />
            
            <span v-if="passwordErr!=''" class="text-danger mb-2">{{passwordErr}}</span>
        </div>

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
            <div class="col d-flex justify-content-center">
                <!-- Checkbox -->
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                    <label class="form-check-label" for="form2Example31"> Remember me </label>
                </div>
            </div>

            <div class="col">
                <!-- Simple link -->
                <a href="#!">Forgot password?</a>
            </div>
        </div>

        <!-- Submit button -->
        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Login</button>

        <!-- Register buttons -->
        <div class="text-center">
            <p>Not a member? <RouterLink to="/register" >Register</RouterLink></p>
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