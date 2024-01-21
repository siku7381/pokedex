'use client';

import React from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const PokemonRow = ({ pokemon }) => {
    return (
        <div className="card glass h-50 w-full bg-base-100 shadow-xl border">
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={pokemon?.sprite}
                    alt="Pokemon"
                    className='image'
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                            {pokemon?.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">

                            {pokemon?.types?.name}
                        </Typography>
                    </CardContent>

                </Box>

            </Card>

        </div>
    )
}

export default PokemonRow;