<template>
  <section id="list-person">
     <el-row>
        <el-col :span="12" :offset="6"><div class="grid-content bg-purple-dark">
          <table-persons></table-persons>
         </div>
       </el-col>
     </el-row>
  </section>
</template>
<script>
import TablePersons from "@/components/TablePersons.vue";
export default {
  name: "ListPerson",
  components: {
    TablePersons
  }
};
</script>