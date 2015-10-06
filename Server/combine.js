//compute a Lindenmayer system given an axiom, a number of steps and rules

var curve, d, fractalize, height, svg, svg_path, transition, tweenDash,
    width;

var piex = [],
    piey = [],
    rootx = [],
    rooty = [],
    monthx = [],
    monthy = [];

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
        } else if (char === 'M') {
            monthx.push(xT);
            monthy.push(yT);
        }
    }
    return path;
};

curve = fractalize({
    axiom: 'GFFFFFFFFFFFF[++GFFFFFFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[--GFFFFFFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[++GFFFFFFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[--GFFFFFFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[++GFFFFFFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[--GFFFFFFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[++GFFFFFFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[--GFFFFFFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[++GFFFFFFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFF[--GFFFFFFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFM[--FFFFFFFFE]FFFFFM[++FFFFFFFFE]FFFFFFFFG]FFFFFFFFFFFFG',
    steps: 1,
    rules: {

    }
});
d = svg_path({
    fractal: curve,
    side: 6, //length
    da: 30 / 180 * Math.PI
});

width = 1100;
height = 1000;

svg = d3.select('#tree')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

svg.append('path')
    .attr('class', 'curve')
    .attr('d', d)
    .attr("opacity", "0.6")
    .attr('transform', "translate(" + (width / 2) + "," + (height) +
        ")");

var radius = 80;

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


//preprocess the data
var NO2dataset = [],
    SO2dataset = [],
    PM10dataset = [],
    APIdataset = [],
    leafdataset = [];

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

var NO2branch = [
        [24.8391, 22.3161, 20.3927, 18.1782, 16.6667, 14.4176, 12.6054, 11.2605,
            9.3927, 7.3812, 5.4943, 3.0881
        ],
        [28.4693, 25.4636, 22.9828, 20.0709, 17.7261, 15.2433, 14.0517, 12.9674,
            11.7088, 10.1705, 7.1130, 4.1724
        ],
        [26.5287, 22.3276, 18.9310, 16.0805, 13.4330, 10.1418, 6.8199, 4.9483,
            3.8927, 2.9061, 2.0019, 1.0000
        ],
        [15.7874, 14.1226, 13.2184, 12.2299, 11.2452, 10.3008, 9.4215, 8.4176,
            6.8697, 5.3487, 3.8621, 2.0690
        ],
        [14.2969, 12.2912, 11.1609, 9.8621, 8.8812, 8.1034, 7.4693, 6.6418,
            5.5153, 4.1973, 2.9559, 1.7126
        ],
        [15.8812, 13.6590, 12.1034, 10.6897, 9.4655, 8.5862, 7.8602, 7.1973,
            6.5230, 5.5594, 4.0670, 1.3506
        ],
        [15.2299, 13.1188, 11.3238, 9.7433, 9.0900, 8.5134, 7.8870, 7.3506,
            6.8372, 6.0709, 4.4138, 2.4540
        ],
        [17.8659, 15.8161, 13.6724, 11.8793, 10.3027, 8.8908, 7.8602, 7.2548,
            6.5249, 5.6954, 4.6743, 2.7759
        ],
        [18.9770, 15.2931, 12.7644, 10.5096, 9.2146, 8.1169, 7.1034, 6.1801,
            5.0824, 3.8602, 2.4598, 1.2146
        ],
        [25.8276, 24.3908, 23.1188, 22.0115, 21.0690, 20.1494, 19.3046, 18.5038,
            16.1877, 13.3333, 9.8276, 5.0594
        ]
    ],
    SO2branch = [
        [11.751, 9.807, 8.389, 7.346, 6.890, 6.412, 5.905, 5.532, 4.978, 4.413,
            3.731, 2.183
        ],
        [12.889, 10.258, 8.500, 7.113, 6.331, 5.708, 5.296, 5.011, 4.646, 4.168,
            3.544, 2.241
        ],
        [11.192, 9.178, 7.637, 6.475, 5.511, 4.697, 3.856, 3.361, 3.001, 2.704,
            2.016, 1.145
        ],
        [14.205, 12.274, 11.082, 9.682, 8.446, 7.580, 6.844, 6.408, 5.755,
            4.688, 3.617, 2.051
        ],
        [10.498, 8.739, 7.672, 6.620, 5.890, 5.457, 5.103, 4.725, 4.228, 3.449,
            2.690, 1.840
        ],
        [13.751, 11.410, 9.786, 8.462, 7.621, 6.965, 6.352, 5.922, 5.414, 4.757,
            3.747, 1.960
        ],
        [12.670, 10.408, 8.496, 7.223, 6.430, 5.959, 5.471, 5.092, 4.739, 4.327,
            3.566, 1.854
        ],
        [11.629, 9.446, 7.823, 7.007, 6.470, 5.925, 5.433, 5.183, 4.766, 4.382,
            3.803, 2.127
        ],
        [11.325, 9.086, 7.200, 5.561, 4.864, 4.267, 3.698, 3.274, 2.733, 2.172,
            1.545, 1.000
        ],
        [12.646, 11.426, 10.253, 9.594, 9.074, 8.462, 8.008, 7.536, 6.532,
            5.439, 4.141, 2.204
        ]
    ],
    PM10branch = [
        [13.158, 11.955, 10.950, 9.741, 8.629, 7.626, 6.674, 5.657, 4.716,
            3.919, 2.932, 1.506
        ],
        [14.410, 12.953, 11.744, 10.283, 8.984, 7.736, 6.724, 5.700, 4.742,
            3.829, 2.709, 1.612
        ],
        [15.294, 13.670, 12.097, 10.463, 8.905, 7.422, 5.888, 4.490, 3.572,
            2.818, 1.874, 1.000
        ],
        [13.238, 12.239, 11.523, 10.256, 8.819, 7.951, 7.065, 5.866, 4.870,
            3.780, 2.651, 1.259
        ],
        [13.025, 11.800, 11.073, 9.765, 8.681, 7.862, 6.957, 5.887, 4.876,
            3.773, 2.626, 1.425
        ],
        [13.597, 12.177, 11.075, 9.899, 8.751, 7.595, 6.686, 5.682, 4.717,
            3.699, 2.822, 1.528
        ],
        [14.292, 12.757, 11.672, 10.383, 9.285, 7.997, 6.727, 5.716, 4.797,
            3.808, 2.601, 1.386
        ],
        [13.919, 12.608, 11.185, 10.028, 8.908, 7.925, 6.802, 5.699, 4.789,
            3.874, 2.699, 1.396
        ],
        [13.501, 12.075, 10.828, 9.363, 8.352, 7.321, 6.294, 5.281, 4.356,
            3.426, 2.490, 1.327
        ],
        [12.331, 11.144, 9.997, 8.991, 7.928, 6.905, 5.829, 4.721, 3.921, 3.115,
            2.321, 1.242
        ]
    ],
    leafbranch = [];

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


//draw the tree
function draw(pollution) {

    if (pollution == "NO2") {
        leafdataset = NO2dataset;
        leafration = NO2ratio;
        leafbranch = NO2branch;
    } else if (pollution == "SO2") {
        leafdataset = SO2dataset;
        leafration = SO2ratio;
        leafbranch = SO2branch;
    } else if (pollution == "PM10") {
        leafdataset = PM10dataset;
        leafration = PM10ratio;
        leafbranch = PM10branch;
    }

    //remove the leaf and trunk of the tree
    d3.selectAll("#tree .leaf").remove();

    var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

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
                .attr("fill", "#93c47d")
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
                .attr("fill", function() {
                    if (pollution == "NO2")
                        return "#783f04"
                    else if (pollution == "SO2")
                        return "#ffffff"
                    else if (pollution == "PM10")
                        return "rgb(230, 233, 82)"
                })
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

    //path_trunk is the trunk
    var tempy = rooty[0],
        segy = (rooty[0] - rooty[21]) / 10;
    path_trunk = '';
    path_trunk += 'M' + rootx[0] + ' ' + rooty[0];
    path_trunk += 'L' + (rootx[0] - leafration[0] * leafration[0] / 1.45) +
        '  ' +
        rooty[0];
    for (var i = 1; i < 11; ++i) {
        tempy -= segy
        path_trunk += 'L' + (rootx[0] - leafration[i] * leafration[i] / 1.45) +
            ' ' +
            tempy;
    }
    tempy = rooty[0];
    path_trunk += 'M' + rootx[0] + ' ' + rooty[0];
    path_trunk += 'L' + (rootx[0] + leafration[0] * leafration[0] / 1.45) +
        '  ' +
        rooty[0];
    for (var i = 1; i < 11; ++i) {
        tempy -= segy
        path_trunk += 'L' + (rootx[0] + leafration[i] * leafration[i] / 1.45) +
            ' ' +
            tempy;
    }

    svg.append('path')
        .attr('d', path_trunk)
        .attr('fill', '#8E6C48')
        .attr("opacity", "0.90")
        .attr("class", "leaf")
        .attr('transform', "translate(" + (width / 2) + "," + (height) +
            ")");

    //path_trunkline is the line in the trunk
    var tempy = rooty[0],
        segy = (rooty[0] - rooty[21]) / 10;
    path_trunkline = '';
    for (var i = 1; i < 11; ++i) {
        tempy -= segy;
        path_trunkline += 'M' + (rootx[0] - leafration[i] * leafration[i] /
                1.45) +
            ' ' + tempy;
        path_trunkline += 'L' + (rootx[0] + leafration[i] * leafration[i] /
                1.45) +
            ' ' + tempy;
    }
    svg.append('path')
        .attr('d', path_trunkline)
        .attr('stroke', '#C5A98C')
        .attr("stroke-width", "2px")
        .attr("class", "leaf")
        .attr('transform', "translate(" + (width / 2) + "," + (height) +
            ")");

    //path_branch is the branches of this tree
    path_branch = '';
    for (var i = 1; i <= 20; i += 4) {
        var yy = (i - 1) / 2;
        path_branch += 'M' + rootx[i] + ' ' + rooty[i];
        path_branch += 'L' + rootx[i] + ' ' + (rooty[i] - leafbranch[yy][0] *
            1.3);
        for (var j = 1; j < 12; ++j) {
            var idx = yy * 12 + j - 1;
            path_branch += 'L' + monthx[idx] + '' + (monthy[idx] - leafbranch[
                    yy][j] *
                1.3)
        }
        path_branch += 'L' + rootx[i + 1] + ' ' + rooty[i + 1];

        path_branch += 'M' + rootx[i] + ' ' + rooty[i];
        path_branch += 'L' + rootx[i] + ' ' + (rooty[i] + leafbranch[yy][0] *
            1.3);
        for (var j = 1; j < 12; ++j) {
            var idx = yy * 12 + j - 1;
            path_branch += 'L' + monthx[idx] + '' + (monthy[idx] + leafbranch[
                    yy][j] *
                1.3)
        }
        path_branch += 'L' + rootx[i + 1] + ' ' + rooty[i + 1];
    }
    for (var i = 3; i <= 20; i += 4) {
        var yy = (i - 1) / 2;
        path_branch += 'M' + rootx[i] + ' ' + rooty[i];
        path_branch += 'L' + rootx[i] + ' ' + (rooty[i] - leafbranch[yy][0] *
            1.3);
        for (var j = 1; j < 12; ++j) {
            var idx = yy * 12 + j - 1;
            path_branch += 'L' + monthx[idx] + '' + (monthy[idx] - leafbranch[
                    yy][j] *
                1.3)
        }
        path_branch += 'L' + rootx[i + 1] + ' ' + rooty[i + 1];

        path_branch += 'M' + rootx[i] + ' ' + rooty[i];
        path_branch += 'L' + rootx[i] + ' ' + (rooty[i] + leafbranch[yy][0] *
            1.3);
        for (var j = 1; j < 12; ++j) {
            var idx = yy * 12 + j - 1;
            path_branch += 'L' + monthx[idx] + '' + (monthy[idx] + leafbranch[
                    yy][j] *
                1.3)
        }
        path_branch += 'L' + rootx[i + 1] + ' ' + rooty[i + 1];
    }

    svg.append('path')
        .attr('d', path_branch)
        .attr('fill', '#8E6C48')
        .attr("opacity", "0.92")
        .attr("class", "leaf")
        .attr('transform', "translate(" + (width / 2) + "," + (height) +
            ")");

    d3.selectAll("#tree .leaf text").remove();
    svg.append("text")
        .attr('dx', function() {
            return width / 2 - 30;
        })
        .attr("class", "leaf")
        .attr("dy", "80")
        .attr("fill", "white")
        .attr("font-size", "30px")
        .attr("font-family", "Courier New")
        .attr("font-weight", "600")
        .text(pollution);
}

for (var i = 0; i < 10; ++i) {
    svg.append("text")
        .attr('dx', function() {
            if (i % 2 == 1)
                return rootx[2 * (i + 1)] + width / 2 + 10
            else
                return rootx[2 * (i + 1)] + width / 2 - 60
        })
        .attr("dy", function() {
            return rooty[2 * (i + 1)] + height
        })
        .attr("fill", "white")
        .attr("font-size", "20px")
        .attr("font-family", "Courier New")
        .attr("font-weight", "600")
        .attr("class", "where")
        .text(i + 2002);
}

//draw the stream
function stream(csvpath) {

    var datearray = [];
    var colorrange = [];

    //Order: PM10,SO2,NO2 : "rgb(230, 233, 82)", "#ffffff", "#783f04",
    colorrange = ["#10e3e3", "#528552", "#ff7f0e", "#A6BDDB", "#D0D1E6",
        "#F1EEF6"
    ]
    strokecolor = colorrange[0];

    var format = d3.time.format("%y/%m/%d");

    var margin = {
        top: 20,
        right: 50,
        bottom: 30,
        left: 50
    };
    var width = 1324 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

    var tooltip = d3.select("#tree")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "20")
        .style("visibility", "hidden")
        .style("top", "92%")
        .style("left", "46%")
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .style("color", "silver");

    var vertical = d3.select("#tree")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "400px")
        .style("top", "1020px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "white");

    var x = d3.time.scale().range([0, width]);

    var y = d3.scale.linear().range([height - 10, 0]);

    var z = d3.scale.ordinal().range(colorrange);

    var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(d3.time.year);

    var yAxis = d3.svg.axis().scale(y);

    var stack = d3.layout.stack()
        .offset("silhouette")
        .values(function(d) {
            return d.values;
        })
        .x(function(d) {
            return d.date;
        })
        .y(function(d) {
            return d.value;
        });

    var nest = d3.nest()
        .key(function(d) {
            return d.key;
        });

    var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) {
            return x(d.date);
        })
        .y0(function(d) {
            return y(d.y0);
        })
        .y1(function(d) {
            return y(d.y0 + d.y);
        });

    var svg = d3.select("#tree")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var graph = d3.csv(csvpath, function(data) {

        data.forEach(function(d) {
            d.date = format.parse(d.date);
            d.value = +d.value;
        });

        var layers = stack(nest.entries(data));

        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.y0 + d.y;
        })]);

        svg.selectAll(".layer")
            .data(layers).enter()
            .append("path")
            .attr("class", "layer")
            .attr("d", function(d) {
                return area(d.values);
            })
            .style("fill", function(d, i) {
                return z(i);
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + ", 0)")
            .call(yAxis.orient("right"));

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis.orient("left"));

        svg.selectAll(".layer")
            .attr("opacity", 1)
            .on("mouseover", function(d, i) {
                svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", function(d, j) {
                        return j != i ? 0.6 : 1;
                    })
            })
            .on("mousemove", function(d, i) {
                mousex = d3.mouse(this);
                mousex = mousex[0];
                var invertedx = x.invert(mousex);
                invertedx = invertedx.getMonth() + invertedx.getDate();
                var selected = (d.values);

                for (var k = 0; k < selected.length; k++) {
                    datearray[k] = selected[k].date;
                    datearray[k] = datearray[k].getMonth() +
                        datearray[k].getDate();
                }

                mousedate = datearray.indexOf(invertedx);
                pro = d.values[mousedate].value;

                d3.select(this)
                    .classed("hover", true)
                    .attr("stroke", strokecolor)
                    .attr("stroke-width", "0.5px")

                tooltip.html("<p>" + d.key + "<br>" + pro +
                    "</p>").style("visibility", "visible");
            })
            .on("mouseout", function(d, i) {
                svg.selectAll(".layer")
                    .transition().duration(250)
                    .attr("opacity", "1");

                d3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px")

                tooltip.html("<p>" + d.key + "<br>" + pro +
                    "</p>").style("visibility", "hidden");
            })

        d3.select("#tree")
            .on("mouseout", function() {
                mousex = d3.mouse(this);
                mousex = mousex[0] + 5;
                vertical.style("left", mousex + "px")
                vertical.style("visibility", "visible")
            })
            .on("mouseleave", function() {
                vertical.style("visibility", "hidden")
            });
    });
}
