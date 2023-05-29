<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"><img src="./assets/images/tomato.png" alt="" width="30" height="24"
          class="d-inline-block align-text-top" /></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/info" class="nav-link">Info</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pumps" class="nav-link">Pumps</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/update" class="nav-link">Update</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/teste" class="nav-link">Teste</router-link>
          </li>
        </ul>
        <form class="d-flex" role="login">
          <button type="button" class="btn btn-outline-success">Login</button>
          <button type="button" class="btn btn-danger ms-3">Register</button>
        </form>
      </div>

    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    username() {
      return this.$route.params.username
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>