let data = ['SlideshowImages/ML/ugaImproved.png', 'SlideshowImages/ML/umapMBenz.png', 'SlideshowImages/ML/effFrontier.png', 'SlideshowImages/ML/PortfoliovSPY.png','SlideshowImages/ML/bbands.png', 'SlideshowImages/ML/efficientnetb0colorful.png'];
let w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		width = window.innerWidth,
    y = 600;

let svg = d3.select("#graph").append("svg")
			      .attr("width", width)
			      .attr("height", "600")
						// .attr("viewBox", "0 0 1400 600")
				  	.on('mousemove', () => {
			            let x = event.x;
			            d3.selectAll('.content')
									.attr('x', (d,i) => fisheye(d,x))
			          })
						.on('mouseleave', () => {
									d3.selectAll('.content').transition()
									.attr('x', (d,i) => xScale(d,i))
						});

let xScale = d3.scaleBand().domain(data).range([0,width])
let rects = svg.selectAll('content')
							 .data(data)
							 .join("svg:image")
							 .attr("xlink:href", d => d)
							 .attr("class", "content")
							 .attr("y", 0)
							 .attr("x", (d, i) => xScale(d,i))
							 .attr("width", (d,i) => xScale(5,i))
							 .attr("height", "600px");

    let distortion = 40;

    function fisheye(_, a) {
      let x = xScale(_),
          left = x < a,
          range = d3.extent(xScale.range()),
          min = range[0],
          max = range[1],
          m = left ? a - min : max - a;
      if (m === 0) m = max - min;
      return (left ? -1 : 1) * m * (distortion + 1) / (distortion + (m / Math.abs(x - a)))+a;
    }

function mlData(){
	data = ['SlideshowImages/ML/ugaImproved.png', 'SlideshowImages/ML/umapMBenz.png', 'SlideshowImages/ML/efficientnetb0colorful.png', 'SlideshowImages/ML/red.png', 'SlideshowImages/ML/tslawheel.png'];

	xScale = d3.scaleBand().domain(data).range([0,width]);

	rects.data(data)
			 .join("svg:image")
			 .attr("xlink:href", d => d)
			 .attr("class", "content")
			 .attr("y", 0)
			 .attr("x", (d, i) => xScale(d,i))
			 .attr("width", (d,i) => xScale(5,i))
			 .attr("height", "600px");
}

function cadData(){
	data = ['SlideshowImages/CAD/aidG.jpg', 'SlideshowImages/CAD/flight.jpg', 'SlideshowImages/CAD/helmet.jpg', 'SlideshowImages/CAD/swan.jpg', 'SlideshowImages/CAD/ultra.jpg'];

	xScale = d3.scaleBand().domain(data).range([0,width])

	rects.data(data)
			 .join("svg:image")
			 .attr("xlink:href", d => d)
			 .attr("class", "content")
			 .attr("y", 0)
			 .attr("x", (d, i) => xScale(d,i))
			 .attr("width", (d,i) => xScale(5,i))
			 .attr("height", "600px");
}
function propData(){
	console.log('I WORK!!!');
}
