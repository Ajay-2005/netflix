import React, { useEffect, useState } from "react";
import './header.css';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

function Header() {
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={`Header ${show && "Header_black"}`}>
            <div className="Header-container">
                <div className="Header-left">
                    <ul>
                        <img
                            className="logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                            alt="Netflix logo"
                        />
                        <li>Home</li>
                        <li>TV Shows</li>
                        <li>Movies</li>
                        <li>Latest</li>
                    </ul>
                </div>
                <div className="Header-right">
                    <div className="search-box">
                        <TextField
                            variant="outlined"
                            placeholder="Search movies"
                            value={searchTerm}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                            style={{ backgroundColor:"#fff" }}
                        />
                    </div>
                   
                    <IconButton>
                        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Header;
