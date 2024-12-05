<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
let url = "http://localhost:8080/vuejs-server/api.php/categories";
const name = ref("");
const description = ref("");
const router = useRouter();

const handleSubmit = async () => {
    checkValidate();
    if (NameErr.value == "" && DesErr.value == ""){
        let data = {
        name: name.value,
        description: description.value,
    };
    
    let response = await axios.post(url,JSON.stringify(data));
    if(response){
        alert(response.data.message)
        router.push("/admin/category")
    }
    }

    
};
const NameErr = ref("");
const DesErr = ref("");
const checkValidate = () => {
  if (name.value == "") {
    NameErr.value = "Bạn phải nhập tên";
  } else {
    NameErr.value = "";
  }
  if (description.value == "") {
    DesErr.value = "Bạn phải nhập mô tả";
  } else {
    DesErr.value = "";
  }
};
</script>

<template>
    <div class="p-4" style="min-height: 800px">
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Tên danh mục</label>
                <input type="text" class="form-control" id="name" v-model="name" />
                <span class="text-danger" v-if="NameErr !=''">{{ NameErr }}</span>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Mô tả</label>
                <input type="text" class="form-control" id="description" v-model="description" />
                 <span class="text-danger" v-if="DesErr !=''">{{ DesErr }}</span>

            </div>
            <button class="btn btn-success">Thêm mới</button>
        </form>
    </div>
</template>
