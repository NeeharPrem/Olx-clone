import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebase } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../Context/PostsContext";

import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {
  const [products, setProducts] = useState();
  const db = getFirestore(firebase);
  const { setPostDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = collection(db, "products");
        const querySnapshot = await getDocs(productRef);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [db]);

  const navigate = useNavigate();

  const handlePostClick = (product) => {
    if (setPostDetails) {
      setPostDetails(product);
      navigate("/view");
    } else {
      console.warn("setPostDetails is not available yet.");
    }
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products &&
            products.map((product) => (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
                key={product.id}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.date}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;