import { useState, useEffect } from "react";
import "./App.css";
import { Title } from "./components/Title";
import { Lists } from "./components/Lists";
import { Card } from "./components/Card";
import api from "./services/api";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const dados = await api.get("/jobstories.json");

      if (dados.status === 200) {
        const ids = dados.data.slice(0, 10);
        const promises = ids.map((id) => api.get(`/item/${id}.json`));
        const results = await Promise.all(promises);
        setData(
          results.map((result) => result.data)
          //.filter((result) => result.id !== 33630503)
        );
        setLoading(false);
      } else {
        alert("Erro ao carregar dados");
      }
    };

    getData();
  }, []);

  const handleDate = (item) => {
    return new Date(item.time * 1000).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    });
  };

  const handleTextTitleCard = (title) => {
    const stringTitle = title.toUpperCase().split("IS HIRING")[0];
    return stringTitle || "No title text";
  };

  const handleTextBodyCard = (title) => {
    const stringTitle = title.toUpperCase().split("IS HIRING")[1];
    return stringTitle || "No body text";
  };

  const handleLoadMoreData = async () => {
    setLoading(true);

    const lastId = data[data.length - 1].id;
    const dados = await api.get(`/jobstories.json?print=pretty`);

    if (dados.status === 200) {
      //const ids = dados.data.slice(0, 10);
      const promises = dados.data.map((id) => api.get(`/item/${id}.json`));
      const results = await Promise.all(promises);

      setData((prevData) => [
        ...prevData,
        ...results
          .map((result) => result.data)
          .filter((result) => !prevData.includes(result) && result.id > lastId)
          .slice(0, 10),
      ]);
      setLoading(false);
    } else {
      alert("Erro ao carregar dados");
    }
  };

  return (
    <div className="App">
      <Title name="HN Jobs" />
      <p className="panel-counter-registers">
        Quantidade de registros encontrados: {data.length}
      </p>
      <Lists>
        {loading ? (
          <div className="loading">
            <p>Loading...</p>
          </div>
        ) : (
          data.map((item) => (
            <Card
              key={item.id}
              link={item.url}
              title={handleTextTitleCard(item.title)}
              body={handleTextBodyCard(item.title)}
              date={handleDate(item)}
            />
          ))
        )}
      </Lists>
      {/* Transformar em component */}
      {data.length > 0 && (
        <div className="more-buttons">
          <button className="btn-load-more" onClick={handleLoadMoreData}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
