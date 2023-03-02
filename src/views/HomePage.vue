<template>
  <div class="card-container">
    <div class="card" id="card-1" data-id="1"><h1>card1</h1></div>
    <div class="card" id="card-2" data-id="2"><h1>card2</h1></div>
    <div class="card" id="card-3" data-id="3"><h1>card3</h1></div>
    <div class="btn-group" @click="clickEvent">
      <div class="btn" data-id="1"></div>
      <div class="btn" data-id="2"></div>
      <div class="btn" data-id="3"></div>
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
  .btn-group {
    position: fixed;
    display: flex;
    width: 80px;
    justify-content: space-between;
    bottom: 350px;
    right: calc(50% - 40px);
    div {
      display: flex;
      cursor: pointer;
      width: 10px;
      height: 10px;
      border: 1px solid grey;
      border-radius: 50%;
      background-color: transparent;
      flex-shrink: 0;
    }
    .active {
      background-color: grey;
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
import { onMounted } from "vue";

//change card when clicking button
let cardNum = 1;
function clickEvent(e: Event) {
  const target = e.target as HTMLElement;
  const cardContainer =
    document.querySelector<HTMLDivElement>(".card-container");
  const btn = document.querySelectorAll<HTMLDivElement>(".btn");
  if (target.classList.contains("btn")) {
    cardNum = Number(target.dataset.id);
    if (cardContainer) {
      cardContainer.scrollLeft =
        (cardNum - 1) * document.documentElement.scrollWidth;
    }
    btn.forEach((b: HTMLDivElement) => {
      if (Number(b.dataset.id) === cardNum) b.classList.add("active");
      else b.classList.remove("active");
    });
  }
}

// change style of button when scrolling
onMounted(() => {
  const btn = document.querySelectorAll<HTMLDivElement>(".btn");
  const observeCb = function (entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLDivElement;
        const id = target.dataset.id;
        btn.forEach((b) => {
          if (b.dataset.id === id) b.classList.add("active");
          else b.classList.remove("active");
        });
      }
    });
  };
  const scrollEvent = new IntersectionObserver(observeCb, { threshold: 0.5 });
  const cards = document.querySelectorAll<HTMLDivElement>(".card");
  cards.forEach((card) => scrollEvent.observe(card));
});
</script>
