import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const cities = [
    "Jakarta, ID",
    "New York, US",
    "London, UK",
    "Paris, FR",
    "Tokyo, JP",
    "Sydney, AU",
    "Berlin, DE",
    "Toronto, CA",
    "Beijing, CN",
    "Moscow, RU",
    "São Paulo, BR",
    "Mexico City, MX",
    "Cairo, EG",
    "Buenos Aires, AR",
    "Lagos, NG",
    "Mumbai, IN",
    "Istanbul, TR",
    "Bangkok, TH",
    "Seoul, KR",
    "Madrid, ES",
    "Rome, IT",
    "Lima, PE",
    "Kuala Lumpur, MY",
    "Cape Town, ZA",
    "Dubai, AE",
    "Hong Kong, HK",
    "Singapore, SG",
    "Athens, GR",
    "Helsinki, FI",
    "Oslo, NO",
];

export default function CitiesDropdown({ cityName, handleCityChange }) {
    const buttonBackgroundColor = "rgba(0, 123, 255, 0.5)"; // Replace with your actual button background color

    return (
        <div>
            <FormControl sx={{ m: 1, width: '248px', height: '65px' }} variant="outlined" color='info'>
                <InputLabel id="demo-multiple-checkbox-label" sx={{ color: '#000000', fontSize: '17px', marginTop: "-3px", marginLeft: "8px" }}>
                    Select City
                </InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={cityName}
                    onChange={handleCityChange}
                    MenuProps={MenuProps}
                    input={<OutlinedInput label="City" />}
                    sx={{ m: 1, width: '248px', height: '45px', marginTop: '0px', backgroundColor: "#ececec", borderRadius: '8px' }}
                >
                    {cities.map((city) => (
                        <MenuItem
                            key={city}
                            value={city}
                            sx={{
                                backgroundColor: city === cityName ? buttonBackgroundColor : 'inherit',
                                '&.Mui-selected': {
                                    backgroundColor: buttonBackgroundColor,
                                    '&:hover': {
                                        backgroundColor: buttonBackgroundColor,
                                    },
                                },
                            }}
                        >
                            <ListItemText primary={city} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}