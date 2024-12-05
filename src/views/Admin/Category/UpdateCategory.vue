<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
let url = "http://localhost:8080/vuejs-server/api.php/categories/";
const route = useRoute();
const name = ref("");
const description = ref("");
const router = useRouter();
onMounted(async () => {
  let response = await axios.get(url + route.params.id);
  if (response) {
    name.value = response.data.name;
    description.value = response.data.description;
  }
});

//
const handleSubmit = async () => {
  checkValidate();
  if (NameErr.value == "" && DesErr.value == "") {
    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", name.value);
    formData.append("description", description.value);

    let response = await axios.post(url + route.params.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response) {
      alert(response.data.message);
      router.push("/admin/category");
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
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="description"
        />
        <span class="text-danger" v-if="DesErr !=''">{{ DesErr }}</span>
      </div>
      <button class="btn btn-success">Chỉnh sửa</button>
    </form>
  </div>
</template>
