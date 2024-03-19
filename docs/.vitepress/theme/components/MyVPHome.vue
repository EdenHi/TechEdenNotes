<script setup lang="ts">
import "../rainbow.css";
// import VPHomeFeatures from 'vitepress/dist/client/theme-default/components//VPHomeFeatures.vue'
import VPHomeContent from 'vitepress/dist/client/theme-default/components//VPHomeContent.vue'
import {Content, useData} from 'vitepress';
import {onMounted, onUnmounted, ref, watch} from "vue";

const {isDark} = useData()
const {frontmatter} = useData()
//
const bgCanvas = ref<HTMLCanvasElement>()
const bgCtx = ref()
const width = window.innerWidth
let height = document.body.offsetHeight;

onMounted(() => {
  if (bgCanvas.value) {
    bgCtx.value = bgCanvas.value.getContext("2d")
    bgCanvas.value.width = width
    bgCanvas.value.height = height
    bgCtx.value.fillStyle = '#05004c'
    bgCtx.value.fillRect(0, 0, width, height);
    animate();

  }
})
onUnmounted(() => {
  document.querySelectorAll("canvas").forEach(item => {
    item.remove()
  })
})
const colors = {
  bottom1: {
    true: 'rgb(10,10,5)',
    false: 'RGB(194, 178, 128)'
  },
  bottom2: {
    true: 'rgb(17,20,40)',
    false: 'RGB(177, 158, 110)'
  },
  bottom3: {
    true: '#191D4C',
    false: 'RGB(154, 136, 97)'
  },
  sky: {
    true: '#110E19',
    false: 'skyblue'
  },
}
watch(isDark, value => {
  const len = entities.length
  entities[len - 3].fillStyle = colors.bottom3[`${value}`]
  entities[len - 2].fillStyle = colors.bottom2[`${value}`]
  entities[len - 1].fillStyle = colors.bottom1[`${value}`]

})

class Terrain {
  private options
  terrain: HTMLCanvasElement;
  terCtx: CanvasRenderingContext2D | null;
  scrollDelay: any;
  lastScroll: number;
  fillStyle: any;
  mHeight: any;
  points: any[];

  constructor(options: any) {
    this.options = options
    this.terrain = document.createElement("canvas");
    this.terCtx = this.terrain.getContext("2d");
    this.scrollDelay = options.scrollDelay || 90;
    this.lastScroll = new Date().getTime();

    this.terrain.width = width;
    this.terrain.height = height;
    this.fillStyle = options.fillStyle || colors.bottom1[`${isDark.value}`];
    this.mHeight = options.mHeight || height;

    // generate
    this.points = [];
    let displacement = options.displacement || 140,
        power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));

    // set the start height and end height for the terrain
    this.points[0] = this.mHeight;//(this.mHeight - (Math.random() * this.mHeight / 2)) - displacement;
    this.points[power] = this.points[0];

    // create the rest of the points
    for (let i = 1; i < power; i *= 2) {
      for (let j = (power / i) / 2; j < power; j += power / i) {
        this.points[j] = ((this.points[j - (power / i) / 2] + this.points[j + (power / i) / 2]) / 2) + Math.floor(Math.random() * -displacement + displacement);
      }
      displacement *= 0.6;
    }

    document.body.appendChild(this.terrain);
  }

  update() {
    this.terCtx!.clearRect(0, 0, width, height);
    this.terCtx!.fillStyle = this.fillStyle;

    if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
      this.lastScroll = new Date().getTime();
      this.points.push(this.points.shift());
    }

    this.terCtx!.beginPath();
    for (let i = 0; i <= width; i++) {
      if (i === 0) {
        this.terCtx!.moveTo(0, this.points[0]);
      } else if (this.points[i] !== undefined) {
        this.terCtx!.lineTo(i, this.points[i]);
      }
    }

    this.terCtx!.lineTo(width, this.terrain.height);
    this.terCtx!.lineTo(0, this.terrain.height);
    this.terCtx!.lineTo(0, this.points[0]);
    this.terCtx!.fill();
  }
}

class Star {
  speed: number;
  size: number;
  x: any;
  y: any;

  constructor(options: { x: any; y: any; }) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * .05;
    this.x = options.x;
    this.y = options.y;
  }

  reset() {
    this.size = Math.random() * 2;
    this.speed = Math.random() * .05;
    this.x = width;
    this.y = Math.random() * height;
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.reset();
    } else {
      bgCtx.value.fillRect(this.x, this.y, this.size, this.size);
    }
  }
}

class ShootingStar {
  x: number = Math.random() * width;
  y: number = 0;
  len: number = (Math.random() * 80) + 10;
  speed: number = (Math.random() * 10) + 6;
  size: number = Math.random() + 0.1;
  waitTime: number = new Date().getTime() + (Math.random() * 3000) + 500;
  active: boolean = false;

  constructor() {
    this.reset()
  }

  reset() {
    this.x = Math.random() * width;
    this.y = 0;
    this.len = (Math.random() * 80) + 10;
    this.speed = (Math.random() * 10) + 6;
    this.size = Math.random() + 0.1;

    this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
    this.active = false;
  }

  update() {
    if (this.active) {
      this.x -= this.speed;
      this.y += this.speed;
      if (this.x < 0 || this.y >= height) {
        this.reset();
      } else {
        bgCtx.value.lineWidth = this.size;
        bgCtx.value.beginPath();
        bgCtx.value.moveTo(this.x, this.y);
        bgCtx.value.lineTo(this.x + this.len, this.y - this.len);
        bgCtx.value.stroke();
      }
    } else {
      if (this.waitTime < new Date().getTime()) {
        this.active = true;
      }
    }
  }
}

const entities: any[] = [];

for (let i = 0; i < height; i++) {
  entities.push(new Star({
    x: Math.random() * width,
    y: Math.random() * height
  }));
}

// Add 2 shooting stars that just cycle.
entities.push(new ShootingStar());
entities.push(new ShootingStar());
entities.push(new Terrain({mHeight: (height / 2) - 120}));
entities.push(new Terrain({
  displacement: 120,
  scrollDelay: 50,
  fillStyle: colors.bottom3[`${isDark.value}`],
  mHeight: (height / 2) - 60
}));
entities.push(new Terrain({
  displacement: 380,
  scrollDelay: 20,
  fillStyle: colors.bottom2[`${isDark.value}`],
  mHeight: height / 2
}));

//animate background
function animate() {
  bgCtx.value.fillStyle = colors.sky[`${isDark.value}`];
  bgCtx.value.fillRect(0, 0, width, height);
  bgCtx.value.fillStyle = '#ffffff';
  bgCtx.value.strokeStyle = '#ffffff';

  let entLen = entities.length;

  while (entLen--) {
    entities[entLen].update();
  }
  requestAnimationFrame(animate);
}

</script>

<template>
  <div class="VPHome">
    <div style="--vp-offset: calc(50% - 702px);"
         class="md-h-130 md-my-0 my-5 max-w-[1280px] px-[24px] mx-a sm-px-[48px] lg-px-[64px] flex items-center">
      <div>
        <div
            class="rainbow leading-none text-[10vw] md-text-7xl font-bold text-transparent bg-clip-text">EdenTechNotes
        </div>
        <div class="mt-6 text-[6vw] leading-15 md-leading-20 md-text-4xl">
          融合技术探索与生活分享，
          <br>
          记录点滴思考，分享独特体验。
        </div>
        <div>
        </div>
      </div>
      <div class="ml-60 relative hidden md-flex">
        <div class="w-full h-full rainbow blur-[80px] absolute">
        </div>
        <div class="text-8xl grid grid-cols-2 grid-rows-2">
          <span class="w-1/2 p-2 font-bold"
                v-for="text in 'EDEN'">{{
              text
            }}</span>
        </div>
      </div>
    </div>
    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content/>
    </VPHomeContent>
    <Content v-else/>
    <canvas id="bgCanvas" ref="bgCanvas"></canvas>
  </div>
</template>

<style scoped>

.VPHome {
  margin-bottom: 96px;
}

.rainbow {
  background-image: linear-gradient(-45deg, var(--vp-c-brand-1) 30%, var(--vp-c-brand-next));
  animation: rainbow 4s linear infinite;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}


</style>
<style>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10
}
</style>
