import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {Title, useLocale, useSetLocale, useTranslate} from 'react-admin';
import {makeStyles} from '@mui/styles';
// import {changeTheme} from './actions';
import { useStore } from 'react-redux'
// import {AppState} from '../types';
import { DollarPrice } from '@/components';
import { changeLocale } from '@/functions';


const useStyles = makeStyles({
    label: {width: '10em', display: 'inline-block'},
    button: {margin: '1em'},
});

const Configuration = () => {
    const translate = useTranslate();
    const locale = useLocale();
    const setLocale = useSetLocale();

    const classes = useStyles();
    const theLocale = useSelector((state) => {console.log(state)});

    // const [theLocale, setTheLocale] = useStore('locale','fa');
    // const [theLocale, setTheLocale] = useStore('locale','fa');
console.log('theLocale',theLocale);
    const dispatch = useDispatch();
    return (
        <Card>
            <Title title={translate('pos.configuration')}/>
            <CardContent>
                <div className={classes.label}>{translate('pos.language')}</div>
                <Button
                    variant="contained"
                    className={classes.button}
                    // color={locale === 'en' ? 'primary' : 'default'}
                    onClick={() => {setLocale('en');dispatch(changeLocale('en'));console.log('setLocale','en')}}
                >
                    en
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    // color={locale === 'fa' ? 'primary' : 'default'}
                    onClick={() => {setLocale('fa');dispatch(changeLocale('fa'));console.log('setLocale','fa')}}
                >
                    fa
                </Button>

                <DollarPrice />

            </CardContent>
        </Card>
    );
};

export default Configuration;
