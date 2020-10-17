import React from "react";
import "./App.css";
import {crew} from "./members";

export const Datas = () => {
    return (
    <>
    <HomePageHeader></HomePageHeader>
      <div className="stock-container">
      {crew.map((crew, key) => {
          return (
            <div key={key}>
              <Data
                key={key}
                crewId={crew.crewId}
                image={crew.image}
                name={crew.name}
                userId={crew.userId}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
const HomePageHeader = () => {
    return (
      <header className="header">
        <h2>People Absences</h2>
      </header>
    );
  };
  const Data = ({ crewId, image, name, userId }) => {
    if (!crewId) return <div />;
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <h5>{crewId}</h5>
            </td>
            <td>
              <h5>{image}</h5>
            </td>
            <td>
              <h4>{name}</h4>
            </td>
            <td>
              <p>{userId}</p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };