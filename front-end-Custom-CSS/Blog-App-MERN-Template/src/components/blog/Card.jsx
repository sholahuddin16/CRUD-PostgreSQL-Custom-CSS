import { useState, useEffect } from "react";
import axios from "axios";
import "./blog.css"
import { blog } from "../../assets/data/data"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import Container from '@mui/material/Container';
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';


export const Card = (props) => {
  const history = useHistory();

  const { tittle, description, published, id, onDelete } = props;

  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDescription, setSearchDescription] = useState("");


  useEffect(() => {
    getTutorials();
  }, []);

  const headerss = () => {
    axios.create({
      headers: {
        "Content-type": "application/json"
      }
    })
  }

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }

  const onChangeSearchDescription = e => {
    const searchDescription = e.target.value;
    setSearchDescription(searchDescription);
  }

  const TutorialSearch = {
    findByTitle(title) {
      return axios.get(`http://192.168.1.3:8080/api/tutorials?title=${title}`, headerss);
    },
    findByDescription(description) {
      return axios.get(`http://192.168.1.3:8080/api/tutorials?description=${description}`, headerss);
    }
  }

  const getTutorials = async () => {
    const response = await axios.get("http://192.168.1.3:8080/api/tutorials", headerss);
    setTutorials(response.data);
    console.log(response.data);
  }


  const deleteTutorials = async (id) => {
    const response = await axios.delete(`http://localhost:8080/api/tutorials/${id}`, headerss);
    getTutorials(response.data);
  }

  const findByTitlee = () => {
    TutorialSearch.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };

  const findByDescriptionn = () => {
    TutorialSearch.findByDescription(searchDescription)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      <section className='blog'>
        <Container component="main" maxWidth="md">
          <input type='text' className="inputtt" placeholder='Search Game' value={searchTitle} onChange={onChangeSearchTitle} />
          <button className='button' onClick={findByTitlee}>
            <AiOutlineSearch color="black" />
          </button>
        </Container>

        <br />

        <div className='container grid3'>
          {tutorials.map(tutorials => (
            <div className='box boxItems' key={tutorials.id}>
              <div className='img'>
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt='' />
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <p class="card-footer-item">{tutorials.published ? "Ready Stock" : "Out Of Stock"}</p>
                </div>
                <Link to={`/details/${tutorials.id}`} className='link'>
                  <h3>{tutorials.title}</h3>
                </Link>
                <p>{tutorials.description}...</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>APRIL 05, 2018</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
                </div>
                <div className='date'>
                  <button className='buttonB'>
                    <Link to={`/edit/${tutorials.id}`}>
                      <AiOutlineEdit color="white" />
                    </Link>
                  </button>
                  <button className='buttonA' onClick={() =>  deleteTutorials(tutorials.id)}>
                    <AiOutlineDelete color="white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
