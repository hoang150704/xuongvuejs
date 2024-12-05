<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
let url = "http://localhost:8080/vuejs-server/api.php/show_order_admin";
const statusOrder = reactive({})
let urlStatus = "http://localhost:8080/vuejs-server/api.php/change-status";

const orders =  ref([])
const callAPI = async ()=>{
   let response = await axios.get(url)
   if(response.status ==200){
      orders.value = response.data
      orders.value.forEach((item)=>{
         statusOrder[item.order_id] = item.status
      })
      console.log(orders);
      
      
   }
}
onMounted(()=>{
   callAPI()
})
const convertDate =(dateStr) =>{
  // Tạo một đối tượng Date từ chuỗi ngày tháng
  const date = new Date(dateStr);

  // Lấy ra ngày, tháng và năm
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Nối các thành phần lại với nhau theo định dạng mong muốn
  const newDateStr = `${day}-${month}-${year}`;

  return newDateStr;
}
const convertPrice = (number) => {
  return number.toLocaleString("vi-VN");
};
const handleChange = async (id,statusNew)=>{
let response = await axios.get(urlStatus + "?order_id="+id+"&status_code="+statusNew)
if(response.status == 200){
   alert("Cập nhật trạng thái thành công")
   callAPI()
}
}
</script>

<template>
     <div class="p-4" style="min-height: 800px;">
        <table class="table">
         <thead>
            <tr>
               <th>STT</th>
               <th>Tên khách hàng</th>
               <th>Số điện thoại</th>
               <th>Email</th>
               <th>Ngày đặt</th>
               <th>Tổng tiền</th>
               <th>Trạng thái</th>
               <th>Action</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(item,index) in orders" :key="index">
               <td>{{ index+1 }}</td>
               <td>{{ item.customer_name }}</td>
               <td>{{ item.phone }}</td>
               <td>{{ item.email }}</td>
               <td>{{ convertDate(item.order_date) }}</td>
               <td>{{ convertPrice(Number(item.total_price)) }}</td>
               <td>
                  <select @change="handleChange(item.order_id,statusOrder[item.order_id])" v-model="statusOrder[item.order_id]">
                     <option value="1">Chưa xác nhận</option>
                     <option value="2">Đã xác nhạna</option>
                     <option value="3">Đã hủy</option>
                     <option value="4">Đang giao hàng</option>
                     <option value="5">Đã giao hàng</option>
                  </select>
               </td>
               <td><RouterLink :to="`/admin/order-detail/${item.order_id}`" class="btn btn-info">Xem chi tiết</RouterLink></td>
            </tr>
         </tbody>
        </table>
     </div>
</template>