import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";

export const App = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [collectionList, setCollectionList] = useState<{ name: string }[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const withoutCommas = value.replaceAll(",", "");
    const listNames = withoutCommas.split(" ").filter(Boolean);
    const resultName = name.trim();

    // send listNames to server
    try {
      const result = await axios.post("/createCollection", { collection: resultName, list: listNames });
      console.log(result);
    } catch (e) {
      console.log("catch e", e);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getCollections = async () => {
      // send listNames to server
      try {
        const result = await axios.get("/getCollectionsName", { signal: signal });
        console.log(result);
      } catch (e) {
        console.log("catch e", e);
      }

      setCollectionList([{ name: "first" }, { name: "second" }]);
    };

    getCollections();
    return () => controller.abort(signal);
  }, []);

  return (
    <>
      <h2>Создать коллекцию</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Имя коллекции:
          <input required value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </label>
        <label>
          Список ников:
          <input required value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
        </label>
        <button>создать</button>
      </form>
      {collectionList.map((collection) => {
        return <div>{collection.name}</div>;
      })}
    </>
  );
};
