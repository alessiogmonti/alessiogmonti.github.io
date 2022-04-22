import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { TrackballControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/TrackballControls.js";
import Stats from "./Pages/Index/stats.js";
import { GUI } from 'https://cdn.jsdelivr.net/npm/lil-gui@0.16/+esm';

import noise from './Pages/Index/vertexShader.js';
import frag from './Pages/Index/fragmentShader.js';

function globe() {

	var width = 750;
	var height = 750;
	var radius = 168,
	scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 100, width / height, 1, 1000 ),
	renderer = new THREE.WebGLRenderer( { alpha: true } ),
	container = document.getElementById( 'container' ),
	controls,
	raycaster;

	const pointer = new THREE.Vector2();
	let INTERSECTED;
	raycaster = new THREE.Raycaster();
	container.addEventListener( 'mousemove', pointerMove );
	let theta = 0;

	scene.background = new THREE.Color( "rgb(20,20,20)" );

	camera.position.set( 0, 0, 300 );
	// camera.lookAt( -11, -120, 117 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );
	container.appendChild( renderer.domElement );

	let containerGui = document.getElementById( 'guiPanel' );
	const gui = new GUI( { container: containerGui, width: 450 } );
	const datagui = gui.addFolder( 'data' );
	datagui.open();

	let earthPivot = new THREE.Group();

	const lettersTilt = new THREE.Object3D();
	scene.add(lettersTilt);
	lettersTilt.rotation.set(
		THREE.Math.degToRad(-15),
		0,
		THREE.Math.degToRad(-15));
	const lettersBase = new THREE.Object3D();
	lettersTilt.add(lettersBase);
		{
			const letterMaterial = new THREE.MeshPhongMaterial({
				color: 'red',
				opacity: 0.1
			});
			const loader = new THREE.FontLoader();
			loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', (font) => {
				const spaceSize = 2.5;
				let totalWidth = 0;
				let maxHeight = 0;
				const letterGeometries = {
					' ': { width: spaceSize, height: 0 }, // prepopulate space ' '
				};
				const size = new THREE.Vector3();
				const str = 'the world is yours the world is yours ';
				const letterInfos = str.split('').map((letter, ndx) => {
					if (!letterGeometries[letter]) {
						const geometry = new THREE.TextBufferGeometry(letter, {
							font: font,
							size: 8.0,
							height: .2,
							curveSegments: 24,
							bevelEnabled: true,
							bevelThickness: 0.5,
							bevelSize: .3,
							bevelSegments: 5,
						});
						geometry.computeBoundingBox();
						geometry.boundingBox.getSize(size);
						letterGeometries[letter] = {
							geometry,
							width: size.x /2, // no idea why size.x is double size
							height:size.y,
						};
					}
					const {geometry, width, height} = letterGeometries[letter];
					const mesh = geometry
					? new THREE.Mesh(geometry, letterMaterial)
					: null;
					totalWidth += width;
					maxHeight = Math.max(maxHeight, height);
					return {
						mesh,
						width,
					};
				});
				let t = 0;
				const radius = 180 / Math.PI;
				for (const {mesh, width} of letterInfos) {
					if (mesh) {
						const offset = new THREE.Object3D();
						lettersBase.add(offset);
						offset.add(mesh);
						offset.rotation.y = t / totalWidth * Math.PI * 2;
						mesh.position.z = radius;
						mesh.position.y = -maxHeight / 2;
					}
					t += width;
				}
			});
		}

		let wiy = new THREE.SphereGeometry( 50, 30,30 )
		const wiymaterial = new THREE.MeshStandardMaterial( { color: new THREE.Color('black'), emissive: new THREE.Color('rgba(13,16,106,1)') } );
		const wiymesh = new THREE.Mesh( wiy, wiymaterial );
		scene.add(wiymesh);



		d3.json( "./Pages/Index/dataFranceModified.json", function ( error, topology ) {

			if ( error ) throw error;
			var countries = [];
			var cones = [];
			for ( var i = 0; i < topology.objects.countries.geometries.length; i ++ ) {

				var rgb = [];
				var newcolor;
				for ( var j = 0; j < 3; j ++ ) {

					rgb.push( Math.floor( Math.random() * 255 ) );
					newcolor = 'rgb(' + rgb.join( ',' ) + ')';

				}

				var mesh = wireframe( topojson.mesh( topology, topology.objects.countries.geometries[ i ] ), new THREE.LineBasicMaterial( { color: newcolor, linewidth: 5 } ) );
				countries.push( mesh );
				scene.add( mesh );

				mesh.geometry.computeBoundingBox();
				var center = new THREE.Vector3();
				mesh.geometry.boundingBox.getCenter( center );

				mesh.add( earthPivot );
				let height = 1;
				// height = height ? height : 0;
				const geometry = new THREE.SphereGeometry( height, 50, 36 );
				const material = new THREE.MeshBasicMaterial( { color: newcolor } );
				const cone = new THREE.Mesh( geometry, material );
				cone.position.copy( center );
				cone.position.setLength( radius + height );
				cone.name = topology.objects.countries.geometries[ i ].properties[ 'name' ];
				cones.push( cone );
				earthPivot.add( cone );

			}

			//translate US Cone by selection with array and xyz coords and rotation
			cones[ 16 ].position.x += 50;
			cones[ 16 ].position.z -= 15;
			cones[ 16 ].position.y -= 35;
			console.log(cones[16].position);

			let guiobj = { loadGDP: function () {
				for ( var i = 0; i < countries.length; i ++ ) {
					cones[ i ].scale.x = topology.objects.countries.geometries[ i ].properties[ 'GDP(US$M)' ] * 0.000002;
					cones[ i ].scale.y = topology.objects.countries.geometries[ i ].properties[ 'GDP(US$M)' ] * 0.000002;
					cones[ i ].scale.z = topology.objects.countries.geometries[ i ].properties[ 'GDP(US$M)' ] * 0.000002;
				}
			},
			loadPopulation: function () {
				for ( var i = 0; i < countries.length; i ++ ) {
					cones[ i ].scale.x = topology.objects.countries.geometries[ i ].properties[ 'Population Growth Rate' ] * 2.2;
					cones[ i ].scale.y = topology.objects.countries.geometries[ i ].properties[ 'Population Growth Rate' ] * 2.2;
					cones[ i ].scale.z = topology.objects.countries.geometries[ i ].properties[ 'Population Growth Rate' ] * 2.2;
				}
			},
			pressFreedom: function () {
				for ( var i = 0; i < countries.length; i ++ ) {
					cones[ i ].scale.x = 50 / topology.objects.countries.geometries[ i ].properties[ 'Press Freedom Index' ];
					cones[ i ].scale.y = 50 / topology.objects.countries.geometries[ i ].properties[ 'Press Freedom Index' ];
					cones[ i ].scale.z = 50 / topology.objects.countries.geometries[ i ].properties[ 'Press Freedom Index' ];
				}
			},
			rotObj: true };

			datagui.add( guiobj, 'loadGDP' ).name( 'World GDP 2022(US$M)' );
			datagui.add( guiobj, 'loadPopulation' ).name( 'Population Growth 2022(%)' );
			datagui.add( guiobj, 'pressFreedom' ).name( 'Press Freedom Index 2021' );
			datagui.add( guiobj, 'rotObj' ).name( 'Rotation' );

			controls = new TrackballControls( camera, renderer.domElement );

			// const helper = new THREE.CameraHelper( camera );
			// scene.add( helper );
			//
			// const axesHelper = new THREE.AxesHelper( 50 );
			// scene.add( axesHelper );
			d3.timer( function ( t ) {
						if ( guiobj.rotObj ) {
							for ( var i = 0; i < countries.length; i ++ ) {
								countries[ i ].rotation.x = Math.sin( t / 21000 ) * Math.PI / 3 - Math.PI / 2;
								countries[ i ].rotation.z = t / 20000;
								cones[ i ].rotation.x = Math.sin( t / 21000 ) * Math.PI / 3 - Math.PI / 2;
								cones[ i ].rotation.z = t / 20000;
							}

							theta += 0.1;
							lettersBase.rotation.y = t * -0.0005;
							controls.update();
						}
						renderer.render( scene, camera );
					} );
				} );
		// 	d3.timer( function ( t ) {
		// 		if ( guiobj.rotObj ) {
		// 			// for ( var i = 0; i < countries.length; i ++ ) {
		// 			// 	countries[ i ].rotation.x = Math.sin( t / 21000 ) * Math.PI / 3 - Math.PI / 2;
		// 			// 	countries[ i ].rotation.z = t / 20000;
		// 			// 	cones[ i ].rotation.x = Math.sin( t / 21000 ) * Math.PI / 3 - Math.PI / 2;
		// 			// 	cones[ i ].rotation.z = t / 20000;
		// 			// }
		// 			theta += 0.1;
		//
		// 			lettersBase.rotation.y = t * -0.0005;
		//
		// 			// camera.position.x = 100 * Math.sin( THREE.MathUtils.degToRad( theta ) );
		// 			camera.position.y = 100 * Math.sin( THREE.MathUtils.degToRad( theta ) );
		// 			// camera.position.z = 100 * Math.cos( THREE.MathUtils.degToRad( theta ) );
		// 			camera.lookAt( earthPivot.position );
		// 			camera.updateMatrixWorld();
		//
		// 			controls.update();
		// 		}
		//
		// 		// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
		// 		// const geometry = new THREE.BufferGeometry().setFromPoints( [new THREE.Vector3(0,0,0),pointer] );
		// 		// const line = new THREE.Line( geometry, material );
		// 		// scene.add(line)
		//
		// 		raycaster.setFromCamera( pointer, camera );
		// 		const intersects = raycaster.intersectObjects( earthPivot.children, false );
		// 		console.log(raycaster.ray)
		//
		// 		if ( intersects.length > 0 ) {
		//
		// 			if ( INTERSECTED != intersects[ 0 ].object ) {
		//
		// 				console.log(intersects[0].object.name)
		// 				INTERSECTED = intersects[ 0 ].object;
		//
		// 			}
		//
		// 		} else {
		//
		// 			INTERSECTED = null;
		//
		// 		}
		//
		// 		renderer.render( scene, camera );
		// 	} );
		// } );

		// Converts a point [longitude, latitude] in degrees to a THREE.Vector3.
		function vertex( point ) {

			var lambda = point[ 0 ] * Math.PI / 180,
			phi = point[ 1 ] * Math.PI / 180,
			cosPhi = Math.cos( phi );
			return new THREE.Vector3(
				radius * cosPhi * Math.cos( lambda ),
				radius * cosPhi * Math.sin( lambda ),
				radius * Math.sin( phi )
			);

		}

		function pointerMove( event ){

			pointer.x = ( event.clientX / width ) * 2 - 1;
			pointer.y = - ( event.clientY / height ) * 2 + 1;

		}

		// Converts a GeoJSON MultiLineString in spherical coordinates to a THREE.LineSegments.
		function wireframe( multilinestring, material ) {

			var geometry = new THREE.BufferGeometry();
			var pointsArray = new Array();
			multilinestring.coordinates.forEach( function ( line ) {

				d3.pairs( line.map( vertex ), function ( a, b ) {

					pointsArray.push( a, b );

				} );

			} );
			geometry.setFromPoints( pointsArray );
			return new THREE.LineSegments( geometry, material );

		}

	}

	function anim() {
		const stats = Stats();

		let containerGui = document.getElementById( 'guiPanel2' );
		containerGui.appendChild( stats.dom );
		const gui = new GUI( { container: containerGui, width: 250 } );

		const settings = {
			distortion: 0.5,
		};

		gui.add( settings, 'distortion', 0.2, 2.5, 0.5 );

		var container, renderer, scene, camera, mesh, mesh2, material, material2, fov = 20;

		var width = window.innerWidth/1.1;
		var height = window.innerHeight/1.1;
		var start = Date.now();

		window.addEventListener( 'load', init );

		function init() {

			container = document.querySelector( '.my_dataviz' );

			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera( fov, width / height, 1, 1000 );
			camera.position.z = 65;
			camera.position.x = 100;
			camera.position.y = -10;
			camera.target = new THREE.Vector3( 0, 0, 0 );

			scene.add( camera );

			var panoTexture = new THREE.TextureLoader().load( './Pages/Index/blue.jpg' );
			// var panoTexture2 = new THREE.TextureLoader().load( './Pages/Index/gen.jpg' );

			var sphere = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 60 ), new THREE.MeshBasicMaterial( { map: panoTexture } ) );
			// sphere.scale.x = - 1;
			sphere.doubleSided = true;
			scene.add( sphere );

			material = new THREE.ShaderMaterial( {
				uniforms: {
					tShine: { type: "t", value: panoTexture },
					time: { type: "f", value: 0 },
					weight: { type: "f", value: 0 },
					distortion: { type: "f", value: settings.distortion }
				},
				wireframe: true,
				vertexShader: noise,
				fragmentShader: frag
			} );

			mesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 18, 15 ), material );
			mesh.position.setX( - 20 );
			scene.add( mesh );

			material2 = new THREE.ShaderMaterial( {
				uniforms: {
					tShine: { type: "t", value: panoTexture },
					time: { type: "f", value: 0 },
					weight: { type: "f", value: 0 }
				},
				vertexShader: noise,
				fragmentShader: frag
			} );

			mesh2 = new THREE.Mesh( new THREE.IcosahedronGeometry( 10, 40 ), material2 );
			mesh2.position.setX( - 20 );
			scene.add( mesh2 );

			renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( width, height );
			renderer.autoClear = false;

			container.appendChild( renderer.domElement );

			var controls = new TrackballControls( camera, renderer.domElement );
			controls.enableZoom = false;
			window.addEventListener( 'resize', onWindowResize, false );

			render();

		}

		function onWindowResize() {

			renderer.setSize( window.innerWidth/1.2, window.innerHeight/1.2 );
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

		}

		var start = Date.now();

		function render() {

			material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
			material.uniforms[ 'weight' ].value = 20.0 * ( .5 + .5 * Math.sin( .00025 * ( Date.now() - start ) ) );
			material.uniforms[ 'distortion' ].value = settings.distortion;

			material2.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
			material2.uniforms[ 'weight' ].value = 20.0 * ( .5 + .5 * Math.sin( .00025 * ( Date.now() - start ) ) );

			stats.update();
			renderer.render( scene, camera );
			requestAnimationFrame( render );

		}

	}

	// if ($('#my_dataviz:visible')) {
	//   anim();
	// }
	//
	// if ($('#my_dataviz:visible')) {
	//   globe();
	// }
	anim();
	globe();
