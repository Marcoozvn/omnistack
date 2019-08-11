import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api'

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
  useEffect(() => {
    async function loadUsers(){
      const response = await api.get('/dev', {
        headers: {
          user: match.params.id
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  const [users, setUsers] = useState([]);

  async function handleLike(id) {
    await api.post(`/dev/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    })

    setUsers(users.filter(user => user._id !== id));
  };

  async function handleDislike(id) {
    await api.post(`/dev/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    })

    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev"/>
      </Link>      
      <ul>
        {users.map((user) => (
          <li key={user._id}>
          <img src={user.avatar} alt=""></img>
          <footer>
            <strong>{user.name}</strong>
            <p>{user.bio}</p>
          </footer>
          
          <div className='buttons'> 
            <button type='button' onClick={() => handleLike(user._id)}>
              <img src={like} alt=""></img>
            </button>
            <button type='button' onClick={() => handleDislike(user._id)}>
              <img src={dislike} alt=""></img>
            </button>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
}