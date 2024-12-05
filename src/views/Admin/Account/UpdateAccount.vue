<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
let url = "http://localhost:8080/vuejs-server/api.php/users/";
// Thêm
const name = ref("");
const note = ref("");
const email = ref("");
const role = ref("");
const password = ref("");
const router = useRouter();
const route = useRoute();
//
const NameErr = ref("");
const EmailErr = ref("");
const PasswordErr = ref("");
const NoteErr = ref("");
const RoleErr = ref("");
//
onMounted(async () => {
  let response = await axios.get(url + route.params.id);
  console.log(response);

  if (response) {
    name.value = response.data.name;
    email.value = response.data.email;
    note.value = response.data.note;
    role.value = response.data.role;
  }
});
//
const handleSubmit = async () => {
  checkValidate();
  if (
    NameErr.value == "" &&
    EmailErr.value == "" &&
    PasswordErr.value == "" &&
    NoteErr.value == "" &&
    RoleErr.value == ""
  ) {
    // COde sửa ở đây
    // COde sửa ở đây
    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("note", note.value);
    formData.append("role", role.value);
    formData.append("password", password.value);

    let response = await axios.post(url + route.params.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    //
    console.log(response);

    alert(response.data.message);
    router.push("/admin/account");
  }
};

const checkValidate = () => {
  if (name.value == "" || name.value == null || name.value == undefined) {
    NameErr.value = "Bạn cần phải nhập tên";
  } else {
    NameErr.value = "";
  }
  //
  if (email.value == "" || email.value == null || email.value == undefined) {
    EmailErr.value = "Bạn cần phải nhập email";
  } else {
    EmailErr.value = "";
  }
  //
  if (password.value == "" || password.value == null || password.value == undefined) {
    PasswordErr.value = "Bạn cần phải nhập mật khẩu";
  } else {
    PasswordErr.value = "";
  }
  //
  if (note.value == "" || note.value == null || note.value == undefined) {
    NoteErr.value = "Bạn cần phải nhập ghi chú";
  } else {
    NoteErr.value = "";
  }
  //
  if (role.value == "" || role.value == null || role.value == undefined) {
    RoleErr.value = "Bạn cần phải chọn quyền";
  } else {
    RoleErr.value = "";
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
        <label for="description" class="form-label">Email</label>
        <input type="text" class="form-control" id="description" v-model="email" />
        <span class="text-danger" v-if="EmailErr != ''">{{ EmailErr }}</span>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Password</label>
        <input type="password" class="form-control" id="description" v-model="password" />
        <span class="text-danger" v-if="PasswordErr != ''">{{ PasswordErr }}</span>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Note</label>
        <input type="text" class="form-control" id="description" v-model="note" />
        <span class="text-danger" v-if="NoteErr != ''">{{ NoteErr }}</span>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Quyền</label>
        <select v-model="role" class="form-select" aria-label="Default select example">
          <option value="" hidden>Chọn quyền</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <span class="text-danger" v-if="RoleErr != ''">{{ RoleErr }}</span>
      </div>
      <button class="btn btn-success">Sửa</button>
    </form>
  </div>
</template>
