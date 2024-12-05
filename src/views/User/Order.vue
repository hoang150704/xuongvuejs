<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
let urlStatus = "http://localhost:8080/vuejs-server/api.php/change-status";

let urlSrch = "http://localhost:8080/vuejs-server/api.php/show_order";
const order = ref({})
const router = useRouter();

const callAPI = async ()=>{
    let user_id = JSON.parse(localStorage.getItem("userLogin")).id;
    let response = await axios.get(urlSrch+"?user_id="+user_id)
    if(response.status == 200){
        order.value = response.data
        console.log(order.value);
        
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
const handleCecel = async (id)=>{
    let check = confirm("Bạn có chắc xóa không")
    if(check){
        let response = await axios.get(urlStatus + "?order_id="+id+"&status_code=3")
        if(response.status == 200){
            alert("Hủy đơn hàng thành công")
            callAPI()
        }
    }
 
}
</script>

<template>
    <div class="row justify-content-center mt-5">
        <div class="col-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ngày đặt hàng</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                        <th>Action</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="(item,index) in order" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{convertDate(item.order_date)  }}</td>
                            <td>
                                <span v-if="item.status ==1" class="badge text-bg-warning">CHưa xác nhận</span>
                                <span v-else-if="item.status ==2" class="badge text-bg-info">Đã xác nhận</span>
                                <span v-else-if="item.status == 3" class="badge text-bg-danger">Đã hủy</span>
                                <span v-else-if="item.status == 4" class="badge text-bg-success">Đang giao hang</span>
                                <span v-else class="badge text-bg-success">Đã giao hàng</span>
                                
                            </td>
                            <td>{{ convertPrice(Number(item.total_price))  }}</td>
                            <td>
                                <button v-if="item.status == 1" class="btn btn-danger m-1" @click="handleCecel(item.order_id)">Hủy đơn</button>
                                <RouterLink :to="`detail-order/${item.order_id}`" class="btn btn-info">Xem chi tiết</RouterLink>
                            </td>
                        </tr>
                    </tbody>
                    
                
            </table>
        </div>
    </div>
</template>