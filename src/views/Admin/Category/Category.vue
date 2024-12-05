<script setup>
let url = "http://localhost:8080/vuejs-server/api.php/categories/"
import { onMounted, ref } from 'vue';
import axios from 'axios';
const listCategory = ref([]);

onMounted(async ()=>{
    let response = await axios.get(url)
    listCategory.value = response.data
})

const handleDelete = async (id)=>{
    const check = confirm("Bạn có muốn xóa không")
    if(check){
        let response = await axios.delete(url+id)
        alert(response.data.message)
        let response2 = await axios.get(url)
        listCategory.value = response2.data
    }
}
</script>

<template>
     <div class="p-4" style="min-height: 800px;">
        <RouterLink to="/admin/add-category" class="btn btn-success">Thêm danh mục</RouterLink>
        <h1>Quản lí danh mục</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category,index) in listCategory" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ category.name }}</td>
                    <td>{{ category.description }}</td>
                    <td>
                        <RouterLink class="btn btn-warning me-2" :to="`/admin/update-category/${category.id}`" >Sửa</RouterLink>
                       
                        <button @click="handleDelete(category.id)" class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
     </div>
</template>