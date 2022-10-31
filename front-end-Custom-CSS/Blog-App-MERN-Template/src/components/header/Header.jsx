import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg"
import { BiSearch } from "react-icons/bi";
import "./header.css"
import { User } from "./User"
import { nav } from "../../assets/data/data"
import { Link } from "react-router-dom"
import axios from "axios";


export const Header = () => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDescription, setSearchDescription] = useState("");

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

  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })

  return (
    <>
      <header className='header'>
        <div className='scontainer flex'>
          <div className='logo'>
            <img src={logo} alt='logo' width='100px' />
          </div>
          <nav>
            
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/"}>Create Post</Link>
              </li>
            </ul>
          </nav>
          <div className='account flexCenter'>
            <User />
          </div>
        </div>
      </header>
    </>
  )
}
