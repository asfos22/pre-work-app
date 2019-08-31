import React, { useState } from 'react';
import ReactMapGl, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import * as starbucksData from './data/features.json';
import CityPin from './CityPin';

function App() {
	const [ viewport, setViewport ] = useState({
		latitude: 26.449923,
		longitude: 80.331871,
		zoom: 1,
		height: '100%',
		width: '100%'
	});

	const [ selectedShops, setSelectedShops ] = useState(null);
	const [ gotoViewport, setGotoViewport ] = useState({});

	return (
		<div className="map-container">
			<div className="list">
				<div className="header">Starbucks</div>
				{starbucksData.features.map((cities) => {
					return (
						<ul
							key={cities.properties.Postcode}
							onClick={(e) => {
								e.preventDefault();
								setSelectedShops(cities);
							}}
						>
							{cities.properties.City}
						</ul>
					);
				})}
			</div>
			<div className="map">
				<ReactMapGl
					{...viewport}
					mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
					mapStyle="mapbox://styles/ridam2/cjzrahywv36901cp8dlj4ff42"
					onViewportChange={(viewport) => {
						setViewport(viewport);
					}}
				>
					{starbucksData.features.map((shops) => {
						return (
							<Marker
								key={shops.properties.City}
								latitude={shops.geometry.coordinates[1]}
								longitude={shops.geometry.coordinates[0]}
							>
								<CityPin size={20} />
								{/* <button className="marker">
									<img src="/icons8_starbucks-48.png" alt="coffee" />
								</button> */}
							</Marker>
						);
					})}

					{selectedShops ? (
						<Popup
							latitude={selectedShops.geometry.coordinates[1]}
							longitude={selectedShops.geometry.coordinates[0]}
							onClose={() => {
								setSelectedShops(null);
							}}
						>
							<div>
								<div className="map-name">
									<h1>{selectedShops.properties.Store_Name}</h1>
								</div>
								<p>{selectedShops.properties.Street_Address}</p>
								<p>{selectedShops.properties.City}</p>
								<p>{selectedShops.properties.Timezone}</p>
							</div>
						</Popup>
					) : null}
				</ReactMapGl>
				{/* <h1>Hello I am here</h1> */}
			</div>
		</div>
	);
}

export default App;
