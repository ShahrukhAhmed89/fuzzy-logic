var app = new Vue({
    el: '#container',
    data: {
      userSize: {
          collar: 40,
          shoulder: 44,
          chest: 100,
          waist: 48,
      },
      brandMeasurement:{
          collar:   [38, 40, 42, 44],
          shoulder: [42, 44, 46, 48],
          chest:    [98, 104, 110, 114],
          waist:    [46, 52, 54, 56]
      },
      recommendedSize: ""
    },
    methods: {
        calculateCollar: function(){
            let lowerLimitCollar = this.userSize.collar*.85
            let lowerLimitShoulder = this.userSize.shoulder*.85
            let lowerLimitChest = this.userSize.chest*.85
            let lowerLimitWaist = this.userSize.waist*.85


            parameterS = {
               collar:{
                    a: lowerLimitCollar, 
                    b: this.brandMeasurement.collar[0]*.965,
                    c: this.brandMeasurement.collar[0]
               },
               shoulder:{
                    a: lowerLimitShoulder, 
                    b: this.brandMeasurement.shoulder[0]*.965,
                    c: this.brandMeasurement.shoulder[0]
               },
               chest:{
                    a: lowerLimitChest, 
                    b: this.brandMeasurement.chest[0]*.965,
                    c: this.brandMeasurement.chest[0]
               },
               waist:{
                    a: lowerLimitWaist, 
                    b: this.brandMeasurement.waist[0]*.965,
                    c: this.brandMeasurement.waist[0]
               }
            }

            parameterM = {
                collar:{
                     a: lowerLimitCollar, 
                     b: this.brandMeasurement.collar[1]*.965,
                     c: this.brandMeasurement.collar[1]
                },
                shoulder:{
                     a: lowerLimitShoulder, 
                     b: this.brandMeasurement.shoulder[1]*.965,
                     c: this.brandMeasurement.shoulder[1]
                },
                chest:{
                     a: lowerLimitChest, 
                     b: this.brandMeasurement.chest[1]*.965,
                     c: this.brandMeasurement.chest[1]
                },
                waist:{
                     a: lowerLimitWaist, 
                     b: this.brandMeasurement.waist[1]*.965,
                     c: this.brandMeasurement.waist[1]
                }
            }

            parameterL = {
                collar:{
                     a: lowerLimitCollar, 
                     b: this.brandMeasurement.collar[2]*.965,
                     c: this.brandMeasurement.collar[2]
                },
                shoulder:{
                     a: lowerLimitShoulder, 
                     b: this.brandMeasurement.shoulder[2]*.965,
                     c: this.brandMeasurement.shoulder[2]
                },
                chest:{
                     a: lowerLimitChest, 
                     b: this.brandMeasurement.chest[2]*.965,
                     c: this.brandMeasurement.chest[2]
                },
                waist:{
                     a: lowerLimitWaist, 
                     b: this.brandMeasurement.waist[2]*.965,
                     c: this.brandMeasurement.waist[2]
                }
            }

            parameterXL = {
                collar:{
                     a: lowerLimitCollar, 
                     b: this.brandMeasurement.collar[3]*.965,
                     c: this.brandMeasurement.collar[3]
                },
                shoulder:{
                     a: lowerLimitShoulder, 
                     b: this.brandMeasurement.shoulder[3]*.965,
                     c: this.brandMeasurement.shoulder[3]
                },
                chest:{
                     a: lowerLimitChest, 
                     b: this.brandMeasurement.chest[3]*.965,
                     c: this.brandMeasurement.chest[3]
                },
                waist:{
                     a: lowerLimitWaist, 
                     b: this.brandMeasurement.waist[3]*.965,
                     c: this.brandMeasurement.waist[3]
                }
            }
            
            let mu = {
                small: this.degreeOfFitness(parameterS),
                medium: this.degreeOfFitness(parameterM),
                large:this.degreeOfFitness(parameterL),
                xLarge: this.degreeOfFitness(parameterXL),
            }
            this.recommendedSize =  Object.keys(mu).reduce((a, b) => {
               return mu[a] > mu[b] ? a : b;
            });
            console.log(this.recommendedSize)
        },
        getMemberShipValue: function(x, a, b, c){
            if ( a < x && x <= b ){
                return Number(((x-a)/(b-a)).toFixed(3))
            }else if(b < x && x <= c){
                return Number(((c-x)/(c-b)).toFixed(3))
            }else{
                return 0
            }
        },
        degreeOfFitness: function(param){
            let muArray = []
            for (i in param){
                muArray.push(this.getMemberShipValue(this.userSize[i], ...Object.values(param[i])))
            }
            return (Math.min(...muArray))

        }
    }
  })


// let parameter = {
//     small: {
//         a: lowerLimit, 
//         b: this.brandMeasurement.collar[0]*.965,
//         c: this.brandMeasurement.collar[0]
//     },
//     medium: {
//         a: lowerLimit, 
//         b: this.brandMeasurement.collar[1]*.965,
//         c: this.brandMeasurement.collar[1]
//     },
//     large: {
//         a: lowerLimit, 
//         b: this.brandMeasurement.collar[2]*.965,
//         c: this.brandMeasurement.collar[2]
//     },
//     xLarge: {
//         a: lowerLimit, 
//         b: this.brandMeasurement.collar[3]*.965,
//         c: this.brandMeasurement.collar[3]
//     }
// }