import React from 'react';
import { Box, FormControl, InputLabel, makeStyles, OutlinedInput, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
}));

const TextBox = () => {
    const classes = useStyles();

    return (
        <Box>
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Text</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    // value={values.amount}
                    // onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    labelWidth={60}
                />
            </FormControl>
        </Box>
    )
}

export default TextBox;