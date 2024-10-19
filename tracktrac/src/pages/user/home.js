import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const api_token = localStorage.getItem('api_token');

export default function Home() {
    const [profileData, setProfileData] = useState(null);
const [top50Data, setTop50Data] = useState(null);

useEffect(() => {
    async function fetchData(token) {
        try {
            // Fetch profile
            const profileResult = await fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const profileData = await profileResult.json();
            setProfileData(profileData);
            console.log("Profile data fetched:", profileData);

            // Small delay before next request
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Fetch top 50
            const top50Result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const top50Data = await top50Result.json();
            setTop50Data(top50Data);
            console.log("Top 50 data fetched:", top50Data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData(api_token);
}, [api_token]);  // Add api_token as a dependency

// Use these effects to log state changes
useEffect(() => {
    console.log("Profile data updated:", profileData);
}, [profileData]);

useEffect(() => {
    console.log("Top 50 data updated:", top50Data);
}, [top50Data]);

    return (
        <Box>
            <Typography variant="h4">Home</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h5">Profile</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Display Name" secondary={profileData.display_name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Email" secondary={profileData.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Country" secondary={profileData.country} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Followers" secondary={profileData.followers.total} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Product" secondary={profileData.product} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="external_urls" secondary={profileData.external_urls.spotify} />
                        </ListItem>
                    </List>
                    
                </CardContent>
            </Card>
        </Box>
    );
}