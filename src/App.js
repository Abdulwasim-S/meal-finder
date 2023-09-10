import "./App.css";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import { LazyLoadImage } from "react-lazy-load-image-component";

function App() {
  const [meals, setMeals] = useState([]);
  const [value, setValue] = useState("");
  async function findMeal(value) {
    try {
      setMeals([]);
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + value
      );
      const nameData = await response.json();
      if (nameData.meals !== null) setMeals(nameData.meals);
      else setMeals([]);
      
      if(nameData.meals === null) alert("no food found");
      // console.log(meals.length)
      console.log(meals)
      // console.log(ingrdient.length)
      // console.log(ingrdient)
    } catch (error) {
      console.log("Somethings went wrong...Try again",error);
    }
  }
  return (
    <div className="App">
      <Header/>
        <div className="row mb-5">
          <div className="col-2"></div>
        <input
        className="col-5 m-1 form-control w-50"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search here chicken,veg..."
        />
        <button
        className="col-2 m-1 btn btn-dark"
          onClick={() => {
            findMeal(value !== "" ? value : alert("Enter a food name to search"));
          }}
        >
          Search
        </button>
        </div>
        <div className="container text-center">
          <h1 className="bg-light mt-3 py-3">Meals List</h1>
          <div className="row justify-content-center">
            {meals.length > 0 && meals.map((ele,id)=>(
              <div className="col-md-3 p-3 mb-3" key={id}>
              <div className="card">
              <div className="image-box">
              <LazyLoadImage effect="blur" class="card-img-top p-3" src={ele.strMealThumb} alt="CardImage"/>
              </div>
                  <div className="card-body">
                    <h3>{ele.strMeal}</h3>
                    <a className="btn btn-dark" href={ele.strYoutube} target="_blank" rel="noreferrer">Watch</a>
                  </div>
              </div>
              </div>
            ))}
            {meals.length===0&& <h3 className="text-light bg-dark py-3">Search for meal list</h3>}
          </div>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
