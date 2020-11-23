const request=require('request');

const location = (longitude,latitude, callback) => {
 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude +','+ latitude + '.json?access_token=pk.eyJ1IjoiamV3ZWwtZXRjIiwiYSI6ImNraDR2OGo2bzAydncyc3J6NjhxeHZsNmEifQ.4oeeWfLWv5Fde0IUnCRogw&limit=1'
  
   //Object destructuring

   request({ url, json: true }, (error, {body}={}) => {
      if (error) {
         callback('Unable to connect', undefined)

      } else if (body.features.length === 0) {
         
         callback('location not found',undefined);
      }
      else {
        callback(undefined, {
             latitude:body.features[0].center[1],
           longitude:body.features[0].center[0],
           location:'Location:' + body.features[0].place_name,
        })

      }
   })
 
 }


  module.exports={
      location:location
  }