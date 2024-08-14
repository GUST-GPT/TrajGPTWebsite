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

const operations = [
    "Trajectory Classification",
    "Trajectory Generation",
    "Trajectory Imputation",
    "Trajectory Summarization",

];

export default function OperationsDropdown({ operationName, handleOperationChange }) {
    const buttonBackgroundColor = "rgba(0, 123, 255, 0.5)"; // Replace with your actual button background color

    return (
        <div>
            <FormControl sx={{ m: 1, width: '248px', height: '65px' }} variant="outlined" color='info'>
                <InputLabel id="demo-multiple-checkbox-label" sx={{ color: '#000000', fontSize: '17px', marginTop: "-3px", marginLeft: "8px" }}>
                    Select An Operation
                </InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={operationName}
                    onChange={handleOperationChange}
                    MenuProps={MenuProps}
                    input={<OutlinedInput label="City" />}
                    sx={{ m: 1, width: '248px', height: '45px', marginTop: '0px', backgroundColor: "#ececec", borderRadius: '8px' }}
                >
                    {operations.map((city) => (
                        <MenuItem
                            key={city}
                            value={city}
                            sx={{
                                backgroundColor: city === operationName ? buttonBackgroundColor : 'inherit',
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