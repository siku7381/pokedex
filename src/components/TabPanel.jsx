'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import PokemonRow from './PokemonRow';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function TabPanel({ pokemons }) {
    const [value, setValue] = React.useState(0);

    const { data: typesList, isLoading: isTypeLoading } = useQuery({
        queryKey: ['types'],
        queryFn: async () => {
            const res = await axios.get('/api/types');
            return res.data
        }
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="List View" {...a11yProps(0)} />
                    <Tab label="Grid View" {...a11yProps(1)} />
                    <Tab label="Type List" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {/* <table className='table-auto border-collapse border border-slate-400'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sprite</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pokemons?.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item?.name}</td>
                                        <td><img src={item?.sprite} alt='image' style={{ height: '70px', width: '100%', aspectRatio: '3/2', objectFit: 'contain' }} /></td>
                                        <td>{item?.types?.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='font-semibold' align="center">Name</TableCell>
                                <TableCell className='font-semibold' align="center">Sprite</TableCell>
                                <TableCell className='font-semibold' align="center">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pokemons.map((pok) => (
                                <TableRow
                                    key={pok.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" scope="row">
                                        {pok.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <CardMedia
                                            component="img"
                                            sx={{ height: '50px', width: '100%', aspectRatio: '3/2', objectFit: 'contain' }}
                                            image={pok?.sprite}
                                            alt="Pokemon"
                                            className='image'
                                        />
                                    </TableCell>
                                    <TableCell align="center">{pok?.types?.name}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                    {
                        pokemons?.map((item) => {
                            return (
                                <PokemonRow key={item.id} pokemon={item} />
                            )
                        })
                    }

                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='font-semibold' align="center">Name</TableCell>
                                <TableCell className='font-semibold' align="center">Pokemon</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typesList?.map((type) => (
                                <TableRow
                                    key={type.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" scope="row">
                                        {type?.name}
                                    </TableCell>
                                    <TableCell align="center" className='flex justify-center items-center'>
                                        {
                                            type?.Pokemon?.length === 0 ?
                                                <span>No Pokemons Assigned</span>
                                                :
                                                type?.Pokemon?.map((item, index) => {
                                                    return (
                                                        <div className='flex justify-center items-center'>
                                                            <div className='flex justify-center items-center flex-col'>
                                                                <CardMedia
                                                                    component="img"
                                                                    sx={{ height: '50px', width: '100%', aspectRatio: '3/2', objectFit: 'contain' }}
                                                                    image={item?.sprite}
                                                                    alt="Pokemon"
                                                                    className='image'
                                                                />
                                                                <span style={{ fontSize: '10px' }}>{item?.name}</span>
                                                            </div>
                                                            {
                                                                index !== type?.Pokemon?.length - 1 && <span>,</span>
                                                            }

                                                        </div>

                                                    )

                                                })
                                        }
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
        </Box>
    );
}