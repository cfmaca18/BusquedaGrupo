<template>
  <div class="container">
    <br>
    <b-form-input v-model="searchTerm" placeholder="Buscar aprendiz con su numero de documento" @input="searchDebounced"></b-form-input>
    <div v-if="isLoading">Cargando...</div>
    <div v-else>
      <h3 class="p-3 text-center">Resultados de la búsqueda:</h3>
      <div v-if="perfiles.length > 0">
        <ul>
          <li v-for="perfil in perfiles" :key="perfil.id">
            {{ perfil.documento }} - {{ perfil.rol }} - {{ perfil.usuario }}
            <button type="button" class="btn btn-primary" @click="seleccionarPerfil(perfil)">Seleccionar</button>
          </li>
        </ul>
      </div>
      <div v-else>
        No se encontraron perfiles que coincidan con la búsqueda.
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { debounce } from 'lodash'

export default {
  name: 'CrearGrupo',
  data() {
    return {
      searchTerm: '',
      perfiles: [],
      isLoading: false
    }
  },
  methods: {
    searchDebounced: debounce(async function() {
      try {
        this.isLoading = true
        const response = await axios.get(`http://127.0.0.1:8000/api/perfil/?search=${this.searchTerm}`)
        this.perfiles = response.data
          .filter(perfil => {
            const usuario = perfil.usuario ? perfil.usuario.username : ''
            const rol = perfil.rol ? perfil.rol.nombre : ''
            const searchRegex = new RegExp(this.searchTerm, 'i')
            return searchRegex.test(perfil.documento) || 
                  searchRegex.test(usuario) ||
                  searchRegex.test(rol)
          })
          .map(perfil => {
            const usuario = perfil.usuario ? perfil.usuario.username : ''
            const rol = perfil.rol ? perfil.rol.nombre : ''
            return { ...perfil, usuario, rol }
          })

      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }, 500),
    // seleccionarPerfil(perfil) {
    //   // Implementa la lógica para seleccionar un perfil
    // }
  }
}
</script>





// <!-- <template>
//     <div class="container"><br>

//       <b-form-input placeholder="Buscar aprendiz"></b-form-input>
//       <button type="submit" class="btn btn-primary">Buscar</button>
//       <h3 class="p-3 text-center">Lista Perfiles</h3>
//       <table class="table table-striped table-bordered">
//         <thead>
//           <tr>
//             <th>Documento</th>
//             <th>Rol</th>
//             <th>Usuario</th>
//             <th>Seleccionado</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr v-for="perfil in perfil" :key="perfil.id">
//             <td>{{ perfil.documento }}</td>
//             <td>
//               <span v-if="!isLoadingRol">{{ rolNombres[perfil.rol] || 'Cargando...' }}</span>
//             </td>
//             <td>{{ usuarioNombres[perfil.usuario] || 'Cargando...' }}</td>
//             <td><input type="checkbox" v-model="perfil.seleccionado"></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </template>
  
//   <script>
//   import axios from 'axios'
  
//   export default {
//     name: 'perfil',
//     data() {
//       return {
//         error: [],
//         perfil: [],
//         rolNombres: {},
//         usuarioNombres: {},
//         isLoadingRol: false
//       }
//     },
//     methods: {
//       async getRol(url) {
//         const response = await axios.get(url)
//         return response.data.nombre
//       },
//       async getRolNombres() {
//         this.isLoadingRol = true
//         await Promise.all(
//           this.perfil.map(async perfil => {
//             const rolNombre = await this.getRol(perfil.rol)
//             this.rolNombres[perfil.rol] = rolNombre
//           })
//         )
//         this.isLoadingRol = false
//       },
//       async getUsuario(url){
//           const response = await axios.get(url)
//           return response.data.username
//       },
//       async getPerfil() {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/api/perfil/')
//           this.perfil = response.data.map(p => {
//             return {
//               ...p,
//               seleccionado: false
//             }
//           })
//           await Promise.all(
//               this.perfil.map(async perfil => {
//                   const usuarioNombre = await this.getUsuario(perfil.usuario)
//                   this.usuarioNombres[perfil.usuario] = usuarioNombre
//                   const rolNombre = await this.getRol(perfil.rol)
//                   this.rolNombres[perfil.rol] = rolNombre
//               })
//           )
//           await this.getRolNombres()
//         } catch (error) {
//           this.error = error
//         } finally {
//           this.isLoadingRol = false
//         }
//       }
//     },
//     async mounted() {
//       await this.getPerfil()
//     }
//   }
//   </script>
//    -->