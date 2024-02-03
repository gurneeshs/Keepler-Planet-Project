const {parse} = require('csv-parse');
const fs = require('fs');

const results = [];
const habitalPlanets = [];

/*Planet exists or not , 
Koi_insol (it's a measure of energy the planet gets from sun)
koi_prad (radius of planet w.r.t earth)*/
function isHabitablePlanet(planet){
    return planet["koi_disposition"] === 'CONFIRMED' 
    && planet['koi_insol']>0.36 && planet['koi_insol']< 1.11
    && planet['koi_prad'] < 1.6;
    ;
}
fs.createReadStream('Kepler_data.csv')
    .pipe(parse({
        comment:'#',
        columns: true,
    }))
    .on('data',(data)=>{
        if(isHabitablePlanet(data)){
            habitalPlanets.push(data);
        }
        results.push(data);
    })
    .on('error',(err)=>{
        console.log(err);
    }).on('end', ()=>{
        console.log(habitalPlanets.map((planet)=>{
            return [planet['kepler_name'], planet['koi_prad']];
        }));
        console.log(`${habitalPlanets.length} habital Planets found`);
    });
