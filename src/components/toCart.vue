<template lang='pug'>
  #toCart(@click='toCart')
    font-awesome-icon.toCartIcon(:icon="['fas', 'shopping-cart']")
</template>

<style lang="scss" scoped>
#toCart {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: white;
  position: fixed;
  bottom: 1%;
  right: 2%;
  z-index: 2000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px #c5c4a6;
  .toCartIcon {
    transform: scale(1.8);
    color: #c5c4a6;
  }
}

@media (min-width: 768px) {
  #toCart {
    display: none;
  }
}
</style>

<script>
export default {
  name: 'ToCart',
  data () {
    return {

    }
  },
  methods: {
    toCart () {
      this.$router.push({ path: '/cart' })
    }
  },
  computed: {
  }
}
</script>
