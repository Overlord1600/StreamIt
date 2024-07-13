import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Home from "./Home";
import axios from "axios";
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from "../../firebaseconfig";
import { ChoiceContext } from "../../context/ChoiceContext";
import { AuthContext } from "../../context/AuthContext";
const Homes = () => {
  const { token } = useContext(AuthContext);
  const {choice} = useContext(ChoiceContext)
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(choice);
        const response = await axios.get(
          choice === "Movie" ?  "http://localhost:8000/api/movie/?type=Movie" : "http://localhost:8000/api/movie/?type=Series",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
        await Promise.all(response.data.map(async (item,index) => {
          if(!item.video.includes("googleapis")){
            const vidRef = ref(storage,`videos/${item.video}`);
            item.video = await getDownloadURL(vidRef);
              await axios.put(`http://localhost:8000/api/movie/${item._id}`, {
                ...item,
              }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
          }
        }));
        setItems(response.data); 

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
  }, [choice]);
  return (
    <>
      <section className='home'>
        <Home items={items} />
      </section>
      <div className='mragin'></div>
    </>
  );
}

export default Homes;
