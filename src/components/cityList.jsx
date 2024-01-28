/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./cityItem";
import styles from "./cityList.module.css";
import { useCities } from "../contexts/citiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
