<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const url = "http://localhost:8080/vuejs-server/api.php/users";
const listAccounts = ref("");
onMounted(async () => {
  let response = await axios.get(url);
  listAccounts.value = response.data;
});
// Xóa
const handleDelete = async (id)=>{
   let check = confirm("Bạn có muốn xóa không")
   if(check){
      let response = await axios.delete(url + "/" + id )
      alert(response.data.message)
      let response2 = await axios.get(url);
      listAccounts.value = response2.data;
   }
}

</script>

<template>
  <div class="p-4" style="min-height: 800px">
   <RouterLink class="btn btn-success" to="/admin/add-account">Thêm mới</RouterLink>
    <table class="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in listAccounts" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ account.name }}</td>
          <td>{{ account.email }}</td>
          <td>{{ account.role }}</td>
          <td>{{ account.note }}</td>
          <td>
            <RouterLink :to="`/admin/update-account/${account.id}`" class="btn btn-warning me-2">Sửa</RouterLink>
            <button @click="handleDelete(account.id)" class="btn btn-danger" >Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>