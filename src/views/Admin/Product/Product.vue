<script setup>
import { RouterLink, } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
const urlImg = "http://localhost:8080/vuejs-server/uploads/product/"
const url = "http://localhost:8080/vuejs-server/api.php/products/";
const listProduct = ref([]);
onMounted(async () => {
  let response = await axios.get(url);
  listProduct.value = response.data;
  console.log(response.data);
});

const handleDelete = async (id)=>{
  let check = confirm("Bạn có muốn xóa không !!");
  if(check){
    let response = await axios.delete(url + id)
    if(response){
      alert(response.data.message)
    }
    let response2 = await axios.get(url);
    listProduct.value = response2.data;
  }
}
</script>

<template>
  <div class="p-4" style="min-height: 800px">
    <RouterLink to="add-product" class="btn btn-primary">Thêm mới</RouterLink>
    <table class="table">
      <thead>
        <tr>
          <td>STT</td>
          <td>Name</td>
          <td>Category</td>
          <td>Description</td>
          <td>Price</td>
          <td>Image</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in listProduct" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.categoryName          }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <img
              v-if="product.image != null"
              :src="urlImg + product.image"
              width="50px"
              alt=""
            />
            <span v-else class="badge text-bg-warning">Không có ảnh</span>
          </td>
          <td>
            <RouterLink :to="`/admin/update-product/${product.id}`" class="btn btn-warning me-2">Sửa</RouterLink>
            <button @click="handleDelete(product.id)" class="btn btn-danger">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
