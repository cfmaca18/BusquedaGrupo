<template >
    <div>

        {{ proyecto }}
        <!-- <div class="container">
            <div class="row">
                <b-card>
                    <div class="row">
                        <div class="col-lg-1 col-md-1">
                            <img class="imagen" src="../assets/2.jpg" alt="">
                        </div>
                        <div class="col-lg-9">
                            <h3>{{ proyecto.nombre }}</h3>
                            <p ><span class="fw-lighter" >Estado: </span>{{ proyecto.estado }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <p class="fw-lighter">Descripcion:</p>
                        <p>{{ proyecto.descripcion }}</p>
                    </div>
                </b-card>
            </div>
        </div>  -->
    </div>
</template >
<script>
import axios from 'axios'

export default{
    name:'Lista',

    data(){
        return{
            proyecto: {
                id:null,
                nombre:null,
                descripcion:null,
                estado: null,
            }
        }
    },
    methods:{
        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("api/proyecto/"+id+"/").then(response=>{
            this.proyecto.id=response.data.id
            this.proyecto.nombre=response.data.nombre_proyecto
            this.proyecto.descripcion=response.data.descripcion
            this.proyecto.estado=response.data.estado

            });
        }   
    },
    async mounted(){
        await this.verProyecto()
    }
}
</script>
<style>
.imagen{
    width: 100%;
}

</style>