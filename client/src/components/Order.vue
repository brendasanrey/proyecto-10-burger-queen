<template>
  <div class="mt-5 container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="row text-center">
              <div class="col-md-4">
                <button class="btn btn-lg btn-info">Comidas</button>
              </div>
              <div class="col-md-4">
                <button class="btn btn-lg btn-info" @click="showdrink = true">Bebidas</button>
              </div>
              <div class="col-md-4">
                <button class="btn btn-lg btn-info">Extras</button>
              </div>
            </div>
          </div>
          <div class="col-6  col-lg-6 my-4" v-for="foodies in food " :key="foodies._id">
            <div class="card">
              <img class="card-img-top" :src="foodies.imageURL" alt="Card image cap" height="150px">
              <div class="card-body text-center">
                <h5 class="title-food text-center">{{foodies.name}}</h5>
                <a href="#" class="btn btn-danger btn-food px-2">$ {{foodies.price}}</a>
                <a href="#" class="btn btn-warning ml-1 btn-food">
                  <i class="fas fa-plus-circle"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-6  col-lg-6 my-4" v-for="drinks in drink " :key="drinks._id">
            <div class="card">
              <img class="card-img-top" :src="drinks.imageURL" alt="Card image cap" height="150px">
              <div class="card-body text-center">
                <h5 class="title-food text-center">{{drinks.name}}</h5>
                <a href="#" class="btn btn-danger btn-food px-2">$ {{drinks.price}}</a>
                <a href="#" class="btn btn-warning ml-1 btn-food">
                  <i class="fas fa-plus-circle"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Order",
  data() {
    return {
      showfood: true,
      showdrink: false
    };
  },
  created() {
    this.handleGetFoodList();
    this.handleGetDrinkList();
  },
  computed: {
    ...mapGetters(["food", "drink"])
  },
  methods: {
    handleGetFoodList() {
      if (this.showfood) {
        this.$store.dispatch("getFoodList");
      }
    },
    handleGetDrinkList() {
      if (this.showdrink) {
        this.$store.dispatch("getDrinkList");
      }
    }
  }
};
</script>

<style>
.title-food {
  font-size: 14px;
}
.btn-food {
  padding-top: 1px;
  padding-bottom: 1px;
}
</style>
