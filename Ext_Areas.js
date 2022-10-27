var Dem = ee.Image("USGS/3DEP/10m"),
    Ecoregions3_M = ee.FeatureCollection("users/alizadehmr1/Wildfire/Ecoregions_L3_Merged"),
    Burn_Severity = ee.ImageCollection("users/alizadehmr1/Burn_severity"),
    Forest = ee.Image("users/alizadehmr1/Wildfire/Forest"),
    Burned_Areas3 = ee.FeatureCollection("users/alizadehmr1/Wildfire/MTBS_Burned_Areas3"),
    table = ee.FeatureCollection("users/alizadehmr1/Wildfire/MTBS_Burned_Areas2");

// Specifing Ecoregion
var region_dic = ee.Dictionary()
for (var r=1 ; r<86 ; ++r){
var Ecoregion = r
var regions = Ecoregions3_M.filter(ee.Filter.eq("US_L3CODE", Ecoregion.toString()))
Map.addLayer(regions.draw('red'))

var maskedForest = ee.Image(Forest.eq(0))
var Forestmasked = maskedForest.updateMask(maskedForest).eq(1)
var Dem_Forest = Dem.mask(Forestmasked)
var Mask_Interv_1 = ee.Image(Dem_Forest.gt(ee.Number(0)).and(Dem_Forest.lte(ee.Number(500))));
var Mask_Interv_2 = ee.Image(Dem_Forest.gt(ee.Number(500)).and(Dem_Forest.lte(ee.Number(1000))));
var Mask_Interv_3 = ee.Image(Dem_Forest.gt(ee.Number(1000)).and(Dem_Forest.lte(ee.Number(1500))));
var Mask_Interv_4 = ee.Image(Dem_Forest.gt(ee.Number(1500)).and(Dem_Forest.lte(ee.Number(2000))));
var Mask_Interv_5 = ee.Image(Dem_Forest.gt(ee.Number(2000)).and(Dem_Forest.lte(ee.Number(2500))));
var Mask_Interv_6 = ee.Image(Dem_Forest.gt(ee.Number(2500)).and(Dem_Forest.lte(ee.Number(3000))));
var Mask_Interv_7 = ee.Image(Dem_Forest.gt(ee.Number(3000)));
var list = ee.List([]);
///////////////////////////////////////////////////////////////
var AreaIntrv1 = Mask_Interv_1.multiply(ee.Image.pixelArea())
var TBA_Interv_1 = AreaIntrv1.reduceRegion({reducer: ee.Reducer.sum(),geometry: regions.geometry(),scale: 300,maxPixels: 1e13})
var TBA_Interv_1 = ee.Number(TBA_Interv_1.get('elevation')).divide(1e6)
// print(TBA_Interv_1)
list = list.add(TBA_Interv_1)

var AreaIntrv2 = Mask_Interv_2.multiply(ee.Image.pixelArea())
var TBA_Interv_2 = AreaIntrv2.reduceRegion({reducer: ee.Reducer.sum(),geometry: regions.geometry(),scale: 300,maxPixels: 1e13})
var TBA_Interv_2 = ee.Number(TBA_Interv_2.get('elevation')).divide(1e6)
// print(TBA_Interv_2)
list = list.add(TBA_Interv_2)

var AreaIntrv3 = Mask_Interv_3.multiply(ee.Image.pixelArea())
var TBA_Interv_3 = AreaIntrv3.reduceRegion({reducer: ee.Reducer.sum(),geometry: regions.geometry(),scale: 300,maxPixels: 1e13})
var TBA_Interv_3 = ee.Number(TBA_Interv_3.get('elevation')).divide(1e6)
// print(TBA_Interv_3)
list = list.add(TBA_Interv_3)

var AreaIntrv4 = Mask_Interv_4.multiply(ee.Image.pixelArea())
var TBA_Interv_4 = AreaIntrv4.reduceRegion({reducer: ee.Reducer.sum(),geometry: regions.geometry(),scale: 300,maxPixels: 1e13})
var TBA_Interv_4 = ee.Number(TBA_Interv_4.get('elevation')).divide(1e6)
// print(TBA_Interv_4)
list = list.add(TBA_Interv_4)

var AreaIntrv5 = Mask_Interv_5.multiply(ee.Image.pixelArea())
var TBA_Interv_5 = AreaIntrv5.reduceRegion({reducer: ee.Reducer.sum(),geometry: regions.geometry(),scale: 300,maxPixels: 1e13})
var TBA_Interv_5 = ee.Number(TBA_Interv_5.get('elevation')).divide(1e6)
// print(TBA_Interv_5)
list = list.add(TBA_Interv_5)

var AreaIntrv6 = Mask_Interv_6.multiply(ee.Image.pixelArea())
var TBA_Interv_6 = AreaIntrv6.reduceRegion({reducer: ee.Reducer.sum(),geometry: regions.geometry(),scale: 300,maxPixels: 1e13})
var TBA_Interv_6 = ee.Number(TBA_Interv_6.get('elevation')).divide(1e6)
// print(TBA_Interv_6)
list = list.add(TBA_Interv_6)

var AreaIntrv7 = Mask_Interv_7.multiply(ee.Image.pixelArea())
var TBA_Interv_7 = AreaIntrv7.reduceRegion({reducer: ee.Reducer.sum(),geometry: regions.geometry(),scale: 300,maxPixels: 1e13})
var TBA_Interv_7 = ee.Number(TBA_Interv_7.get('elevation')).divide(1e6)
list = list.add(TBA_Interv_7)
// }
region_dic = region_dic.set(r.toString(),list)
}

print(region_dic)
Export.table.toDrive(ee.FeatureCollection([ee.Feature(null,region_dic)]));


