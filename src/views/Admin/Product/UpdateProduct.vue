<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
let url = "http://localhost:8080/vuejs-server/api.php/products/";
let urlCtg = "http://localhost:8080/vuejs-server/api.php/categories";
const urlImg = "http://localhost:8080/vuejs-server/uploads/product/";
//
const router = new useRouter();
const route = new useRoute();
const name = ref("");
const description = ref("");
const price = ref("");
const image = ref(null);
const category_id = ref("");
const listCategory = ref([]);
const oldImg = ref("");
//
const NameErr = ref("");
const DescriptionErr = ref("");
const PriceErr = ref("");
const CategoryErr = ref("");

//
onMounted(async () => {
  let responsePro = await axios.get(url + route.params.id)
  name.value = responsePro.data.name
  description.value = responsePro.data.description
  price.value = responsePro.data.price
  category_id.value = responsePro.data.category_id
  oldImg.value = responsePro.data.image
  console.log(responsePro.data);

  // 
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
    formData.append("_method","PUT");

    let response = await axios.post(url + route.params.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status == 200) {
      alert("Sửa sản phẩm thành công");
      router.push("/admin/product");
    } else {
      alert("Sửa sản phẩm thất bại");
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
        <select class="form-select" v-model="category_id" aria-label="Default select example">
          <option value="" hidden>Chọn category</option>
          <option v-for="(category, index) in listCategory" :key="index" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <span class="text-danger" v-if="CategoryErr != ''">{{ CategoryErr }}</span>
      <div class="mb-3">
        <label for="description" class="form-label">Ảnh</label>
        <div class="my-2"> <img v-if="oldImg != null" :src="urlImg + oldImg" width="50px" alt="" />
          <span v-else class="badge text-bg-warning">Không có ảnh</span>
        </div>
        <input type="file" class="form-control" @change="handleChange" id="image" accept="image/*" />
      </div>
      <button class="btn btn-success">Sửa</button>
    </form>
  </div>
</template>
