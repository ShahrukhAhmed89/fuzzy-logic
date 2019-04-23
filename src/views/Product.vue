<template>
    <div id="container" v-if="product">
        <main class="catalog">
            <div class="product-image">
                <div class="image-main">
                    <img :src="product.imgURLs[0]" alt="product image">
                </div>
                <div class="image-aside" v-for="(image, index) in product.imgURLs.slice(1,5)" :key="image">
                    <img :src="image" alt="">
                </div>
            </div>
            <div class="product-details">
                <h1 class="product-name">{{product.name}}</h1>
                <div class="brand-name">
                    <h3>plusS</h3>
                </div>
                <hr>
                <div class="product-price">₹.{{product.mrp}}</div>
                <div class="size-recommendation">
                    <div class="size-text">
                        <div>Sizes</div><div class="recommendation-highlight">Recommended</div>
                    </div>
                    <button class="recommendation" :class="{ active: recommendedSize=='xSmall' }">XS</button>
                    <button class="recommendation" :class="{ active: recommendedSize=='small' }">S</button>
                    <button class="recommendation" :class="{ active: recommendedSize=='medium' }">M</button>
                    <button class="recommendation" :class="{ active: recommendedSize=='large' }">L</button>
                    <button class="recommendation" :class="{ active: recommendedSize=='xLarge' }">XL</button>
                </div>
                <div class="action-buttons">
                    <a href="#" class="size-prompt" @click="addSizeModal()">What's my size</a> 
                    <button >ADD TO CART</button>
                </div>

            </div>    
        </main>
        <div class="pop-up-wrapper" v-if="showModal">
            <div class="pop-up">
                <div class="pop-up-close" @click="closeSizeModal()">X</div>
                <h2>Enter your measurments to find the perfect fit</h2>
                <div class="size-input">
                    <label for="shoulder" style="--gridArea: shoulderL">Shoulder</label>
                    <label for="bust" style="--gridArea: chestL">Bust</label>
                    <label for="bust" style="--gridArea: waistL">Waist</label>
                    <input v-model="userSize.shoulder" type="range" min="12" max="20" id="shoulder" style="--gridArea: shoulderI">
                    <input v-model="userSize.shoulder" type="number"  style="--gridArea: shoulderN">
                    <input v-model="userSize.chest" type="range" min="25" max="45" id="bust" style="--gridArea: chestI">
                    <input v-model="userSize.chest" type="number"  style="--gridArea: chestN">
                    <input v-model="userSize.waist" type="range"  min="25" max="48" id="range" style="--gridArea: waistI">
                    <input v-model="userSize.waist" type="number"    style="--gridArea: waistN">
                </div>
                <button style="--gridArea:save" @click="saveSize()">Save my size</button>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
    data(){
        return {
            userSize: {
                shoulder: 0,
                chest: 0,
                waist: 0,
            },
            recommendedSize: "",
            showModal: false,
        }
    },
    name: 'productPage',
    mounted () {
        this.$store.dispatch('getData'),
        this.getStoredData()
    },
    computed:  {
        product(){
            return (this.$store.getters.getProduct(this.$route.params.id))
        }
    },
    watch:{
        product: {
            handler(val) {
                if ( this.userSize.shoulder > 0 & this.userSize.chest > 0 & this.userSize.shoulder > 0 ){
                    this.tableLogs()
                    this.getSizeFromEstimate();

                }
            },
            deep: true
        }
    },  
    methods:{
        getStoredData(){
            let getSize = JSON.parse(localStorage.getItem('userSize'))
            if (getSize){
                this.userSize.shoulder = getSize.shoulder
                this.userSize.chest = getSize.chest
                this.userSize.waist = getSize.waist
            }
        },
        addSizeModal(){
            return this.showModal = true;
        },
        closeSizeModal(){
            return this.showModal = false;
        },
        saveSize(){
            localStorage.setItem('userSize', JSON.stringify(this.userSize));
            this.getSizeFromEstimate();
            return this.showModal = false;
        },
        getSizeFromEstimate: function(){
            let brandMeasurement = this.$store.state.brandMeasurement[this.product.knit]


            let lowerLimitShoulder = this.userSize.shoulder*.85
            let lowerLimitChest = this.userSize.chest*.85
            let lowerLimitWaist = this.userSize.waist*.85

            let parameterXS = {
                shoulder:{
                    a: lowerLimitShoulder, 
                    b: brandMeasurement.shoulder.sizeMeasure[0] * brandMeasurement.shoulder.values_fit,
                    c: brandMeasurement.shoulder.sizeMeasure[0]
               },
               chest:{
                    a: lowerLimitChest, 
                    b: brandMeasurement.chest.sizeMeasure[0] * brandMeasurement.chest.values_fit,
                    c: brandMeasurement.chest.sizeMeasure[0]
               },
               waist:{
                    a: lowerLimitWaist, 
                    b: brandMeasurement.waist.sizeMeasure[0] * brandMeasurement.waist.values_fit,
                    c: brandMeasurement.waist.sizeMeasure[0]
               }
            }

            let parameterS= {
                shoulder:{
                     a: lowerLimitShoulder, 
                     b: brandMeasurement.shoulder.sizeMeasure[1] * brandMeasurement.shoulder.values_fit,
                     c: brandMeasurement.shoulder.sizeMeasure[1]
                },
                chest:{
                     a: lowerLimitChest, 
                     b: brandMeasurement.chest.sizeMeasure[1] * brandMeasurement.chest.values_fit,
                     c: brandMeasurement.chest.sizeMeasure[1]
                },
                waist:{
                     a: lowerLimitWaist, 
                     b: brandMeasurement.waist.sizeMeasure[1] * brandMeasurement.waist.values_fit,
                     c: brandMeasurement.waist.sizeMeasure[1]
                }
            }
 
            let parameterM = {
                shoulder:{
                     a: lowerLimitShoulder, 
                     b: brandMeasurement.shoulder.sizeMeasure[2] * brandMeasurement.shoulder.values_fit,
                     c: brandMeasurement.shoulder.sizeMeasure[2]
                },
                chest:{
                     a: lowerLimitChest, 
                     b: brandMeasurement.chest.sizeMeasure[2] * brandMeasurement.chest.values_fit,
                     c: brandMeasurement.chest.sizeMeasure[2]
                },
                waist:{
                     a: lowerLimitWaist, 
                     b: brandMeasurement.waist.sizeMeasure[2] * brandMeasurement.waist.values_fit,
                     c: brandMeasurement.waist.sizeMeasure[2]
                }
            }

            let parameterL = {
                shoulder:{
                     a: lowerLimitShoulder, 
                     b: brandMeasurement.shoulder.sizeMeasure[3] * brandMeasurement.shoulder.values_fit,
                     c: brandMeasurement.shoulder.sizeMeasure[3]
                },
                chest:{
                     a: lowerLimitChest, 
                     b: brandMeasurement.chest.sizeMeasure[3] * brandMeasurement.chest.values_fit,
                     c: brandMeasurement.chest.sizeMeasure[3]
                },
                waist:{
                     a: lowerLimitWaist, 
                     b: brandMeasurement.waist.sizeMeasure[3] * brandMeasurement.waist.values_fit,
                     c: brandMeasurement.waist.sizeMeasure[3]
                }
            }

            let parameterXL = {
                shoulder:{
                     a: lowerLimitShoulder, 
                     b: brandMeasurement.shoulder.sizeMeasure[4] * brandMeasurement.shoulder.values_fit,
                     c: brandMeasurement.shoulder.sizeMeasure[4]
                },
                chest:{
                     a: lowerLimitChest, 
                     b: brandMeasurement.chest.sizeMeasure[4] * brandMeasurement.chest.values_fit,
                     c: brandMeasurement.chest.sizeMeasure[4]
                },
                waist:{
                     a: lowerLimitWaist, 
                     b: brandMeasurement.waist.sizeMeasure[4] * brandMeasurement.waist.values_fit,
                     c: brandMeasurement.waist.sizeMeasure[4]
                }
            }


            let mu = {
                xSmall: this.degreeOfFitness(parameterXS, 'xs'),
                small: this.degreeOfFitness(parameterS, 's'),
                medium: this.degreeOfFitness(parameterM, 'm'),
                large:this.degreeOfFitness(parameterL, 'l'),
                xLarge: this.degreeOfFitness(parameterXL, 'xl'),
            }

            this.recommendedSize =  Object.keys(mu).reduce((a, b) => {
               return mu[a] > mu[b] ? a : b;
            });

            console.log('--------------------------------------------')
            console.log('--------------------------------------------')

            console.log("Final Mu Values")
            console.table(mu)

            console.log(`Recommended Size is max of mu : ${this.recommendedSize}`)
        },
        getMemberShipValue: function(x, a, b, c){
            let val = 0
            if ( a < x && x <= b ){
                val = Number(((x-a)/(b-a)).toFixed(3))
                return Number(((x-a)/(b-a)).toFixed(3))
            }else if(b < x && x <= c){
                val = Number(((c-x)/(c-b)).toFixed(3))
                return Number(((c-x)/(c-b)).toFixed(3))
            }else{
                return 0
            }
        },
        degreeOfFitness: function(param, size){
            let muArray = []
            for(let i in param) {
                let test = this.getMemberShipValue(this.userSize[i], ...Object.values(param[i]))
                muArray.push(this.getMemberShipValue(this.userSize[i], ...Object.values(param[i])))
            }
            console.log('--------------------------------------------')
            console.log(`Membership values  for measurement ${size} :  ${muArray}`)
            return (Math.min(...muArray))

        },
        tableLogs: function(){
            let brandMeasurement = this.$store.state.brandMeasurement[this.product.knit]

            

            console.log("Knit Type:",  this.product.knit);
            console.log('--------------------------------------------')


            let lowerLimitShoulder = this.userSize.shoulder*.85
            let lowerLimitChest = this.userSize.chest*.85
            let lowerLimitWaist = this.userSize.waist*.85

            console.log(`Userinput: shoulder ${this.userSize.shoulder} and the Lower Limit: shoulder * .85 = ${lowerLimitShoulder}`)
            console.log(`Userinput: chest ${this.userSize.chest} and the Lower Limit: shoulder * .85 = ${lowerLimitChest}`)
            console.log(`Userinput: waist ${this.userSize.waist} and the Lower Limit: shoulder * .85 = ${lowerLimitWaist}`)
            console.log('--------------------------------------------')

            let parameterShoulder = {
                XS:{
                    a: lowerLimitShoulder, 
                    b: brandMeasurement.shoulder.sizeMeasure[0] * brandMeasurement.shoulder.values_fit,
                    c: brandMeasurement.shoulder.sizeMeasure[0]
                },
                S:{
                    a: lowerLimitShoulder, 
                    b: brandMeasurement.shoulder.sizeMeasure[1] * brandMeasurement.shoulder.values_fit,
                    c: brandMeasurement.shoulder.sizeMeasure[1]
               },
                M:{
                    a: lowerLimitShoulder, 
                    b: brandMeasurement.shoulder.sizeMeasure[2] * brandMeasurement.shoulder.values_fit,
                    c: brandMeasurement.shoulder.sizeMeasure[2]
               },
                L:{
                    a: lowerLimitShoulder, 
                    b: brandMeasurement.shoulder.sizeMeasure[3] * brandMeasurement.shoulder.values_fit,
                    c: brandMeasurement.shoulder.sizeMeasure[3]
               },
                XL:{
                    a: lowerLimitShoulder, 
                    b: brandMeasurement.shoulder.sizeMeasure[4] * brandMeasurement.shoulder.values_fit,
                    c: brandMeasurement.shoulder.sizeMeasure[4]
               },
            }

            console.log('--------------------------------------------')
            console.log("Parameter Shoulder")
            console.table(parameterShoulder)


            let parameterChest = {
                XS:{
                    a: lowerLimitChest, 
                    b: brandMeasurement.chest.sizeMeasure[0] * brandMeasurement.chest.values_fit,
                    c: brandMeasurement.chest.sizeMeasure[0]
                },
                S:{
                    a: lowerLimitChest, 
                    b: brandMeasurement.chest.sizeMeasure[1] * brandMeasurement.chest.values_fit,
                    c: brandMeasurement.chest.sizeMeasure[1]
               },
                M:{
                    a: lowerLimitChest, 
                    b: brandMeasurement.chest.sizeMeasure[2] * brandMeasurement.chest.values_fit,
                    c: brandMeasurement.chest.sizeMeasure[2]
               },
                L:{
                    a: lowerLimitChest, 
                    b: brandMeasurement.chest.sizeMeasure[3] * brandMeasurement.chest.values_fit,
                    c: brandMeasurement.chest.sizeMeasure[3]
               },
                XL:{
                    a: lowerLimitChest, 
                    b: brandMeasurement.chest.sizeMeasure[4] * brandMeasurement.chest.values_fit,
                    c: brandMeasurement.chest.sizeMeasure[4]
               },
            }

            console.log('--------------------------------------------')
            console.log("Parameter Chest")
            console.table(parameterChest)



            let parameterWaist = {
                XS:{
                    a: lowerLimitWaist, 
                    b: brandMeasurement.waist.sizeMeasure[0] * brandMeasurement.waist.values_fit,
                    c: brandMeasurement.waist.sizeMeasure[0]
                },
                S:{
                    a: lowerLimitWaist, 
                    b: brandMeasurement.waist.sizeMeasure[1] * brandMeasurement.waist.values_fit,
                    c: brandMeasurement.waist.sizeMeasure[1]
               },
                M:{
                    a: lowerLimitWaist, 
                    b: brandMeasurement.waist.sizeMeasure[2] * brandMeasurement.waist.values_fit,
                    c: brandMeasurement.waist.sizeMeasure[2]
               },
                L:{
                    a: lowerLimitWaist, 
                    b: brandMeasurement.waist.sizeMeasure[3] * brandMeasurement.waist.values_fit,
                    c: brandMeasurement.waist.sizeMeasure[3]
               },
                XL:{
                    a: lowerLimitWaist, 
                    b: brandMeasurement.waist.sizeMeasure[4] * brandMeasurement.waist.values_fit,
                    c: brandMeasurement.waist.sizeMeasure[4]
               },
            }

            console.log('--------------------------------------------')
            console.log("Parameter Waist")
            console.table(parameterWaist)

            // let mu = {
            //     xSmall: this.degreeOfFitness(parameterXS),
            //     small: this.degreeOfFitness(parameterS),
            //     medium: this.degreeOfFitness(parameterM),
            //     large:this.degreeOfFitness(parameterL),
            //     xLarge: this.degreeOfFitness(parameterXL),
            // }

            // console.log('--------------------------------------------')
            // console.log('Mu Values')
            // console.table(mu)
            
            // this.recommendedSize =  Object.keys(mu).reduce((a, b) => {
            //    return mu[a] > mu[b] ? a : b;
            // });

            // console.log(`Recommended Size: ${this.recommendedSize}`)
        },
    }
};
</script>

