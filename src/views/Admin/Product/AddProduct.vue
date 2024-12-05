<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
let url = "http://localhost:8080/vuejs-server/api.php/products";
let urlCtg = "http://localhost:8080/vuejs-server/api.php/categories";
//
const router = new useRouter();
const name = ref("");
const description = ref("");
const price = ref("");
const image = ref(null);
const category_id = ref("");
const listCategory = ref([]);
//
const NameErr = ref("");
const DescriptionErr = ref("");
const PriceErr = ref("");
const CategoryErr = ref("");

//
onMounted(async () => {
  let response = await axios.get(urlCtg);
  listCategory.value = response.data;
  console.log(response.data);
});
//
const handleChange = (event) => {
  const file = event.target.files[0];
  image.value = file;
  console.log(image);
};
const handleSubmit = async () => {
  checkValidate();
  if (
    NameErr.value == "" &&
    DescriptionErr.value == "" &&
    PriceErr.value == "" &&
    CategoryErr.value == "" 
    
  ) {
    let formData = new FormData();

    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("image", image.value);
    formData.append("category_id", category_id.value);

    let response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status == 200) {
      alert("Thêm sản phẩm thành công");
      router.push("/admin/product");
    } else {
      alert("Thêm sản phẩm thất bại");
    }
  }
};

const checkValidate = () => {
  if (name.value == "") {
    NameErr.value = "Bạn cần phải nhập tên sản phẩm";
  } else {
    NameErr.value = "";
  }

  if (description.value == "") {
    DescriptionErr.value = "Bạn cần phải nhập mô tả";
  } else {
    DescriptionErr.value = "";
  }

  if (price.value == "") {
    PriceErr.value = "Bạn cần phải nhập giá";
  } else {
    PriceErr.value = "";
  }

  if (category_id.value == "") {
    CategoryErr.value = "Bạn cần phải chọn một danh mục";
  } else {
    CategoryErr.value = "";
  }
};
</script>

<template>
  <div class="p-4" style="min-height: 800px">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" />
        <span class="text-danger" v-if="NameErr != ''"> {{ NameErr }}</span>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input type="text" class="form-control" id="description" v-model="description" />
        <span class="text-danger" v-if="DescriptionErr != ''">{{ DescriptionErr }}</span>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Price</label>
        <input type="text" class="form-control" id="description" v-model="price" />
        <span class="text-danger" v-if="PriceErr != ''">{{ PriceErr }}</span>
      </div>
      <div class="mb-3">
        <select
          class="form-select"
          v-model="category_id"
          aria-label="Default select example"
        >
          <option value="" hidden>Chọn category</option>
          <option
            v-for="(category, index) in listCategory"
            :key="index"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <span class="text-danger" v-if="CategoryErr != ''">{{ CategoryErr }}</span>
      <div class="mb-3">
        <label for="description" class="form-label">Ảnh</label>
        <input
          type="file"
          class="form-control"
          @change="handleChange"
          id="image"
          accept="image/*"
        />
      </div>
      <button class="btn btn-success">Thêm mới</button>
    </form>
  </div>
</template>
