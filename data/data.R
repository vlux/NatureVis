dm <- read.csv("10yearPM10.csv")
meanOnMonth <- aggregate(dm[, 1:10], list(dm$month), mean)
write.csv(meanOnMonth, file = "PM10MeanMonth.csv")
