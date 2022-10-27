# Wildfire-danger-indices
This repository includes the Google Earth Engine codes to extract the average of meteorological and the US National Fire Danger Rating System indices (fire danger indices), and critical fire danger days using daily values in each grid from the gridMET31 dataset (~4 km resolution), and then averaged them for each 500 m elevation band in 15 mountainous ecoregions of the western US. 

For critical fire danger days, counted the number of days are counted in which the daily variable exceeded its defined threshold. This threshold is selected from the literature and is associated with increased fire activity and growth potential. Threshold values were selected as: ERC = 60; FM100 = 8%, FM1000 = 10%, and VPD = 2 kPa. A local percentile-based threshold analysis is also considered for high and extreme fire danger days, in which the 75th and 95th (25th and 5th for fuel moisture) percentiles of long-term daily time series of various variables in each grid pooled over the entire calendar year were selected as the threshold, and the number of high and extreme fire danger days in each grid in each year was estimated accordingly.

gridMET can be obtained from: https://www.climatologylab.org/gridmet.html 

Omernik ecoregion boundaries are available at: https://www.epa.gov/eco-research/level-iii-and-iv-ecoregions-continental-united-states 

The National Elevation Dataset is available at: https://www.usgs.gov/the-national-map-data-delivery 
