<template>
  <div>
    <nav class="navbar navbar-light bg-color">
      <a class="navbar-brand">
        <img src="https://image.ibb.co/cuWfzf/favicon.png" width="50" height="40" alt="">
      </a>
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" href="/order">
            <i class="fas fa-plus-circle"></i> Nueva orden </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="fas fa-clipboard-list"></i> Ordenes</a>
        </li>
      </ul>
    </nav>
    <div class="mt-5 container-fluid">
      <div class="row mt-5">
        <div class="col-md-6">
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
                <img class="card-img-top" :src="foodies.imageURL" alt="Card image cap" height="120px">
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
                <img class="card-img-top " :src="drinks.imageURL " alt="Card image cap " height="120px ">
                <div class="card-body text-center ">
                  <h5 class="title-food text-center ">{{drinks.name}}</h5>
                  <a class="btn btn-danger btn-food px-2 text-white">$ {{drinks.price}}</a>
                  <button class="btn btn-warning ml-1 btn-food " v-on:click="addToOrderList(drinks)">
                    <i class="fas fa-plus-circle "></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4 my-4 " v-if="showextra " v-for="extras in extra " :key="extras._id ">
              <div class="card ">
                <img class="card-img-top " :src="extras.imageURL " alt="Card image cap " height="120px ">
                <div class="card-body text-center ">
                  <h5 class="title-food text-center ">{{extras.name}}</h5>
                  <a class="btn btn-danger btn-food px-2 text-white">$ {{extras.price}}</a>
                  <button class="btn btn-warning ml-1 btn-food " v-on:click="addToOrderList(extras)">
                    <i class="fas fa-plus-circle "></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="row list ">
            <div class="col-12 text-center mt-3 ">
              <div class="row">
                <div class="col-6 text-left">
                  <h3>Nueva orden</h3>
                </div>
                <div class="col-6 text-right" v-if="this.orderList.length > 0">
                  <button class="btn btn-primary" @click=sendOrder> Enviar
                    <i class="fas fa-share text-white"></i>
                  </button>
                </div>
                <div class="col-12 text-left mt-3" v-if="this.orderList.length > 0">
                  <input v-model="client" type="client" class="form-control" placeholder="Nombre de cliente">
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
                      <i class="fas fa-times-circle pointer" v-on:click="removeToOrderLit(element)"></i>
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
      client: "",
      orderList: [],
      productsList: [],
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
      this.productsList.push(product.name);
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
          this.$store.dispatch("addOrder", {
            products: this.productsList,
            total: this.total,
            client: this.client
          });
          // this.$router.push("/");
        }
      });
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
a {
  color: #17a2b8;
}

a:hover {
  color: #000;
}
.list {
  height: 550px;
  border: 2px solid white;
  margin-right: 1em;
  margin-left: 1em;
  background-color: rgba(243, 243, 243, 0.7);
}
.title-food {
  font-size: 17px;
  font-weight: bold;
}
.btn-food {
  padding-top: 1px;
  padding-bottom: 1px;
}

.pointer {
  cursor: pointer;
}

.title {
  font-family: "Lobster", cursive;
  font-size: 1.5em;
  letter-spacing: 0.2em;
}

.bg-color {
  background-color: rgba(243, 243, 243, 0.7) !important;
}

body {
  background-image: url("https://preview.ibb.co/mpHkH0/bg1.png");
  background-repeat: repeat;
  font-family: "Lato", sans-serif;
}
</style>


