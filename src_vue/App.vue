<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  },
  mounted(){
	  console.log('I am vue file');
  }
}
</script>

<style>
.example {
  color: red;
}
</style>