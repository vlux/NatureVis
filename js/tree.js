//compute a Lindenmayer system given an axiom, a number of steps and rules

var curve, d, fractalize, height, svg, svg_path, transition, tweenDash,
    width;

var piex = [],
    piey = [],
    rootx = [],
    rooty = [];

fractalize = function(config) {
    var char, i, input, output, _i, _j, _len, _ref;
    input = config.axiom;
    for (i = _i = 0, _ref = config.steps; 0 <= _ref ? _i < _ref :
        _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        output = '';
        for (_j = 0, _len = input.length; _j < _len; _j++) {
            char = input[_j];
            if (char in config.rules)
                output += config.rules[char];
            else
                output += char;
        }
        input = output;
    }
    return output;
};

// convert a Lindenmayer string into an SVG path string
svg_path = function(config) {
    var angle, char, path, _i, _len, _ref, idx;
    var xT, yT, nxT, nyT;
    var xcor = [],
        ycor = [],
        angles = [];
    idx = 1;
    angle = Math.PI / 2 * 3;
    path = 'M0 0';
    xT = 0, yT = 0;
    _ref = config.fractal;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        if (char === '+')
            angle -= config.da;
        else if (char === '-')
            angle += config.da;
        else if (char === 'F') {
            nxT = xT + config.side * Math.cos(angle);
            nyT = yT + config.side * Math.sin(angle);
            path += "L" + nxT + " " + nyT;
            xT = nxT;
            yT = nyT;
        } else if (char === '[') {
            xcor[idx] = xT;
            ycor[idx] = yT;
            angles[idx++] = angle;
        } else if (char === ']') {
            xT = xcor[--idx];
            yT = ycor[idx];
            angle = angles[idx];
            path += "M" + xT + " " + yT;
        } else if (char === 'E') {
            piex.push(xT);
            piey.push(yT);
        } else if (char === 'G') {
            rootx.push(xT);
            rooty.push(yT);
        }
    }
    return path;
};

curve = fractalize({
    axiom: 'GFFFFFFFFFF[++GFFFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFFG',
    steps: 1,
    rules: {

    }
});
d = svg_path({
    fractal: curve,
    side: 6, //length
    da: 30 / 180 * Math.PI
});

width = 700;
height = 830;

svg = d3.select('#tree')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

svg.append('path')
    .attr('class', 'curve')
    .attr('d', d)
    .attr('transform', "translate(" + (width / 2) + "," + (height) +
        ")");

var radius = Math.min(width, height) / 10;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d;
    });

var arc = d3.svg.arc()
    .outerRadius(function(d) {
        return radius * (Math.round(Math.sqrt(d.value)) / 40);
    });

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
        return "<span style='color:orangered'>" + d.data +
            "</span>";
    });

svg.call(tip);

path2 = '';
for (var i = 1; i <= 20; i += 4) {
    path2 += 'M' + rootx[i] + ' ' + rooty[i]
    path2 += 'Q' + (rootx[i] - 30) + ' ' + (rooty[i] + 15) + ' ' +
        rootx[i + 1] + ' ' + rooty[i + 1];
    path2 += 'M' + rootx[i] + ' ' + rooty[i]
    path2 += 'Q' + (rootx[i] - 30) + ' ' + (rooty[i] - 30) + ' ' +
        rootx[i + 1] + ' ' + rooty[i + 1];
}
for (var i = 3; i <= 20; i += 4) {
    path2 += 'M' + rootx[i] + ' ' + rooty[i]
    path2 += 'Q' + (rootx[i] + 30) + ' ' + (rooty[i] + 15) + ' ' +
        rootx[i + 1] + ' ' + rooty[i + 1];
    path2 += 'M' + rootx[i] + ' ' + rooty[i]
    path2 += 'Q' + (rootx[i] + 30) + ' ' + (rooty[i] - 30) + ' ' +
        rootx[i + 1] + ' ' + rooty[i + 1];
}

svg.append('path')
    .attr('d', path2)
    .attr('fill', 'rgb(60,148,139)')
    .attr('transform', "translate(" + (width / 2) + "," + (height) +
        ")");

var NO2ratio = [7.887, 6.925, 5.823, 4.796, 4.185, 3.631, 3.016, 2.426, 1.735,
        1.000, 0
    ],
    SO2ratio = [9.691, 8.762, 7.743, 6.858, 5.735, 4.904, 3.817, 2.815, 1.896,
        1.000, 0
    ],
    PM10ratio = [11.091, 10.024, 8.855, 7.615, 6.542, 5.485, 4.383, 3.224,
        2.095, 1.000, 0
    ],
    leafration = [];

var NO2dataset = [],
    SO2dataset = [],
    PM10dataset = [],
    APIdataset = [],
    leafdataset = [];

d3.csv('sum_api.csv', function(data) {
    data.forEach(function(d) {
        if (d.key == "NO2")
            NO2dataset.push([d["key"], +d["2002"], +d[
                    "2003"], +d["2004"], +d["2005"], +
                d["2006"], +d["2007"], +d["2008"], +
                d["2009"], +d["2010"], +d["2011"], +
                d["month"]
            ]);
        if (d.key == "SO2")
            SO2dataset.push([d["key"], +d["2002"], +d[
                    "2003"], +d["2004"], +d["2005"], +
                d["2006"], +d["2007"], +d["2008"], +
                d["2009"], +d["2010"], +d["2011"], +
                d["month"]
            ]);
        if (d.key == "PM10")
            PM10dataset.push([d["key"], +d["2002"], +d[
                    "2003"], +d["2004"], +d["2005"], +
                d["2006"], +d["2007"], +d["2008"], +
                d["2009"], +d["2010"], +d["2011"], +
                d["month"]
            ]);
        if (d.key == "API")
            APIdataset.push([d["key"], +d["2002"], +d[
                    "2003"], +d["2004"], +d["2005"], +
                d["2006"], +d["2007"], +d["2008"], +
                d["2009"], +d["2010"], +d["2011"], +
                d["month"]
            ]);
    });
    draw("NO2");
})

function draw(pollution) {

    if (pollution == "NO2") {
        leafdataset = NO2dataset;
        leafration = NO2ratio;
    } else if (pollution == "SO2") {
        leafdataset = SO2dataset;
        leafration = SO2ratio;
    } else if (pollution == "PM10") {
        leafdataset = PM10dataset;
        leafration = PM10ratio;
    }

    d3.selectAll("#tree .leaf").remove();

    var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273,
        304, 334, 365
    ];

    for (var j = 0; j < 10; ++j) {
        for (var k = 1; k <= 12; ++k) {
            var tapi = [],
                tleaf = [];

            for (var p = months[k - 1]; p < months[k]; ++p)
                tapi.push(APIdataset[p][j + 1])
            for (var p = months[k - 1]; p < months[k]; ++p)
                tleaf.push(leafdataset[p][j + 1]);

            var pos = j * 12 + k - 1;

            svg.selectAll(".solidArcc")
                .data(pie(tapi))
                .enter().append("path")
                .attr("fill", "rgb(20, 119, 174)")
                //.attr("stroke", "silver")
                //.attr("class", "solidArc")
                .attr("d", arc)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .attr("class", "leaf")
                .attr('transform', "translate(" + (piex[pos] +
                        width / 2) + "," + (piey[pos] + height) +
                    ")");

            svg.selectAll(".solidArcs")
                .data(pie(tleaf))
                .enter().append("path")
                .attr("fill", "rgb(230, 233, 82)")
                //.attr("stroke", "silver")
                //.attr("class", "solidArc")
                .attr("d", arc)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .attr("class", "leaf")
                .attr('transform', "translate(" + (piex[pos] +
                        width / 2) + "," + (piey[pos] + height) +
                    ")");
        }
    }

    var tempy = rooty[0],
        segy = (rooty[0] - rooty[21]) / 10;
    path3 = '';
    path3 += 'M' + rootx[0] + ' ' + rooty[0];
    path3 += 'L' + (rootx[0] - leafration[0] * 4.5) + '  ' + rooty[0];
    for (var i = 1; i < 11; ++i) {
        tempy -= segy
        path3 += 'L' + (rootx[0] - leafration[i] * 4.5) + ' ' + tempy;
    }
    tempy = rooty[0];
    path3 += 'M' + rootx[0] + ' ' + rooty[0];
    path3 += 'L' + (rootx[0] + leafration[0] * 4.5) + '  ' + rooty[0];
    for (var i = 1; i < 11; ++i) {
        tempy -= segy
        path3 += 'L' + (rootx[0] + leafration[i] * 4.5) + ' ' + tempy;
    }

    svg.append('path')
        .attr('d', path3)
        .attr('fill', '#528552')
        .attr("class", "leaf")
        .attr('transform', "translate(" + (width / 2) + "," + (height) +
            ")");

    var tempy = rooty[0],
        segy = (rooty[0] - rooty[21]) / 10;
    path4 = '';
    for (var i = 1; i < 11; ++i) {
        tempy -= segy;
        path4 += 'M' + (rootx[0] - leafration[i] * 4.5) + ' ' + tempy;
        path4 += 'L' + (rootx[0] + leafration[i] * 4.5) + ' ' + tempy;
    }
    svg.append('path')
        .attr('d', path4)
        .attr('stroke', '#98df8a')
        .attr("stroke-width", "2px")
        .attr("class", "leaf")
        .attr('transform', "translate(" + (width / 2) + "," + (height) +
            ")");

    d3.selectAll("#tree text").remove();
    svg.append("text")
        .attr('dx', function() {
            return width / 2 - 30;
        })
        .attr("dy", "80")
        .attr("fill", "silver")
        .attr("font-size", "30px")
        .text(pollution);
}
