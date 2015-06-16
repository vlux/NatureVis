//compute a Lindenmayer system given an axiom, a number of steps and rules
(function() {

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
        axiom: 'GFFFFFFFFFF[++GFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFF[++GFFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFFG]FFFFFFFFFF[--GFFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFFG]FFFFFFFFFFG',
        steps: 1,
        rules: {

        }
    });
    d = svg_path({
        fractal: curve,
        side: 6.5, //length
        da: 30 / 180 * Math.PI
    });

    width = 700;
    height = 870;

    svg = d3.select('#NO2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    svg.append('path')
        .attr('class', 'curve shadow')
        .attr('d', d)
        .attr('transform', "translate(" + (width / 2) + "," + (height) +
            ")");

    svg.append('path')
        .attr('class', 'curve')
        .attr('d', d)
        .attr('transform', "translate(" + (width / 2) + "," + (height) +
            ")");

    var radius = Math.min(width, height) / 9;

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

    d3.csv('sum_api.csv', function(error, data) {

        var NO2dataset = [];
        var APIdataset = [];

        data.forEach(function(d) {
            if (d.key == "NO2")
                NO2dataset.push([d["key"], +d["2002"], +d[
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

        //   d3.csv('sum.csv',function(data) {
        //     dataset = data.map(function(d) {
        //       return [ + d["2002"], +d["2003"], +d["2004"], +d["2005"], +d["2006"], +d["2007"], +d["2008"], +d["2009"], +d["2010"], +d["2011"]];
        //     });
        //     console.log(dataset[0][0])
        //   });

        var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273,
            304, 334, 365
        ];

        for (var j = 0; j < 10; ++j) {
            for (var k = 1; k <= 12; ++k) {
                var tapi = [],
                    tno2 = [];

                for (var p = months[k - 1]; p < months[k]; ++p)
                    tapi.push(APIdataset[p][j + 1])
                for (var p = months[k - 1]; p < months[k]; ++p)
                    tno2.push(NO2dataset[p][j + 1]);

                var pos = j * 12 + k - 1;

                svg.selectAll(".solidArcc")
                    .data(pie(tapi))
                    .enter().append("path")
                    .attr("fill", "rgb(20, 119, 174)")
                    //.attr("stroke", "silver")
                    .attr("class", "solidArc")
                    .attr("d", arc)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .attr('transform', "translate(" + (piex[pos] +
                            width / 2) + "," + (piey[pos] + height) +
                        ")");

                svg.selectAll(".solidArcs")
                    .data(pie(tno2))
                    .enter().append("path")
                    .attr("fill", "rgb(230, 233, 82)")
                    //.attr("stroke", "silver")
                    .attr("class", "solidArc")
                    .attr("d", arc)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .attr('transform', "translate(" + (piex[pos] +
                            width / 2) + "," + (piey[pos] + height) +
                        ")");
            }
        }
    });

    svg.append("text")
        .attr('dx', function() {
            return width / 2 - 25;
        })
        .attr("dy", "50")
        .attr("font-size", "25px")
        .text("NO2");

}).call(this);


// svg.selectAll('circle')
//     .data(rootx)
//     .enter()
//     .append('circle')
//     .attr('cx', function(d, i) {
//         return rootx[i] + width / 2;
//     })
//     .attr('cy', function(d, i) {
//         return rooty[i] + height;
//     })
//     .attr('r', '4')
//     .attr('fill', 'red')


// matlab code
// bemid = 'FFFFFFFFFF';
// bran1 = 'FFFF';
// bran2 = 'FFFFFF';
// branc1 = [bran1 '[++' bran2 'E]' bran1 '[--' bran2 'E]'];
// branc2 = [bran1 '[--' bran2 'E]' bran1 '[++' bran2 'E]'];
// branch1 = ['GF'];
// branch2 = ['GF'];
// month = 12;
// for i = 1: month / 2
//     branch1 = [branch1 branc1];
//     branch2 = [branch2 branc2];
// end
// branch1 = [branch1 bran2 'G'];
// branch2 = [branch2 bran2 'G'];
// axiom = ['G' bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid '[++' branch1   ']' bemid '[--' branch2   ']'...
//     bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid '[++' branch1   ']'...
//     bemid '[--' branch2   ']' bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid 'G'];
