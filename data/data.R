dm <- read.csv("10yearPM10.csv")
meanOnMonth <- aggregate(dm[, 1:10], list(dm$month), mean)
write.csv(meanOnMonth, file = "PM10MeanMonth.csv")



# Stream Data
iniData <- read.csv("sum_ini.csv")
library(reshape)
Mdata <- melt(iniData, id = c("key", "month", "day"))
names(Mdata) <- c("key", "month", "day", "year", "value")
Mdata$year <- as.character(Mdata$year)
Mdata$year <- substr(Mdata$year, 2, 5)
Mdata$year <- as.numeric(Mdata$year)
Mdata$date <- as.Date(paste(Mdata$year , Mdata$month , Mdata$day , sep = "/" ), formate = "%y/%m/%d")
resData <- Mdata[,c("key", "value", "date")]
tempData <- resData[order(resData$key, resData$date), ]
write.csv(tempData, "mData.csv")
