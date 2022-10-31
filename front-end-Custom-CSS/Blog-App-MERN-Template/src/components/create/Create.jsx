import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "./create.css"

export const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const headerss = () => {
    axios.create({
      headers: {
        "Content-type": "application/json"
      }
    })
  }

  const history = useHistory();

  const saveTutorial = async (e) => {
    e.preventDefault();
    await axios.post('http://192.168.1.3:8080/api/tutorials', {
      title: title,
      description: description,
    }, headerss);
    history.push("/")
  }

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>

          <form onSubmit={saveTutorial}>
            <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>

            <textarea name='' id='' placeholder='Description' cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} />

            <button className='button'>Create Post</button>
          </form>
        </div>
      </section>
    </>
  )
}
