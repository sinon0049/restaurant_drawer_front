<template>
  <div class="card-container">
    <div class="card" id="card-1">Card1</div>
    <div class="card" id="card-2">Card2</div>
    <div class="card" id="card-3">Card3</div>
    <div class="a-group">
      <a href="#card-1">1</a>
      <a href="#card-2">2</a>
      <a href="#card-3">3</a>
    </div>
  </div>
  <footer>This is footer.</footer>
</template>

<style lang="scss" scoped>
.card-container {
  position: relative;
  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    //display: none;
  }
  width: 100%;
  height: calc(100vh - 3rem - 300px);
  .card {
    display: block;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
  }
  .card:nth-child(1) {
    background-color: grey;
  }
  .card:nth-child(2) {
    background-color: orangered;
  }
  .card:nth-child(3) {
    background-color: green;
  }
  .a-group {
    position: fixed;
    display: flex;
    width: 100px;
    justify-content: space-between;
    bottom: 350px;
    right: calc(50% - 50px);
    a {
      
    }
  }
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 300px;
  background-color: black;
  color: white;
}
</style>

<script lang="ts" setup>
let transformNum = 0;
function slide(direction: string) {
  const cards = document.querySelectorAll<HTMLDivElement>(".card");
  console.log(cards);
  if (direction === "next") transformNum -= 100;
  else transformNum += 100;

  cards.forEach((card) => {
    console.log(card);
    card.style.transform = `translateX(${transformNum}%)`;
  });
}
</script>
