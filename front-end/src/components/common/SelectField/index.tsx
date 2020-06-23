import React, {FC} from 'react';
import {createStyles, withStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select, {SelectProps} from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {v4 as uuid} from "uuid";
import {colors, fontSizes} from "../../../theme";

const BootstrapInput = withStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: 13
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #cfcfe1',
        padding: '16px 22px',
        '&:focus': {
            borderColor: '#b2b2e7',
            backgroundColor: '#fff',
            borderRadius: 4
        },
    }
}))(InputBase);

interface IStyles {
    classes: {
        root: string,
        inputLabel: string,
        menuPaper: string,
        itemRoot: string,
        itemSelected: string,
        input?: string
    }
}

export type SelectFieldProps = SelectProps & {
    items: string[],
    id?: string,
    label?: string,
    additionalText?: string,
    additionalTextMethod?: string
}

const SelectsFieldBase: FC<SelectFieldProps & IStyles> = (props) => {
    const {classes, items, additionalText, additionalTextMethod, id, label, ...otherProps} = props
    const inputId = id || `id-${uuid()}`;

    return (
        <FormControl className={classes.root}>
            <InputLabel shrink htmlFor={inputId} classes={{formControl: classes.inputLabel}}>{label}</InputLabel>
            <Select
                {...otherProps}
                MenuProps={{
                    classes: {
                        paper: classes.menuPaper
                    }
                }}
                input={
                    <BootstrapInput
                        {...otherProps.inputProps as any}
                        id={inputId}
                    />
                }
            >{items && items.map((item: any, key: number) => {
                const val = typeof item === 'object' ? item.value : item
                return (
                    <MenuItem
                        value={val}
                        key={key}
                        classes={{
                            root: classes.itemRoot,
                            selected: classes.itemSelected
                        }}
                    >
                        {val}
                    </MenuItem>
                )
            })}
            </Select>
        </FormControl>
    );
};

const SelectField = withStyles((theme: Theme) => createStyles({
    root: {
        width: '100%'
    },
    inputLabel: {
        position: 'relative',
        transform: 'none',
        color: colors.label,
        '&.Mui-focused': {
            color: colors.label
        },
        fontSize: fontSizes.table,
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: 9,
        whiteSpace: 'pre'
    },
    menuPaper: {
        marginTop: 58,
        maxHeight: 300
    },
    itemRoot: {
        borderRadius: 3,
        padding: '5px 7px',
        color: '#70708f',
        margin: '0 7px',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#00adc7 !important'
        }
    },
    itemSelected: {
        color: '#fff',
        backgroundColor: '#00adc7 !important',
        borderRadius: 3,
        padding: '5px 7px',
        margin: '0 7px'
    },
}))(SelectsFieldBase);

export default SelectField