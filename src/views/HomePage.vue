<template>
  <div class="card-container">
    <div class="card">Card1</div>
    <div class="card">Card2</div>
    <div class="card">Card3</div>
    <button @click="slide('prev')">lb</button>
    <button class="r" @click="slide('next')">rb</button>
  </div>
  <footer>This is footer.</footer>
</template>

<style lang="scss" scoped>
.card-container {
  display: flex;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    //display: none;
  }
  width: 300%;
  height: calc(100vh - 3rem - 300px);
  .card {
    display: inline-block;
    width: 100%;
    height: 100%;
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
  button {
    position: absolute;
    top: 50%;
  }
  .r {
    right: 0;
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
