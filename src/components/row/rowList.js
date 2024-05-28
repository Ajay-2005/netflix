import React from 'react';
import requests from '../../utils/requests';
import Row from './row'

function rowList(props) {
    return (
        <div style={{backgroundColor:"#111", color:"white"}}>
            <Row title="Netflix orginals" fetchurl={requests.fetchNetflixOriginals} isLarge={true}></Row>
            <Row title="Top rated movies" fetchurl={requests.fetchTopRatedMovies}></Row>
            <Row title="Action" fetchurl={requests.fetchActionMovies}></Row>
            <Row title="Comedy" fetchurl={requests.fetchComedyMovies}></Row>
            <Row title="Documentaries" fetchurl={requests.fetchDocumentaries}></Row>
            <Row title="Horror" fetchurl={requests.fetchHorrorMovies}></Row>
            <Row title="Tv shows" fetchurl={requests.fetchTvShow}></Row>

        </div>
    );
}

export default rowList;