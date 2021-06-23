<template>
  <div>
    <template>
      <v-card
        max-width="375"
        class="mx-auto"
      >
        <v-img
          src="https://drive.google.com/uc?export=view&id=1CLUg5PIEDS91Y0RZywyEmR2_jmObrUca"
          height="300px"
          dark
        >
          <v-row class="fill-height">
            <v-card-title>
              <v-btn
                dark
                icon
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>

              <v-spacer />

              <v-btn
                dark
                icon
                class="mr-4"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                dark
                icon
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer />

            <v-card-title class="white--text pl-12 pt-12">
              <div class="display-1 pl-12 pt-12">
                Олександр
              </div>
            </v-card-title>
          </v-row>
        </v-img>

        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-phone
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>(073) 485-04-26</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-phone
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>(097) 766-12-51</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-map-marker
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Ukraine</v-list-item-title>
              <v-list-item-subtitle>Cherkasy</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Contacts'
}
</script>

<style scoped>

</style>
