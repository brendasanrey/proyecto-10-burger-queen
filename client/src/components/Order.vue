<template>
  <div>
    <nav class="navbar navbar-light bg-color fixed-top ">
      <a class="navbar-brand">
        <img src="https://image.ibb.co/cuWfzf/favicon.png" width="50" height="50" alt="">
      </a>
      <span class="text-white ml-3 title"> Burger Queen</span>
    </nav>
    <div class="mt-5 container-fluid">
      <div class="row mt-5">
        <div class="col-md-6 mt-5">
          <div class="row ">
            <div class="col-md-12">
              <div class="row text-center">
                <div class="col-md-4 col-4">
                  <button class="btn btn-lg btn-info" @click="showdrink = false, showfood = true, showextra = false">Comidas</button>
                </div>
                <div class="col-md-4 col-4">
                  <button class="btn btn-lg btn-info" @click="showdrink = true, showfood = false, showextra = false">Bebidas</button>
                </div>
                <div class="col-md-4 col-4">
                  <button class="btn btn-lg btn-info" @click="showdrink = false, showfood = false, showextra = true">Extras</button>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4 my-4" v-if="showfood" v-for="foodies in food " :key="foodies._id">
              <div class="card">
                <img class="card-img-top" :src="foodies.imageURL" alt="Card image cap" height="100px">
                <div class="card-body text-center">
                  <h5 class="title-food text-center">{{foodies.name}}</h5>
                  <a class="btn btn-danger btn-food px-2 text-white">$ {{foodies.price}}</a>
                  <button class="btn btn-warning ml-1 btn-food" v-on:click="addToOrderList(foodies)">
                    <i class=" fas fa-plus-circle "></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4 my-4" v-if="showdrink " v-for="drinks in drink " :key="drinks._id ">
              <div class="card ">
                <img class="card-img-top " :src="drinks.imageURL " alt="Card image cap " height="100px ">
                <div class="card-body text-center ">
                  <h5 class="title-food text-center ">{{drinks.name}}</h5>
                  <a class="btn btn-danger btn-food px-2 ">$ {{drinks.price}}</a>
                  <button class="btn btn-warning ml-1 btn-food " v-on:click="addToOrderList(drinks)">
                    <i class="fas fa-plus-circle "></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4 my-4 " v-if="showextra " v-for="extras in extra " :key="extras._id ">
              <div class="card ">
                <img class="card-img-top " :src="extras.imageURL " alt="Card image cap " height="100px ">
                <div class="card-body text-center ">
                  <h5 class="title-food text-center ">{{extras.name}}</h5>
                  <a class="btn btn-danger btn-food px-2 ">$ {{extras.price}}</a>
                  <button class="btn btn-warning ml-1 btn-food " v-on:click="addToOrderList(extras)">
                    <i class="fas fa-plus-circle "></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mt-5 ">
          <div class="row list ">
            <div class="col-12 text-center mt-3 ">
              <div class="row">
                <div class="col-6 text-left">
                  <h2>Orden</h2>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-primary" @click=sendOrder>Enviar</button>
                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              <ul v-if="this.orderList.length > 0" class="pl-3">
                <li v-for="element in orderList" :key="element._id" class="list-group-item my-1">
                  <div class="row">
                    <div class="col-5">{{element.name}}
                    </div>
                    <div class="col-5 text-right"> $ {{element.price}}
                    </div>
                    <div class="col-2 text-center">
                      <i class="fas fa-times-circle" v-on:click="removeToOrderLit(element)"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-12" v-if="this.orderList.length > 0">
              <div class="row">

                <div class="col-6">
                  <h3>Total:</h3>
                </div>
                <div class="col-6 text-right">
                  <h3>${{total}}</h3>
                </div>
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
      showdrink: false,
      showextra: false,
      orderList: [],
      total: 0
    };
  },
  created() {
    this.handleGetFoodList();
    this.handleGetDrinkList();
    this.handleGetExtraList();
  },
  computed: {
    ...mapGetters(["food", "drink", "extra"])
  },
  methods: {
    addToOrderList(product) {
      this.orderList.push(product);
      this.total += product.price;
    },
    handleGetFoodList() {
      this.$store.dispatch("getFoodList");
    },
    handleGetDrinkList() {
      this.$store.dispatch("getDrinkList");
    },
    handleGetExtraList() {
      this.$store.dispatch("getExtraList");
    },
    sendOrder() {
      swal({
        confirmButtonText: "Aceptar",
        type: "success",
        title: "Orden enviada a cocina",
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          this.$router.push("/");
        }
      });
      // this.$router.push("/");
    },
    removeToOrderLit(product) {
      const index = this.orderList.indexOf(product);
      this.total -= product.price;
      this.orderList.splice(index, 1);
    }
  }
};
</script>

<style>
.list {
  height: 600px;
  border: 2px solid white;
  margin-right: 1em;
  margin-left: 1em;
  background-color: rgba(243, 243, 243, 0.7);
}
.title-food {
  font-size: 14px;
}
.btn-food {
  padding-top: 1px;
  padding-bottom: 1px;
}

.title {
  font-family: "Lobster", cursive;
  font-size: 1.5em;
  letter-spacing: 0.2em;
}

.bg-color {
  background-color: #595a51 !important;
}

body {
  background-image: url("https://preview.ibb.co/kQYFX0/hotdogs.png");
  background-repeat: repeat;
  font-family: "Lato", sans-serif;
}
</style>

