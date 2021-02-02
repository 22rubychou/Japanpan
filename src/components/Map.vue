<template>
  <div style="height: 100%; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="withTooltip">
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
        >
          <img class="img" src='../assets/fox_top.png'>
        </l-icon>
          <l-tooltip :options="{ permanent: true, interactive: true }">
          <div style="color:#967f7a;font-size:1rem;text-align:center;font-weight: 400;">
            呷胖胖位置<br>
            台北市中正區忠孝西路1段49號
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";
.img {
  width: 5rem;
  position: absolute;
  top: -2.5rem;
  left: -2.5rem;
}
</style>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip, LIcon } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LIcon
  },
  data () {
    return {
      zoom: 17,
      center: latLng(25.0475613, 121.5173399),
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      withTooltip: latLng(25.0475613, 121.5173399),
      currentZoom: 11.5,
      currentCenter: latLng(25.0475613, 121.5173399),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      iconSize: [32, 37]
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    }
  }
}
</script>
