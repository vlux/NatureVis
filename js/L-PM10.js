//compute a Lindenmayer system given an axiom, a number of steps and rules
(function() {

    var curve, d, fractalize, height, svg, svg_path, transition, tweenDash,
        width;

    var piex = [],
        piey = [];

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
            }
        }
        return path;
    };

    curve = fractalize({
        axiom: 'FFFFFFFF[++FFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFF]FFFFFFFFFF[--FFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFF]FFFFFFFFFF[++FFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFF]FFFFFFFFFF[--FFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFF]FFFFFFFFFF[++FFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFF]FFFFFFFFFF[--FFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFF]FFFFFFFFFF[++FFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFF]FFFFFFFFFF[--FFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFF]FFFFFFFFFF[++FFFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFFFF]FFFFFFFFFF[--FFFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFF[--FFFFFFE]FFFF[++FFFFFFE]FFFFFF]FFFFFFFFFF',
        steps: 1,
        rules: {

        }
    });
    d = svg_path({
        fractal: curve,
        side: 6, //length
        da: 30 / 180 * Math.PI
    });

    width = 600;
    height = 800;

    svg = d3.select('#PM10')
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

    var radius = Math.min(width, height) / 8;

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

        var PM10dataset = [];
        var APIdataset = [];

        data.forEach(function(d) {
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

        var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273,
            304, 334, 365
        ];

        for (var j = 0; j < 10; ++j) {
            for (var k = 1; k <= 12; ++k) {
                var tapi = [],
                    tPM10 = [];

                for (var p = months[k - 1]; p < months[k]; ++p)
                    tapi.push(APIdataset[p][j + 1])
                for (var p = months[k - 1]; p < months[k]; ++p)
                    tPM10.push(PM10dataset[p][j + 1]);

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
                    .data(pie(tPM10))
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

}).call(this);


// matlab code
// bemid = 'FFFFFFFF';
// bran1 = 'FFF';
// bran2 = 'FFF';
// branc1 = [bran1 '[++' bran2 'E]' bran1 '[--' bran2 'E]'];
// branc2 = [bran1 '[--' bran2 'E]' bran1 '[++' bran2 'E]'];
// branch1 = ['F'];
// branch2 = ['F'];
// month = 12;
// for i = 1: month / 2
//     branch1 = [branch1 branc1];
//     branch2 = [branch2 branc2];
// end
// branch1 = [branch1 bran2];
// branch2 = [branch2 bran2];
// axiom = [bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid '[++' branch1   ']' bemid '[--' branch2   ']'...
//     bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid '[++' branch1   ']'...
//     bemid '[--' branch2   ']' bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid];
