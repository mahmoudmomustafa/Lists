<template>
  <header class="p-4 my-2">
    <h1 class="text-center text-primary font-weight-bold m-auto">ToDist<i class="fas fa-feather-alt pl-2"></i> <hr class="shadow"></h1>
  </header>
</template>

<script>
export default {
  name: "headerComp"
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Bangers&display=swap');
  h1{
    width: fit-content;
    letter-spacing: 2px;
    font-family: 'Bangers', cursive;
    hr{
      border-color: #007bff
    }
  }
</style>
