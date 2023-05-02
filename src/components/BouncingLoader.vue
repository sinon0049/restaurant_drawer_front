<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  height: calc(100% - 3rem);
  margin: 0 auto;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    width: 20px;
    height: 20px;
    background-color: #20222a;
    border-radius: 50%;
    animation: spin 0.8s alternate infinite;
  }

  & div:nth-child(2) {
    animation-delay: 0.2s;
  }

  & div:nth-child(3) {
    animation-delay: 0.4s;
  }
}

@keyframes spin {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-30px);
    opacity: 0.1;
  }
}
</style>
