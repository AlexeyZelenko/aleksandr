<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Послуга
          </th>
          <th class="text-left">
            Ціна
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in services"
          :key="item.name"
          class="text-left"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.cost }} грн</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'PriceTrees',
  data () {
    return {
      services: [
        {
          name: 'Вирубка',
          cost: 1000
        },
        {
          name: 'Вивіз',
          cost: 500
        },
        {
          name: 'Аренда 1година',
          cost: 1000
        },
        {
          name: 'Вирубка, обробка, вивіз',
          cost: 0
        },
        {
          name: 'Обробка, вивіз',
          cost: 0
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
