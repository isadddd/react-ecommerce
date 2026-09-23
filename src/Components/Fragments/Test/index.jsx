import { useEffect, useState } from "react";

const Test = () => {
  console.log("Test render");

  const [testt, setTestt] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    console.log("EFFECT RUN");
  }, [testt]);

  return (
    <section className="w-full px-4">
      <div className={`mx-auto flex h-100 w-full max-w-295 gap-2 mt-5 border`}>
        <button onClick={() => setTestt([...testt, "test"])}>Add</button>
      </div>
    </section>
  );
};

export default Test;
