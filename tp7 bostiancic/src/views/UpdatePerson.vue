<template>
  <section>
    <el-row>
        <el-col :span="8" :offset="8"><div class="grid-content bg-purple-dark">
      
    <form-update-person></form-update-person>
     </div>
       </el-col>
     </el-row>
  </section>
</template>
<script>
import FormUpdatePerson from '@/components/FormUpdatePerson.vue'
export default {
  name: 'UpdatePerson',
  components: {
    FormUpdatePerson
  }
}
</script>