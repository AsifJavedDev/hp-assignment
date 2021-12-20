<template>
  <div>
    <div class="container-fluid">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand"></a>
        <form v-on:submit.prevent="getAlbums"
              class="form-inline">
          <input class="form-control mr-sm-2"
                 v-model="searchTerm"
                 type="search"
                 placeholder="Search By Artist"
                 aria-label="Search">
          <button
              type="submit"
              class="btn btn-outline-success my-2 my-sm-0">
            Search
          </button>
        </form>
      </nav>
    </div>
    <div v-if="albums.length"
        class="container mt-5 py-3 bg-light">
      <div class="row">
        <div class="col-md-3">
          <div class="card-group-item">
            <div class="card-header">
              <h6 class="title">Filter Album </h6>
            </div>
            <div class="filter-content">
              <div class="card-body search-wrapper panel-heading col-sm-12 p-3 mb-2">
                <input class="form-control" type="text" v-model="searchQuery" placeholder="Search"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div v-for="track in resultQuery"
                 :key="track.id"
                 class="col-md-4">
              <div class="card h-75 p-3 ">
                <img
                    v-bind:src="track.artworkUrl100"
                    class="img-thumbnail"
                    alt="...">
                <div class="mt-5">
                  <h3 class="heading">{{ track.artistName }}</h3>
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
export default {
  data() {
    return {
      searchTerm: null,
      searchQuery: null,
      albums: []
    }
  },
  methods: {
    async getAlbums() {
      if (!this.searchTerm) {
        return false;
      }
      try {
        const response = await this.$http.get(
            "http://localhost:3000/itune",
            {
              params: {term: this.searchTerm}
            }
        );
        this.searchQuery = null
        this.albums = response.data.results
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    resultQuery() {
      if (!this.searchQuery) {
        return this.albums;
      }
      return this.albums.filter((item) => {
        return this.searchQuery.toLowerCase().split(' ').every(v => item.artistName.toLowerCase().includes(v))
      })
    }
  },
}
</script>

<style>

.bg-eee {
  background-color: #eee;
}

.card {
  border: none;
  border-radius: 10px
}

</style>