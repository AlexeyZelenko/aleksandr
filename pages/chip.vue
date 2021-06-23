<template>
  <div>
    <template>
      <v-container>
        <v-row justify="space-around">
          <v-card width="400">
            <v-img
              height="200px"
              src="https://drive.google.com/uc?export=view&id=1JC9cFNcurkiOYjl3-_7C25MRGnZFWEWz"
            >
              <v-card-title
                class="white--text mt-8"
              >
                <p
                  class="ml-3"
                >
                  Щепа для копчення
                </p>
              </v-card-title>
            </v-img>

            <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">
                Характеристики
              </div>

              <v-timeline
                align-top
                dense
              >
                <v-timeline-item
                  v-for="message in messages"
                  :key="message.id"
                  :color="message.color"
                  small
                >
                  <div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Chip',
  data: () => ({
    messages: [
      {
        id: 1,
        message: 'Підходить для приготування будь якого типу продукції.',
        color: 'deep-purple lighten-1'
      },
      {
        id: 2,
        message: 'Надає прекрасний аромат, колір і смак.',
        color: 'green'
      },
      {
        id: 3,
        message: 'Підходить для копчення, як в домашніх умовах так і для промислових масштабів.',
        color: 'deep-purple lighten-1'
      },
      {
        id: 4,
        message: 'Без ароматизаторів та домішок',
        color: 'blue lighten-1'
      },
      {
        id: 5,
        message: 'Виготовлено в Україні',
        color: 'yellow'
      }
    ]
  })
}
</script>

<style scoped>

</style>
