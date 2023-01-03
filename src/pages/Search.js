import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Button,
    InputGroup,
    FormControl,
    Card,
    Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Slider.css';

const Search = ({ setTracks, setAlbumImageURL }) => {
    const [accessToken, setAccessToken] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [albums, setAlbums] = useState([]);
    const history = useHistory();

    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
        };
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then((result) => result.json())
            .then((data) => setAccessToken(data.access_token))
            .catch((error) => {
                console.log('Error');
            });
    }, []);

    async function searchAlbums() {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
        };
        var artistID = await fetch(
            'https://api.spotify.com/v1/search?q=' +
                searchInput +
                '&type=artist',
            searchParameters,
        )
            .then((response) => response.json())
            .then((data) => {
                return data.artists.items[0].id;
            })
            .catch((error) => {
                console.log('Error');
            });

        var returnedAlbums = await fetch(
            'https://api.spotify.com/v1/artists/' +
                artistID +
                '/albums' +
                '?include_groups=album&market=CA&limit=50',
            searchParameters,
        )
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.items);
            })
            .catch((error) => {
                console.log('Error');
            });

        return returnedAlbums;
    }

    async function searchSongs(album) {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
        };

        var returnedAlbums = await fetch(
            'https://api.spotify.com/v1/albums/' +
                album.id +
                '/tracks' +
                '?market=CA&limit=50',
            searchParameters,
        )
            .then((response) => response.json())
            .then((data) => {
                setTracks(data.items);
                setAlbumImageURL(album.images);
            })
            .then(() => history.push('/maker'))
            .catch((error) => {
                console.log('Error');
            });
    }

    return (
        <div>
            <Container>
                <InputGroup className='mb-3' size='lg'>
                    <FormControl
                        placeholder='Search for Artist'
                        type='input'
                        onChange={(event) => {
                            setSearchInput(event.target.value);
                        }}
                    />
                    <Button
                        onClick={() => {
                            searchAlbums();
                        }}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className='mx-2 row row-cols-4'>
                    {albums.map((album, i) => {
                        return (
                            <Col sm={4}>
                                <div className='bg-image hover-zoom'>
                                    <Card
                                        onClick={() => {
                                            searchSongs(album);
                                        }}>
                                        <Card.Img src={album.images[1].url} />
                                        <Card.Body>
                                            <Card.Title>
                                                {album.name}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export { Search };
