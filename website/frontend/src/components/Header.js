import React, { useState, useEffect } from "react";
import {
    ProSidebar,
    Menu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    MenuItem,
} from "react-pro-sidebar";
import Box from "@mui/joy/Box";
import { Grid } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import { styled } from '@mui/material/styles';
import ButtonMaterial from '@mui/material/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import UploadIcon from '@mui/icons-material/Upload';
import RestoreIcon from '@mui/icons-material/Restore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DownloadIcon from '@mui/icons-material/Download';
import CompressIcon from '@mui/icons-material/Compress';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import logo from './assets/route.svg';
import CitiesDropdown from "./CitiesDropdown";
import OperationsDropdown from "./OperationsDropdown";
import QuantityInput from "./NumberInputComponent";
import Divider from '@mui/material/Divider';
import ProgressBar from "react-bootstrap/ProgressBar";

const Header = ({ handleImageUpdate, handleCityUpdate }) => {
    const [trajectoriesReceived, setTrajectoriesReceived] = useState(null);
    const [uploadedData, setUploadedData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [city, setCity] = React.useState("");
    const [city2, setCity2] = React.useState("");
    const [email, setEmail] = useState('');
    const [uploadedData2, setUploadedData2] = useState(null);

    const [operation, setOperation] = React.useState("");

    const [maxTrajectoriesCount, setMaxTrajectoriesCount] = React.useState(1);
    const [maxTrajectoriesLength, setMaxTrajectoriesLength] = React.useState(10);
    const [progress, setProgress] = useState(100); // State to manage progress
    const [progressDesc, setProgressDesc] = useState("Progess Will Show Here..."); // State to manage progress
    const [estimatedTimeDesc, setEstimatedTimeDesc] = useState(""); // State to manage progress
    const [progress2, setProgress2] = useState(100); // State to manage progress
    const [progressDesc2, setProgressDesc2] = useState("Please Enter Details Above..."); // State to manage progress
    const [estimatedTimeDesc2, setEstimatedTimeDesc2] = useState(""); // State to manage progress
    const [timer, setTimer] = useState(null); // Store timer ID for clearing
    const [totalGPSPoints, setTotalGPSPoints] = useState(0);
    const [formData, setFormData] = useState({
        requestType: "",
        trajectoriesUploaded: null,
        trajectoriesCount: 0,
        trajectoriesLength: 0,
        city: "",

    });
    const [formData2, setFormData2] = useState({
        requestType: "",
        trajectoriesUploaded: null,
        city: "",
        operation: "",
        email: "",

    });
    // const [dummy, setDummy] = useState(null);
    const handleMaxTrajectoriesLengthChange = (newValue) => {
        setMaxTrajectoriesLength(newValue);
    };
    const handleMaxTrajectoriesCountChange = (newValue) => {
        setMaxTrajectoriesCount(newValue);
    };
    const handleChangeCityDropDown = (event) => {
        setCity(event.target.value);
        // handleCityUpdate(city);
    };
    const handleChangeCityDropDown2 = (event) => {
        setCity2(event.target.value);
        // handleCityUpdate(city);
    };
    const handleChangeOperationDropDown = (event) => {
        setOperation(event.target.value);
        // handleCityUpdate(city);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                let json = JSON.parse(e.target.result);
                // Function to add the summary to each trajectory and place it in a 'trajectories' array
                const addSummaryToTrajectories = (data) => {
                    // Filter and map the data
                    const filteredData = data.map(item => {
                        const firstPoint = item.trajectory.split(',')[0]; // Extract the first GPS point
                        return {
                            id: item.id,
                            trajectory: item.trajectory,
                            summary: firstPoint // Add the summary part
                        };
                    });

                    // Return an object with the 'trajectories' key
                    return {
                        trajectories: filteredData
                    };
                };
                // console.log(json);


                // Add the summary to each trajectory
                json = addSummaryToTrajectories(json);
                // Function to calculate the total number of GPS points
                const calculateTotalGPSPoints = (data) => {
                    let totalPoints = 0;
                    let points = 0;
                    data.trajectories.forEach(item => {
                        points = item.trajectory.split(',').length;
                        if (points * 2 < 100) {
                            points = 100;
                        }
                        totalPoints += points;
                    });
                    return totalPoints;
                };

                // Calculate and set the total number of GPS points
                const totalPoints = calculateTotalGPSPoints(json);
                setTotalGPSPoints(totalPoints);
                console.log(`Total GPS points in all trajectories: ${totalPoints}`);

                // handleImageUpdate(filteredData); // Clear the map before updating
                setTrajectoriesReceived(json);
                setUploadedData(json.trajectories);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        reader.readAsText(file);
    };
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                let json = JSON.parse(e.target.result);
                // Function to add the summary to each trajectory and place it in a 'trajectories' array
                const addSummaryToTrajectories = (data) => {
                    // Filter and map the data
                    const filteredData = data.map(item => {
                        const firstPoint = item.trajectory.split(',')[0]; // Extract the first GPS point
                        return {
                            id: item.id,
                            trajectory: item.trajectory,
                            summary: firstPoint // Add the summary part
                        };
                    });

                    // Return an object with the 'trajectories' key
                    return {
                        trajectories: filteredData
                    };
                };
                // console.log(json);


                // Add the summary to each trajectory
                json = addSummaryToTrajectories(json);
                // // Function to calculate the total number of GPS points
                // const calculateTotalGPSPoints = (data) => {
                //     let totalPoints = 0;
                //     let points = 0;
                //     data.trajectories.forEach(item => {
                //         points = item.trajectory.split(',').length;
                //         if (points * 2 < 100) {
                //             points = 100;
                //         }
                //         totalPoints += points;
                //     });
                //     return totalPoints;
                // };

                // Calculate and set the total number of GPS points
                // const totalPoints2 = calculateTotalGPSPoints(json);
                // setTotalGPSPoints2(totalPoints2);
                // console.log(`Total GPS points in all trajectories: ${totalPoints2}`);

                setTrajectoriesReceived(json);
                setUploadedData2(json.trajectories);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleSummarizeClick = async (e) => {
        if (e) e.preventDefault();
        if (!uploadedData) {
            alert("Please Upload Trajectories First To Summarize");
            return;
        }
        else if (!city) {
            alert("Please Select A City From The List Above");
            return;
        }
        // Clear previous timer if exists
        if (timer) {
            clearInterval(timer);
        }
        formData.requestType = "Summarize";
        formData.trajectoriesCount = 0;
        formData.trajectoriesLength = 0;
        formData.city = city;
        formData.trajectoriesUploaded = uploadedData;
        console.log(formData.trajectoriesUploaded);
        // Set up the interval for updating progress
        // console.log("totalPoints:", totalGPSPoints);
        const duration = ((totalGPSPoints * 4 * 0.03) * 1000) + 9000; // (0.03 second per token and space is counted)*2 "two trials maximum" * total input gps points converted to milliseconds + 9 second warmup
        // console.log(duration);
        const interval = duration / 10; // Update every second
        let elapsed = 0;
        // Reset progress and description
        setProgress(0);
        setProgressDesc("Sumarizing Trajectories...");
        const durationInMinutes = (duration / 1000 / 60).toFixed(1);;
        setEstimatedTimeDesc(`Est. Time ~ ${durationInMinutes} minute(s) (upper estimate)`);
        const newTimer = setInterval(() => {
            elapsed += interval;
            let percentage = Math.min((elapsed / duration) * 100, 100);

            if (percentage >= 100) {
                percentage = 90; // Cap the progress at 90% if it reaches 100%
            }

            setProgress(percentage);
        }, interval);

        setTimer(newTimer); // Save the new timer ID

        try {
            const response = await fetch("summarize/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Replace with actual data if needed
            });

            if (response.ok) {
                const responseData = await response.json();
                setTrajectoriesReceived(responseData);
                setProgress(100);
                setProgressDesc("Trajectories Summarized and Plotted.");
                setEstimatedTimeDesc(``);
                clearInterval(newTimer); // Clear timer when done
            } else {
                const errorResponse = await response.json();
                setProgress(0);
                setProgressDesc(`Error: ${errorResponse.error}`);
                setEstimatedTimeDesc(``);
                console.error("Failed to fetch trajectories data. HTTP status:", response.status, "Error message:", errorResponse.error);
                clearInterval(newTimer); // Clear timer on error
            }
        } catch (error) {
            if (error.message === 'Request timed out') {
                console.error("The request timed out. Please try again later.");
            } else {
                console.error("Error requesting Trajectories:", error);
            }
            setProgress(0);
            setProgressDesc("Error occurred. Please try again.");
            setEstimatedTimeDesc(``);
            clearInterval(newTimer); // Clear timer on exception
        }
    };
    const handleImputeClick = async (e) => {
        if (e) e.preventDefault();
        if (!uploadedData) {
            alert("Please Upload Trajectories First To Impute");
            return;
        }
        else if (!city) {
            alert("Please Select A City From The List Above");
            return;
        }

        formData.requestType = "Impute";
        formData.trajectoriesCount = 0;
        formData.trajectoriesLength = 0;
        formData.city = city;
        formData.trajectoriesUploaded = uploadedData;
        try {
            const response = await fetch("impute/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Replace with actual data if needed
            });

            if (response.ok) {
                const responseData = await response.json();
                setTrajectoriesReceived(responseData);
            } else {
                const errorResponse = await response.json();
                console.error(
                    "Failed to fetch trajectories data. HTTP status:",
                    response.status,
                    "Error message:",
                    errorResponse.error
                );
            }
        } catch (error) {
            console.error("Error requesting Trajectories:", error);
        }
    };
    // console.log("Trajectorires Received  ", trajectoriesReceived);
    const handleGenerateClick = async (e) => {
        if (e) e.preventDefault();

        if (!city) {
            alert("Please Select A City From The List Above");
            return;
        } else if (!maxTrajectoriesCount) {
            alert("Please Enter Number Of Trajectories To Generate");
            return;
        } else if (!maxTrajectoriesLength) {
            alert("Please Enter Maximum Length Of Trajectories To Generate");
            return;
        }




        // Clear previous timer if exists
        if (timer) {
            clearInterval(timer);
        }

        formData.requestType = "Generate";
        formData.trajectoriesCount = maxTrajectoriesCount;
        formData.trajectoriesLength = maxTrajectoriesLength;
        formData.city = city;
        formData.trajectoriesUploaded = {};

        // Set up the interval for updating progress
        const duration = ((maxTrajectoriesCount * maxTrajectoriesLength * 2 * 0.02) * 1000) + 10000; // 0.02 second per token converted to milliseconds +15 second warmup
        console.log(duration);
        const interval = duration / 10; // Update every second
        let elapsed = 0;
        // Reset progress and description
        setProgress(0);
        setProgressDesc("Generating Trajectories...");
        const durationInMinutes = (duration / 1000 / 60).toFixed(1);;
        setEstimatedTimeDesc(`Est. Time ~ ${durationInMinutes} minute(s) (upper estimate)`);
        const newTimer = setInterval(() => {
            elapsed += interval;
            let percentage = Math.min((elapsed / duration) * 100, 100);

            if (percentage >= 100) {
                percentage = 90; // Cap the progress at 90% if it reaches 100%
            }

            setProgress(percentage);
        }, interval);

        setTimer(newTimer); // Save the new timer ID

        try {
            //Clear the map from any plotted trajectories
            setTrajectoriesReceived(null);
            const response = await fetch("generate/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // console.log("Response,", response);

            if (response.ok) {
                const responseData = await response.json();
                console.log('Respone', responseData);
                setTrajectoriesReceived(responseData);
                setProgress(100);
                setProgressDesc("Trajectories Generated and Plotted.");
                setEstimatedTimeDesc(``);
                clearInterval(newTimer); // Clear timer when done
            } else {
                const errorResponse = await response.json();
                setProgress(0);
                setProgressDesc(`Error: ${errorResponse.error}`);
                setEstimatedTimeDesc(``);
                console.error("Failed to fetch trajectories data. HTTP status:", response.status, "Error message:", errorResponse.error);
                clearInterval(newTimer); // Clear timer on error
            }
        } catch (error) {
            if (error.message === 'Request timed out') {
                console.error("The request timed out. Please try again later.");
            } else {
                console.error("Error requesting Trajectories:", error);
            }
            setProgress(0);
            setProgressDesc("Error occurred. Please try again.");
            setEstimatedTimeDesc(``);
            clearInterval(newTimer); // Clear timer on exception
        }
    };
    const handleDownloadClick = async (e) => {
        if (e) e.preventDefault();

        if (!city) {
            alert("Please Select A City From The List Above");
            return;
        }
        formData.requestType = "Download";
        formData.trajectoriesCount = maxTrajectoriesCount;
        formData.trajectoriesLength = maxTrajectoriesLength;
        formData.city = city;
        formData.trajectoriesUploaded = {};
        // Reset progress and description
        setProgress(20);
        setProgressDesc("Downloading Results...");
        setEstimatedTimeDesc(``);
        try {
            //Clear the map from any plotted trajectories

            const response = await fetch("download/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // console.log("Response,", response);

            if (response.ok) {
                // Parse the response as JSON
                const responseData = await response.json();
                const fileName = responseData.fileName;
                alert("Receive file name: " + fileName);
                const fileUrl = `static/media/${fileName}`;

                // Create a temporary link element
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileName; // The name of the file after it is downloaded

                // Append the link to the body (required for Firefox)
                document.body.appendChild(link);

                // Programmatically click the link to trigger the download
                link.click();

                // Remove the link from the DOM
                document.body.removeChild(link);
                setProgress(100);
                setProgressDesc("Data Downloaded...");
                setEstimatedTimeDesc(``);
                // clearInterval(newTimer); // Clear timer when done
            } else {
                const errorResponse = await response.json();
                setProgress(0);
                setProgressDesc(`Error: ${errorResponse.error}`);
                setEstimatedTimeDesc(``);
                console.error("Failed to download results. HTTP status:", response.status, "Error message:", errorResponse.error);
                // clearInterval(newTimer); // Clear timer on error
            }
        } catch (error) {
            if (error.message === 'Request timed out') {
                console.error("The request timed out. Please try again later.");
            } else {
                console.error("Error requesting Trajectories:", error);
            }
            setProgress(0);
            setProgressDesc("Error occurred. Please try again.");
            setEstimatedTimeDesc(``);
            // clearInterval(newTimer); // Clear timer on exception
        }
    };
    const handleStartTrainingClick = async (e) => {
        if (e) e.preventDefault();

        if (!city2) {
            alert("Please Select A City From The List Above");
            return;
        }
        else if (!operation) {
            alert("Please Select An Operation From The List Above");
            return;
        }
        else if (!email) {
            alert("Please Enter An Email To Notify You When Done");
            return;
        }
        else if (!uploadedData2) {
            alert("Please Upload A Dataset");
            return;
        }
        formData2.requestType = "Train";
        formData2.city = city2;
        formData2.trajectoriesUploaded = uploadedData2;
        formData2.operation = operation;
        formData2.email = email;
        // Reset progress and description
        setProgress2(0);
        setProgressDesc("Submitting A New Request...");
        setEstimatedTimeDesc(``);
        try {
            //Clear the map from any plotted trajectories

            const response = await fetch("train/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData2),
            });

            // console.log("Response,", response);

            if (response.ok) {
                // Parse the response as JSON
                const responseData = await response.json();

                setProgress2(100);
                setProgressDesc2("Request Submitted Successfully, You will");
                setEstimatedTimeDesc2(`recieve an email, when model is ready...`);
                // Set a timeout to reset the progress and descriptions after 5 seconds
                setTimeout(() => {
                    setProgress2(0); // Reset progress to 0
                    setProgressDesc2("You Can Start A New Request Now"); // Clear progress description
                    setEstimatedTimeDesc2(""); // Clear estimated time description
                    setOperation("");
                    setCity2("");
                    setEmail("");
                    setUploadedData2(null);
                    setTrajectoriesReceived(null);
                    handleImageUpdate(null);

                }, 7000); // 7000 milliseconds = 7 seconds

                // clearInterval(newTimer); // Clear timer when done
            } else {
                const errorResponse = await response.json();
                setProgress2(0);
                setProgressDesc2(`Error: ${errorResponse.error}`);
                setEstimatedTimeDesc2(``);
                console.error("Failed to download results. HTTP status:", response.status, "Error message:", errorResponse.error);
                // clearInterval(newTimer); // Clear timer on error
            }
        } catch (error) {
            if (error.message === 'Request timed out') {
                console.error("The request timed out. Please try again later.");
            } else {
                console.error("Error requesting Trajectories:", error);
            }
            setProgress2(0);
            setProgressDesc2("Error occurred. Please try again.");
            setEstimatedTimeDesc2(``);
            // clearInterval(newTimer); // Clear timer on exception
        }
    };

    useEffect(() => {
        if (city) {
            handleCityUpdate(city);
        }
    }, [city, handleCityUpdate]);
    useEffect(() => {
        if (city2) {
            handleCityUpdate(city2);
        }
    }, [city2, handleCityUpdate]);

    useEffect(() => {
        if (trajectoriesReceived) {

            handleImageUpdate(trajectoriesReceived);
        }
    }, [trajectoriesReceived, handleImageUpdate]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return (
        <div id="header">
            <ProSidebar>
                <SidebarHeader>
                    <div
                        style={{
                            background: '#C2B9B0',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '0px',
                            marginBottom: '0px',
                            fontFamily: "'Poppins', sans-serif"
                        }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: '30px', height: '30px', marginLeft: '10px', marginRight: '10px' }}
                        />
                        {/* <h2 style={{ color: 'black', margin: 0, padding: '1px 10px', fontSize: '37px' }}>GUST-GPT</h2> */}
                        <h2 style={{ color: 'black', margin: 0, padding: '1px 2px', fontSize: '32px' }}>Demo DMLab</h2>
                    </div>
                </SidebarHeader>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor="inherit" // Set to "inherit" so we can override it with sx
                    TabIndicatorProps={{ style: { backgroundColor: 'black' } }} // Change the indicator color
                    sx={{
                        '.MuiTab-root': {
                            fontSize: '12px', // Adjust the font size here
                            color: '#C2B9B0', // Change the text color
                            fontWeight: 'bold', // Make the text bold
                            '&.Mui-selected': {
                                color: 'black', // Ensure the selected tab also has the brown color
                                fontWeight: 'bold', // Make the text bold
                            }
                        }
                    }}
                >
                    <Tab label="Pre-Trained Models" />
                    <Tab label="Train new model" />
                </Tabs>
                <SidebarContent className="sidebar-content">
                    {activeTab === 0 && (
                        <Menu>
                            <MenuItem >
                                <div style={{ marginLeft: '-15px' }}>
                                    <CitiesDropdown cityName={city} handleCityChange={handleChangeCityDropDown} />
                                </div>
                            </MenuItem>
                            <div style={{ marginBottom: '-40px' }}></div>
                            <MenuItem>
                                <Box display="flex" justifyContent="center" width="100%">
                                    <ButtonMaterial
                                        component="label"
                                        variant="contained"
                                        color="inherit"
                                        startIcon={<UploadIcon />}
                                        size="small"
                                        fullWidth
                                        sx={{
                                            // textTransform: 'none',
                                            backgroundColor: '#C2B9B0',
                                            color: 'black',
                                            '&:hover': {
                                                backgroundColor: '#b0a69b'
                                            }
                                        }}
                                    >
                                        Upload Trajectories
                                        <VisuallyHiddenInput type="file" accept="application/json" onChange={handleFileChange} />
                                    </ButtonMaterial>
                                </Box>
                            </MenuItem>
                            <MenuItem>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xs={6}>
                                        <ButtonMaterial
                                            variant="contained"
                                            size="small"
                                            startIcon={<CompressIcon />}
                                            onClick={handleSummarizeClick}
                                            fullWidth
                                            sx={{
                                                // textTransform: 'none',
                                                backgroundColor: '#C2B9B0',
                                                color: 'black',
                                                '&:hover': {
                                                    backgroundColor: '#b0a69b'
                                                }
                                            }}
                                        >
                                            Summarize
                                        </ButtonMaterial>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ButtonMaterial
                                            variant="contained"
                                            size="small"
                                            startIcon={<RestoreIcon />}
                                            onClick={handleImputeClick}
                                            fullWidth
                                            sx={{
                                                backgroundColor: '#C2B9B0',
                                                color: 'black',
                                                '&:hover': {
                                                    backgroundColor: '#b0a69b'
                                                }
                                            }}
                                        >
                                            Impute
                                        </ButtonMaterial>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                            <Divider
                                sx={{
                                    // height: 1,
                                    margin: '5px 0px -1px 0px',
                                    border: '1px solid #ccc',

                                    // borderTop: '1px dashed #bbb',
                                }}
                            />
                            <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                                <h4 className="sidebar-titles">Generation Parameters:</h4>
                                <div style={{ marginLeft: "0px" }}></div>
                            </div>
                            <div style={{ marginTop: "15px", marginLeft: "10px" }}>
                                <h5 className="sidebar-titles-sub">Enter No. of Trajectories:</h5>


                                <div style={{ marginTop: "30px", width: '130px', marginLeft: '15px' }}>
                                    <QuantityInput myValue={maxTrajectoriesCount} onChange={handleMaxTrajectoriesCountChange} />
                                </div>
                            </div>
                            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                                <h5 className="sidebar-titles-sub">Enter Max Trajectory's Length: </h5>
                                <div style={{ marginLeft: "0px" }}></div>

                                {/* <Grid container alignItems="center" spacing={1}>
                                    <Grid item xs={8}> */}

                                {/* </Grid>
                                    <Grid item xs={4}>
                                        <Box> */}
                                <div style={{ marginTop: "30px", width: '130px', marginLeft: '15px' }}>
                                    <QuantityInput myValue={maxTrajectoriesLength} onChange={handleMaxTrajectoriesLengthChange} />
                                </div>
                                {/* </Box>
                                    </Grid>

                                </Grid> */}

                            </div>
                            <MenuItem>
                                <Box display="flex" justifyContent="center" width="80%">
                                    <ButtonMaterial
                                        variant="contained"
                                        color="primary"
                                        size="small"

                                        startIcon={<TrendingUpIcon />}
                                        onClick={handleGenerateClick}
                                        fullWidth
                                        sx={{
                                            // fontSize: '15px',
                                            backgroundColor: '#C2B9B0',
                                            marginLeft: '3vw',
                                            color: 'black',
                                            '&:hover': {
                                                backgroundColor: '#b0a69b'
                                            }
                                        }}
                                    >
                                        Generate
                                    </ButtonMaterial>
                                </Box>
                            </MenuItem>

                            <div
                                style={{
                                    marginTop: "0px",
                                    display: "flex",
                                    color: "white",
                                    marginLeft: "15px",
                                    // justifyContent: "center",
                                }}
                            >


                                <p style={{ fontSize: "13px", color: '#000000' }}>{progressDesc}</p>
                            </div>
                            <div
                                style={{
                                    marginTop: "-10px",
                                    display: "flex",
                                    color: "white",
                                    marginLeft: "15px",
                                    // justifyContent: "center",
                                }}
                            >
                                <p style={{ fontSize: "13px", color: '#000000' }}>{estimatedTimeDesc}</p>
                            </div>
                            <div
                                style={{
                                    marginTop: "0px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >

                                {/* TODO: Look at this website later to do the progress bar  */}
                                <ProgressBar
                                    // animated
                                    now={progress} // Set progress dynamically
                                    label={`Progress: ${progress}%`}
                                    style={{ width: "90%", height: "85%" }}
                                />
                            </div>
                            <MenuItem>
                                <Box display="flex" justifyContent="center" width="50%">
                                    <div
                                        style={{
                                            marginLeft: "7vw",
                                            maringRight: "3vw",

                                        }}
                                    >
                                        <ButtonMaterial
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            startIcon={<DownloadIcon />}
                                            onClick={handleDownloadClick}
                                            fullWidth
                                            sx={{
                                                // textTransform: 'none',
                                                backgroundColor: '#C2B9B0',
                                                color: 'black',
                                                '&:hover': {
                                                    backgroundColor: '#b0a69b'
                                                }
                                            }}

                                        >
                                            Download
                                        </ButtonMaterial>
                                    </div>
                                </Box>
                            </MenuItem>
                        </Menu>
                    )}
                    {activeTab === 1 && (
                        <Menu iconShape="square">
                            <MenuItem>
                                <div style={{ marginTop: "-20px", marginLeft: "10px" }}>
                                    <h4 className="sidebar-titles">Select Operation Type:</h4>
                                    <div style={{ marginLeft: "0px" }}></div>
                                </div>

                                <div style={{ marginLeft: '-15px' }}>
                                    <OperationsDropdown operationName={operation} handleOperationChange={handleChangeOperationDropDown} />
                                </div>
                                {/* </MenuItem>
                            <MenuItem > */}
                                <div style={{ marginTop: "-20px", marginLeft: "10px" }}>
                                    <h4 className="sidebar-titles">Select City:</h4>
                                    <div style={{ marginLeft: "0px" }}></div>
                                </div>
                                <div style={{ marginLeft: '-15px' }}>
                                    <CitiesDropdown cityName={city2} handleCityChange={handleChangeCityDropDown2} />
                                </div>
                                {/* </MenuItem>
                            <MenuItem> */}
                                <Box display="flex" justifyContent="center" width="100%">
                                    <ButtonMaterial
                                        component="label"
                                        variant="contained"
                                        color="inherit"
                                        startIcon={<UploadIcon />}
                                        size="medium"
                                        fullWidth
                                        sx={{
                                            // textTransform: 'none',
                                            backgroundColor: '#C2B9B0',
                                            color: 'black',
                                            fontSize: '11px',
                                            '&:hover': {
                                                backgroundColor: '#b0a69b'
                                            }
                                        }}
                                    >
                                        Upload Dataset of Trajectories
                                        <VisuallyHiddenInput type="file" accept="application/json" onChange={handleFileChange2} />
                                    </ButtonMaterial>
                                </Box>

                                <Box display="flex" justifyContent="flex-start" width="100%">

                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        style={{ marginLeft: '0px', padding: '5px', marginTop: '15px', marginBottom: '20px', width: '250px', }}
                                        required
                                    />
                                </Box>
                                <Box display="flex" justifyContent="center" width="100%">
                                    <ButtonMaterial
                                        variant="contained"
                                        size="small"
                                        startIcon={<PlayCircleOutlineIcon />}
                                        onClick={handleStartTrainingClick}
                                        fullWidth
                                        sx={{
                                            // textTransform: 'none',
                                            backgroundColor: '#C2B9B0',
                                            color: 'black',
                                            '&:hover': {
                                                backgroundColor: '#b0a69b'
                                            }
                                        }}
                                    >
                                        Start Training
                                    </ButtonMaterial>
                                </Box>
                                <div
                                    style={{
                                        marginTop: "20px",
                                        display: "flex",
                                        color: "white",
                                        marginLeft: "15px",
                                        // justifyContent: "center",
                                    }}
                                >


                                    <p style={{ fontSize: "13px", color: '#000000' }}>{progressDesc2}</p>
                                </div>
                                <div
                                    style={{
                                        marginTop: "-10px",
                                        display: "flex",
                                        color: "white",
                                        marginLeft: "15px",
                                        // justifyContent: "center",
                                    }}
                                >
                                    <p style={{ fontSize: "13px", color: '#000000' }}>{estimatedTimeDesc2}</p>
                                </div>
                                <div
                                    style={{
                                        marginTop: "0px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >

                                    {/* TODO: Look at this website later to do the progress bar  */}
                                    <ProgressBar
                                        // animated
                                        now={progress2} // Set progress dynamically
                                        label={`Progress: ${progress2}%`}
                                        style={{ width: "90%", height: "85%" }}
                                    />
                                </div>
                            </MenuItem>
                        </Menu>
                    )}
                </SidebarContent>
                <SidebarFooter className="sidebar-footer">
                    <Menu iconShape="square">
                        <div style={{ fontFamily: "'Poppins', sans-serif", padding: '2px', textAlign: 'center', color: '#888', fontSize: '12px' }}>
                            &copy; 2024 University of Minnesota - Twin Cities
                        </div>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div >
    );
};

export default Header;