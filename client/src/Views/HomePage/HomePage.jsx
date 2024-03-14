import React, { useEffect, useState } from "react";
import Carrusel from "./Carrusel/Carrusel";
import Carrusel2 from "./Carrusel/Carrusel2";
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../redux/actions";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductosHome);
  const [showParagraph, setShowParagraph] = useState(true);

  useEffect(() => {
    if (allProductos.length === 0) {
      dispatch(getProductos());
    }
  }, [dispatch, allProductos.length]);

  const recommendedProducts = Array.isArray(allProductos)
    ? allProductos
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)
    : [];

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const documentHeight = document.body.clientHeight;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= 50) {
        setShowParagraph(false);
      } else {
        setShowParagraph(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Carrusel />
      <div>
        <Cards data={recommendedProducts} />
      </div>
      <br />
      <br />
      <div
        className="h-40 bg-gradient-to-t from-gray-200 to-transparent"
        style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 0 }}
      >
        <p
          style={{
            fontWeight: "bold",
            color: "red",
            textAlign: "center",
            fontSize: "90px",
            opacity: "0.5",
            display: showParagraph ? "block" : "none",
          }}
        >
          TOP DROPS OF THE WEEK
        </p>
      </div>
      <Carrusel2 />
    <div style={{ paddingBottom: "30%" }}>
      <Footer />
</div>
    </div>
  );
};

export default HomePage;
