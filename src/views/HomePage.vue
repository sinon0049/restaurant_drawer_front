<template>
  <div class="card-container" @scroll="test">
    <div class="card" id="card-1">Card1</div>
    <div class="card" id="card-2">Card2</div>
    <div class="card" id="card-3">Card3</div>
    <div class="btn-group" @click="slide">
      <button data-id="1">1</button>
      <button data-id="2">2</button>
      <button data-id="3">3</button>
    </div>
  </div>
  <footer>This is footer.</footer>
</template>

<style lang="scss" scoped>
.card-container {
  position: relative;
  display: flex;
  overflow: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  height: calc(100vh - 3rem - 300px);
  .card {
    scroll-snap-align: start;
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
  .btn-group {
    position: fixed;
    display: flex;
    width: 100px;
    justify-content: space-between;
    bottom: 350px;
    right: calc(50% - 50px);
    button {
      cursor: pointer;
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
let cardNum = 1;

function slide(e: Event) {
  const target = e.target as HTMLElement;
  const cardContainer =
    document.querySelector<HTMLDivElement>(".card-container");
  const btn = document.querySelectorAll<HTMLButtonElement>("button");
  if (target.tagName === "BUTTON") {
    cardNum = Number(target.dataset.id);
    if (cardContainer) {
      cardContainer.scrollLeft =
        (cardNum - 1) * document.documentElement.scrollWidth;
    }
    btn.forEach((b: HTMLButtonElement) => {
      if (Number(b.dataset.id) === cardNum) b.classList.add("active");
      else b.classList.remove("active");
    });
  }
}

function test(e: Event) {
  
}
</script>
