<template>
  <main class="card-container">
    <div class="card" id="card-1" data-id="1">
      <section>
        <p class="p-title">
          Have no idea what to eat?
          <br />
          Just draw one.
        </p>
        <p class="p-description">
          Randomly draw a restaurant nearby with one click.
        </p>
      </section>
      <img id="map" alt="" />
    </div>
    <div class="card" id="card-2" data-id="2">
      <section>
        <p class="p-title">
          Forget what you have eaten?
          <br />
          We'll keep in mind.
        </p>
        <p class="p-description">
          Check your draw record anywhere and any time.
        </p>
      </section>
      <img id="record" alt="" />
    </div>
    <div class="card" id="card-3" data-id="3">
      <section>
        <p class="p-title">Just sign in to enjoy it.</p>
        <p class="p-description">
          You can use facebook account, google account, or both.
        </p>
      </section>
      <router-link id="sign-in" to="/signin">Sign In</router-link>
    </div>
    <div class="btn-group" @click="clickEvent">
      <div class="btn" data-id="1"></div>
      <div class="btn" data-id="2"></div>
      <div class="btn" data-id="3"></div>
    </div>
  </main>
  <footer>This is footer.</footer>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .card {
    flex-direction: column;
    section {
      width: 90%;
      padding: 5%;
      text-align: center;
      .p-title {
        font-size: 36px;
      }
      .p-description {
        font-size: 18px;
      }
    }
    img {
      width: 300px;
      aspect-ratio: 16/9;
    }
    #map {
      content: url("@/../map_pc.jpg");
    }
    #record {
      content: url("@/../record_pc.jpg");
    }
  }
}
@media screen and (min-width: 768px) {
  .card {
    justify-content: space-between;
    section {
      width: 60%;
      .p-title {
        font-size: 50px;
        font-family: cursive;
      }
      .p-description {
        font-size: 20px;
        font-family: "Euclid Circular A", sans-serif;
      }
    }
    img {
      width: 200px;
      position: relative;
      right: 10%;
      aspect-ratio: 5/11;
    }
    #map {
      content: url("@/../map.jpg");
    }
    #record {
      content: url("@/../record.jpg");
    }
    #sign-in {
      position: relative;
      right: 10%;
    }
  }
}
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
  height: calc(100vh - 3rem - 100px);
  .card {
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    section {
      margin: 0 5%;
      .p-title {
        font-family: "Courier New", Courier, monospace;
        font-weight: bolder;
      }
    }
    img {
      object-fit: cover;
      border: 1px solid black;
    }
    #sign-in {
      border: 0;
      background-color: rgba(46, 44, 50, 1);
      color: white;
      width: 200px;
      height: 50px;
      border-radius: 5px;
      text-align: center;
      line-height: 50px;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .btn-group {
    position: fixed;
    display: flex;
    width: 50px;
    justify-content: space-between;
    bottom: 150px;
    right: calc(50% - 25px);
    div {
      display: flex;
      cursor: pointer;
      width: 8px;
      height: 8px;
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
  height: 100px;
  background-color: rgba(46, 44, 50, 1);
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
