import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable'; // Import the draggable component
import { MapContainer, TileLayer, Polyline, Tooltip, Marker, useMap, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/styles.css';
import L from 'leaflet';
import endIconImg from './assets/endIcon.png';
import startIconImg from './assets/startIcon.png';

// Component to set the map center and zoom
const SetCenterAndZoom = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);

    return null;
};

// Coordinates for some major cities
const cityCoordinates = {
    "Jakarta, ID": [-6.2088, 106.8456],
    "New York, US": [40.7128, -74.0060],
    // ... (other city coordinates)
};

const parseTrajectory = (trajectoryString) => {
    return trajectoryString.split(',').map(point => {
        const [lat, lng] = point.split(' ');
        return [parseFloat(lat), parseFloat(lng)];
    });
};

// Define custom icons for start and end markers
const startIcon = new L.Icon({
    iconUrl: startIconImg,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const endIcon = new L.Icon({
    iconUrl: endIconImg,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapComponent = ({ trajectoriesReceived, CityName }) => {
    const [selectedTrajectory, setSelectedTrajectory] = useState(null);
    const [center, setCenter] = useState([40.712776, -74.005974]); // Default to New York
    const [zoom, setZoom] = useState(9); // Default zoom level
    const [showStats, setShowStats] = useState(true); // State to control visibility of the stats box
    const [showToggle, setShowToggle] = useState(true); // State to control visibility of the toggle button
    const [trajectories, setTrajectories] = useState([]);

    useEffect(() => {
        if (trajectoriesReceived && trajectoriesReceived.trajectories) {
            setTrajectories(trajectoriesReceived.trajectories);
        }
    }, [trajectoriesReceived]);

    useEffect(() => {
        if (CityName && cityCoordinates[CityName]) {
            setCenter(cityCoordinates[CityName]);
        }
    }, [CityName]);

    useEffect(() => {
        if (selectedTrajectory) {
            console.log("Selected trajectory", selectedTrajectory);
            const points = parseTrajectory(selectedTrajectory.trajectory);
            setCenter(points[0] || center);
            setZoom(16); // Zoom level for selected trajectory
        }
    }, [selectedTrajectory]);

    const { totalTrajectories, avgLength, avgSummaryRatio } = calculateStatistics(trajectories);

    const handleTrajectoryChange = (event) => {
        const selectedId = event.target.value;
        const trajectory = trajectories.find(t => t.id === selectedId);
        setSelectedTrajectory(trajectory);
    };

    return (
        <div
            style={{
                position: 'relative',
                height: '99.5vh',
                width: '81.25vw',
                marginLeft: '18.5vw'
            }}
        >
            <MapContainer
                center={center}
                zoom={zoom}
                zoomControl={false}
                attributionControl={false}
                style={{ height: '100%', width: '115%' }}
            >
                <SetCenterAndZoom center={center} zoom={zoom} />
                <ScaleControl position="bottomleft" imperial={true} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FullscreenControl position="topleft" title="Show full screen" />

                {trajectories.map((trajectory, index) => {
                    const trajectoryPoints = parseTrajectory(trajectory.trajectory);
                    const summaryPoints = parseTrajectory(trajectory.summary || "");

                    const startPoint = trajectoryPoints[0];
                    const endPoint = trajectoryPoints[trajectoryPoints.length - 1];

                    return (
                        <React.Fragment key={index}>
                            {trajectory.trajectory && (
                                <>
                                    <Polyline
                                        positions={trajectoryPoints}
                                        color="black"
                                        opacity={0.9}
                                    >
                                        <Tooltip>
                                            {`Trajectory Points: ${trajectoryPoints.length}`}
                                        </Tooltip>
                                    </Polyline>
                                    <Marker position={startPoint} icon={startIcon}>
                                        <Tooltip>Start of Trajectory</Tooltip>
                                    </Marker>
                                    <Marker position={endPoint} icon={endIcon}>
                                        <Tooltip>End of Trajectory</Tooltip>
                                    </Marker>
                                </>
                            )}
                            {trajectory.summary && (
                                <Polyline
                                    positions={summaryPoints}
                                    color="red"
                                    dashArray={[10, 5]}
                                    opacity={0.9}
                                >
                                    <Tooltip>
                                        {`Summary Points: ${summaryPoints.length}`}
                                    </Tooltip>
                                </Polyline>
                            )}
                        </React.Fragment>
                    );
                })}
            </MapContainer>

            {/* Statistics Box */}
            {showStats && (
                <Draggable>
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            zIndex: 10000 // Ensures the box is on top of the map
                        }}
                    >
                        <button
                            onClick={() => setShowStats(false)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            X
                        </button>
                        <h4>Statistics</h4>
                        <p>Total Trajectories: {totalTrajectories}</p>
                        <p>Avg Trajectories Length: {avgLength} points</p>
                        <p>Avg Summarization Ratio: {avgSummaryRatio}%</p>
                        <select onChange={handleTrajectoryChange} value={selectedTrajectory ? selectedTrajectory.id : ''}>
                            <option value="" disabled>Select a Trajectory</option>
                            {trajectories.map(trajectory => (
                                <option key={trajectory.id} value={trajectory.id}>
                                    Trajectory {trajectory.id}
                                </option>
                            ))}
                        </select>
                    </div>
                </Draggable>
            )}

            {/* Toggle Button for Statistics Box */}
            {showToggle && (
                <button
                    onClick={() => setShowStats(true)}
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '12px', // Smaller font size
                        cursor: 'pointer',
                        zIndex: 10000 // Ensures the button is on top of the map
                    }}
                >
                    Show Statistics
                </button>
            )}

            {/* Dropdown for Selecting Trajectories
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10000 }}>
               
            </div> */}
        </div>
    );
};

// Helper function to calculate statistics
const calculateStatistics = (trajectories) => {
    const totalTrajectories = trajectories.length;
    let totalPoints = 0;
    let totalSummaryPoints = 0;

    trajectories.forEach((trajectory) => {
        const trajectoryPoints = parseTrajectory(trajectory.trajectory);
        totalPoints += trajectoryPoints.length;

        if (trajectory.summary) {
            const summaryPoints = parseTrajectory(trajectory.summary);
            totalSummaryPoints += summaryPoints.length;
        }
    });

    const avgLength = totalPoints / totalTrajectories || 0;
    const avgSummaryRatio = (totalSummaryPoints / totalPoints) * 100 || 0;
    return {
        totalTrajectories,
        avgLength: avgLength.toFixed(2),
        avgSummaryRatio: avgSummaryRatio.toFixed(2),
    };
};

export default MapComponent;