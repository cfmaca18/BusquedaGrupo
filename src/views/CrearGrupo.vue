<template>
  <div class="container">
    <h3 class="p-3 text-center">Lista Perfiles</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Documento</th>
          <th>Rol</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="perfil in perfil" :key="perfil.id">
          <td>{{ perfil.documento }}</td>
          <td>
            <span v-if="!isLoadingRol">{{ rolNombres[perfil.rol] || 'Cargando...' }}</span>
          </td>
          <td>{{ perfil.usuario }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'perfil',
  data() {
    return {
      error: [],
      perfil: [],
      rolNombres: {},
      isLoadingRol: false
    }
  },
  methods: {
    async getRol(url) {
      const response = await axios.get(url)
      return response.data.nombre
    },
    async getRolNombres() {
      this.isLoadingRol = true
      await Promise.all(
        this.perfil.map(async perfil => {
          const rolNombre = await this.getRol(perfil.rol)
          this.rolNombres[perfil.rol] = rolNombre
        })
      )
      this.isLoadingRol = false
    },
    async getPerfil() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/perfil/')
        this.perfil = response.data
        await this.getRolNombres()
      } catch (error) {
        this.error = error
      }
    }
  },
  async mounted() {
    await this.getPerfil()
  }
}
</script>