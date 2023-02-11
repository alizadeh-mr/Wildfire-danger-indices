// Import the necessary data sources
var Dem = ee.Image("USGS/3DEP/10m");
var Ecoregions3_M = ee.FeatureCollection("users/alizadehmr1/Wildfire/Ecoregions_L3_Merged");
var Burn_Severity = ee.ImageCollection("users/alizadehmr1/Burn_severity");
var Forest = ee.Image("users/alizadehmr1/Wildfire/Forest");
var Burned_Areas3 = ee.FeatureCollection("users/alizadehmr1/Wildfire/MTBS_Burned_Areas3");
var table = ee.FeatureCollection("users/alizadehmr1/Wildfire/MTBS_Burned_Areas2");

// Define a dictionary for storing the calculated values for each Ecoregion
var regionDictionary = ee.Dictionary();

// Loop through each Ecoregion
for (var r = 1; r < 86; r++) {
  var Ecoregion = r;
  var regions = Ecoregions3_M.filter(ee.Filter.eq("US_L3CODE", Ecoregion.toString()));
  
  // Add the regions to the map
  Map.addLayer(regions.draw('red'));
  
  // Mask the Forest image
  var maskedForest = ee.Image(Forest.eq(0));
  var ForestMasked = maskedForest.updateMask(maskedForest).eq(1);
  
  // Mask the Dem image with the masked Forest image
  var DemForest = Dem.mask(ForestMasked);
  
  // Create a list of mask images for different elevation intervals
  var MaskInterv1 = ee.Image(DemForest.gt(0).and(DemForest.lte(500)));
  var MaskInterv2 = ee.Image(DemForest.gt(500).and(DemForest.lte(1000)));
  var MaskInterv3 = ee.Image(DemForest.gt(1000).and(DemForest.lte(1500)));
  var MaskInterv4 = ee.Image(DemForest.gt(1500).and(DemForest.lte(2000)));
  var MaskInterv5 = ee.Image(DemForest.gt(2000).and(DemForest.lte(2500)));
  var MaskInterv6 = ee.Image(DemForest.gt(2500).and(DemForest.lte(3000)));
  var MaskInterv7 = ee.Image(DemForest.gt(3000));
  
  // Create a list for storing the calculated values
  var list = ee.List([]);
  
  // Calculate the total burned area for each elevation interval
  var AreaIntrv1 = MaskInterv1.multiply(ee.Image.pixelArea());
  var TBAMaskedInterv1 = AreaIntrv1.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: regions.geometry(),
    scale: 300,
    maxPixels: 1e13
  });
  var TBAMaskedInterv1 = ee.Number(TBAMaskedInterv1.get('elevation')).
