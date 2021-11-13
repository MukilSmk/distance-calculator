
const express = require('express')
const axios = require('axios')
const { response, json } = require('express')

const app  = express()
app.use(express.json());

const PORT = process.env.PORT || 3000
const API_KEY = process.env.API_KEY


app.listen(PORT, ()=>{
    console.log(`Server is running onport ${PORT}`)

} )
//  app.use((req, res, next) => {
//  const err = new Error('Not found');
//  err.status = 404;
//  next(err);
//  });



app.get('/', (req, res )=>{
    res.send("Distance Matrix")
})


app.get('/distance', (req, res )=>{

  const origins = req.query.origins
  const destinations = req.query.destinations
  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${process.env.API_KEY}`,
    headers: { }
  };
  
   axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data.rows[0].elements[0].distance.text));
  const distance = response.data.rows[0].elements[0].distance.text;
  res.json({status:true,distance:distance});
  // res.send('The distance is', distance);

})
.catch(function (error) {
  console.log(error);
  res.json({status: true,error: error })
});
})



// https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101%2C-73.89188969999998&destinations=40.659569%2C-73.933783&key=AIzaSyCGX6aGjOeMptlBNc0WF3vhm0SPMl1vNBE