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
          // await Promise.all(
          // response.data.map(async (item) => {
          //  console.log(item._id);
            // if (item.cover.includes("firebasestorage")) {
              
            // } else {
            //   const coverRef = ref(storage, `images/${item.cover}`);
            //   item.cover = await getDownloadURL(coverRef);
            //   await axios.put(`http://localhost:8000/api/movie/${item._id}`, {
            //     ...item,
            //   },{
            //     headers: {
            //       Authorization:
            //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODU1NjRhMzU1YWJlZDQwZWYwMjQ4ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMDAxNDYxNH0.0EPCnmBCR_SD0Kqi6G6bsZE2wQS5PMpWYAG5LCQoNRE",
            //     },
            //   });
              
            // }
            // if(item.video.includes("googleapis")){
            
            // } else {
            //   const videoRef = ref(storage,`videos/${item.video}`)
            //   item.video = await getDownloadURL(videoRef);
            //   await axios.put(`http://localhost:8000/api/movie/${item._id}`, {
            //     ...item,
            //   }, {
            //     headers: {
            //       Authorization: `Bearer ${token}`,
            //     },
            //   });
              
            // }
            // if(item.titleImage.includes("googleapis")){
             
            // } else {
            //   const titleImage = ref(storage,`images/${item.titleImage}`)
            //   item.titleImage = await getDownloadURL(titleImage);
            //   await axios.put(`http://localhost:8000/api/movie/${item._id}`, {
            //     ...item,
            //   }, {
            //     headers: {
            //       Authorization: `Bearer ${token}`,
            //     },
            //   });
            // }
          //   return item;
          // })
       // );
        setItems(response.data); 

      } catch (error) {
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
