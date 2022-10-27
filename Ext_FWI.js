var Dem = ee.Image("USGS/3DEP/10m"),
    GRIDMET = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET"),
    PRISM_Daily = ee.ImageCollection("OREGONSTATE/PRISM/AN81d"),
    PRISM_Monthly = ee.ImageCollection("OREGONSTATE/PRISM/AN81m"),
    PDSI = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE"),
    NDVI = ee.ImageCollection("NOAA/CDR/AVHRR/NDVI/V5"),
    Ecoregions3_M = ee.FeatureCollection("users/alizadehmr1/Wildfire/Ecoregions_L3_Merged"),
    Burn_Severity = ee.ImageCollection("users/alizadehmr1/Burn_severity"),
    Forest = ee.Image("users/alizadehmr1/Wildfire/Forest"),
    Burned_Areas3 = ee.FeatureCollection("users/alizadehmr1/Wildfire/MTBS_Burned_Areas3"),
var year = 2020
// Use ee.Filter.calendarRange to filter by year and month
// var imageCollection = PDSI.select('pdsi');
// var imageCollection = NDVI.select('NDVI');
// var imageCollection = PRISM_Daily.select('tmean');
// var imageCollection = GRIDMET.select('tmmn');
// var imageCollection = GRIDMET.select('tmmx');
// var imageCollection = GRIDMET.select('bi');
// var imageCollection = GRIDMET.select('vpd');
// var imageCollection = GRIDMET.select('erc');
// var imageCollection = GRIDMET.select('fm100');
var imageCollection = GRIDMET.select('fm1000');
// var imageCollection = GRIDMET.select('sph');

var imageCollection = imageCollection.filter(ee.Filter.calendarRange(year ,year ,'year'))
// .filter(ee.Filter.calendarRange(121,273,'day_of_year'));  // May to September
// var img = imageCollection.filter(ee.Filter.calendarRange(year,year ,'year'))
// .filter(ee.Filter.calendarRange(5,9,'month')); 

// Thresholds ERC=60, BI=60, FM100=8%. FM1000=10%, VPd=2
var threshold = 60
var maskFunction = function(img){
  var mask = img.gt(threshold)
  return mask
}
var img = imageCollection.map(maskFunction)

// reduce image collection with sum()
var data = img.sum();

var Mask_Interv_1 = ee.Image(Dem.gt(ee.Number(0)).and(Dem.lte(ee.Number(500))));
var Mask_Interv_2 = ee.Image(Dem.gt(ee.Number(500)).and(Dem.lte(ee.Number(1000))));
var Mask_Interv_3 = ee.Image(Dem.gt(ee.Number(1000)).and(Dem.lte(ee.Number(1500))));
var Mask_Interv_4 = ee.Image(Dem.gt(ee.Number(1500)).and(Dem.lte(ee.Number(2000))));
var Mask_Interv_5 = ee.Image(Dem.gt(ee.Number(2000)).and(Dem.lte(ee.Number(2500))));
var Mask_Interv_6 = ee.Image(Dem.gt(ee.Number(2500)).and(Dem.lte(ee.Number(3000))));
var Mask_Interv_7 = ee.Image(Dem.gt(ee.Number(3000)));

var data_1 = data.mask(Mask_Interv_1)
var data_2 = data.mask(Mask_Interv_2)
var data_3 = data.mask(Mask_Interv_3)
var data_4 = data.mask(Mask_Interv_4)
var data_5 = data.mask(Mask_Interv_5)
var data_6 = data.mask(Mask_Interv_6)
var data_7 = data.mask(Mask_Interv_7)

Map.addLayer(data_1,{min: 0.0, max: 4000.0, gamma: 1},"data_1");
Map.addLayer(data_2,{min: 0.0, max: 4000.0, gamma: 1},"data_2");
Map.addLayer(data_3,{min: 0.0, max: 4000.0, gamma: 1},"data_3");
Map.addLayer(data_4,{min: 0.0, max: 4000.0, gamma: 1},"data_4");
Map.addLayer(data_5,{min: 0.0, max: 4000.0, gamma: 1},"data_5");
Map.addLayer(data_6,{min: 0.0, max: 4000.0, gamma: 1},"data_6");
Map.addLayer(data_7,{min: 0.0, max: 4000.0, gamma: 1},"data_7");
print(data_7,"data_7")

////Histograms of masked burned areas of forest regions in the Ecoregions
var list_region = ee.List([]);
var Ecoregions=[4,5,11,13,15,16,17,19,20,21,22,23,41,77,78]
for (var j=0; j<15; ++j){
var r = Ecoregions[j]

// for (var r=1; r<3; ++r){
var regions = Ecoregions3_M.filter(ee.Filter.eq("US_L3CODE", r.toString()))
var Hist1 = data_1.reduceRegions({collection: regions, reducer:ee.Reducer.histogram(),scale: 100});
var Histogram1 = Hist1.sort('US_L3CODE', true).select([".*"],null,false)
var Histogram1 = Histogram1.select('histogram')
var h1 = Histogram1.toList(Histogram1.size())
var hh1 = h1.get(0)
list_region = list_region.add(hh1)

var Hist2 = data_2.reduceRegions({collection: regions, reducer:ee.Reducer.histogram(),scale: 100});
var Histogram2 = Hist2.sort('US_L3CODE', true).select([".*"],null,false)
var Histogram2 = Histogram2.select('histogram')
var h2 = Histogram2.toList(Histogram2.size())
var hh2 = h2.get(0)
list_region = list_region.add(hh2)

var Hist3 = data_3.reduceRegions({collection: regions, reducer:ee.Reducer.histogram(),scale: 100});
var Histogram3 = Hist3.sort('US_L3CODE', true).select([".*"],null,false)
var Histogram3 = Histogram3.select('histogram')
var h3 = Histogram3.toList(Histogram3.size())
var hh3 = h3.get(0)
list_region = list_region.add(hh3)

var Hist4 = data_4.reduceRegions({collection: regions, reducer:ee.Reducer.histogram(),scale: 100});
var Histogram4 = Hist4.sort('US_L3CODE', true).select([".*"],null,false)
var Histogram4 = Histogram4.select('histogram')
var h4 = Histogram4.toList(Histogram4.size())
var hh4 = h4.get(0)
list_region = list_region.add(hh4)

var Hist5 = data_5.reduceRegions({collection: regions, reducer:ee.Reducer.histogram(),scale: 100});
var Histogram5 = Hist5.sort('US_L3CODE', true).select([".*"],null,false)
var Histogram5 = Histogram5.select('histogram')
var h5 = Histogram5.toList(Histogram5.size())
var hh5 = h5.get(0)
list_region = list_region.add(hh5)

var Hist6 = data_6.reduceRegions({collection: regions, reducer:ee.Reducer.histogram(),scale: 100});
var Histogram6 = Hist6.sort('US_L3CODE', true).select([".*"],null,false)
var Histogram6 = Histogram6.select('histogram')
var h6 = Histogram6.toList(Histogram6.size())
var hh6 = h6.get(0)
list_region = list_region.add(hh6)

var Hist7 = data_7.reduceRegions({collection: regions, reducer:ee.Reducer.histogram(),scale: 100});
var Histogram7 = Hist7.sort('US_L3CODE', true).select([".*"],null,false)
var Histogram7 = Histogram7.select('histogram')
var h7 = Histogram7.toList(Histogram7.size())
var hh7 = h7.get(0)
list_region = list_region.add(hh7)

}
print(list_region,'list_region')
Export.table.toDrive(ee.FeatureCollection(list_region), 'Days_ERC_'+i.toString(),'Wildfire3');

