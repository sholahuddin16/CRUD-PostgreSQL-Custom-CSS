import React, { useState } from "react"
import "./details.css"
import "../../components/header/header.css"
import img from "../../assets/images/b5.jpg"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { blog } from "../../assets/data/data"

import axios from 'axios';


export const DetailsPages = () => {
  const { id } = useParams()

  const [title, setTitle] = useState('');
  const [published, setPublished] = useState('');
  const [description, setDescription] = useState('');

  const getTutorialById = async () => {
    const response = await axios.get(`http://192.168.1.3:8080/api/tutorials/${id}`, headerss);
    setTitle(response.data.title);
    setPublished(response.data.published);
    setDescription(response.data.description);
  };

  useEffect(() => {
    getTutorialById();
  }, []);

  const headerss = () => {
    axios.create({
      headers: {
        "Content-type": "application/json"
      }
    })
  };

  return (
    <>

      <section className='singlePage'>
        <div className='container'>
          <div className='left'>
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt='' />
          </div>
          <div className='right'>
            <div className='buttons'>
              <button className='button'>
                <BsPencilSquare />
              </button>
              <button className='button'>
                <AiOutlineDelete />
              </button>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Status: {published ? "Ready Stock" : "Out Of Stock"}</p>
          </div>
        </div>
      </section>

    </>
  )
}
