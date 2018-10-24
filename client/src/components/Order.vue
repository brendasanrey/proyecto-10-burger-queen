<template>
<div class="mt-5 container-fluid">
    <h1>Order</h1>
    <ul v-for="food in getFoodList" :key="food._id">
      <li>
        Nombre: {{food.name}} - Precio: {{food.price}} - Turno: {{food.shift}}
      </li>
    </ul>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: "Order",
  apollo: {
    getFoodList:{
      query: gql`
      query{
        getFoodList{
          _id
          name
          price
          shift
        }
      }
      `
    }
  }
};
</script>
