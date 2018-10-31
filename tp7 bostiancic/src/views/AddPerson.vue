<template>
  <section id="add-person">
     <el-row>
        <el-col :span="8" :offset="8"><div class="grid-content bg-purple-dark">
      
       <form-add-person></form-add-person>
       </div>
       </el-col>
     </el-row>
  </section>
</template>
<script>
import FormAddPerson from "@/components/FormAddPerson.vue";
export default {
  name: "AddPerson",
  components: {
    FormAddPerson
  }
};
</script>