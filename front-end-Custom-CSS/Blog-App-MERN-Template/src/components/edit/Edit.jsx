import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import "../create/create.css";

const Edit = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState(false);

    const history = useHistory();

    const { id } = useParams();

    const headerss = () => {
        axios.create({
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    const getTutorialById = async () => {
        const response = await axios.get(`http://localhost:8080/api/tutorials/${id}`, headerss);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPublished(response.data.published);
    }

    useEffect(() => {
        getTutorialById();
    }, []);

    const updateTutorial = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/tutorials/${id}`, {
            title: title,
            description: description,
            published: published
        }, headerss);
        history.push("/")
    }

    return (
        <>
            <section className='newPost'>
                <div className='container boxItems'>

                    <form onSubmit={updateTutorial} >
                        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />

                        <textarea name='' id='' placeholder='Description' cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} />

                        <Select value={published} onChange={(e) => setPublished(e.target.value)}>
                            <MenuItem value={true}>Ready Stock</MenuItem>
                            <MenuItem value={false}>Out Of Stock</MenuItem>
                        </Select>

                        <br />

                        <button className='button'>Update Post</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Edit