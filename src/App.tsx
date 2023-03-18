import { useState } from "react";
import "./App.css";

function App() {
  type Variable1 = { id: number; var1: number; var2: number };
  type Variable2 = { id: number; var1: number; var2: number; var3: number };
  const [bunbo, setBunbo] = useState<Variable1[]>([]);
  const [bunshi, setBunshi] = useState<Variable2[]>([]);
  const [nextId, setNextId] = useState(0);
  const [nextBunbo, setNextBunbo] = useState(1);
  const [nextBunshi, setNextBunshi] = useState(1);
  const [nextJuritsu, setNextJuritsu] = useState(1);
  const [result1, setResult1] = useState(0);
  const [result2, setResult2] = useState(0);
  const setNewResult = () => {
    setBunbo([...bunbo, { id: nextId, var1: nextBunbo, var2: nextJuritsu }]);
    setResult1(result1 + nextBunbo * nextJuritsu);
    setBunshi([
      ...bunshi,
      { id: nextId, var1: nextBunshi, var2: nextJuritsu, var3: nextBunbo },
    ]);
    setResult2(result2 + nextBunshi * nextJuritsu * nextBunbo);
    setNextId(nextId + 1);
    setNextBunbo(nextBunbo);
    setNextBunshi(nextBunshi);
  };
  const removeResult = (id: number) => {
    const newBunbo = bunbo.filter((item) => item.id !== id);
    const newArray1 = newBunbo.map((item) => {
      return item.var1 * item.var2;
    });
    const newResult1 =
      newArray1.length === 0 ? 0 : newArray1.reduce((x, y) => x + y);
    setResult1(newResult1);
    setBunbo(newBunbo);
    const newBunshi = bunshi.filter((item) => item.id !== id);
    const newArray2 = newBunshi.map((item) => {
      return item.var1 * item.var2 * item.var3;
    });
    const newResult2 =
      newArray2.length === 0 ? 0 : newArray2.reduce((x, y) => x + y);
    setResult2(newResult2);
    setBunshi(newBunshi);
  };
  return (
    <>
      <p>
        単位数：
        <input
          type="text"
          key={"入力0"}
          onChange={(e) => {
            setNextBunbo(parseFloat(e.target.value));
          }}
        />
        評点：
        <input
          type="text"
          key={"入力1"}
          onChange={(e) => {
            setNextBunshi(parseFloat(e.target.value));
          }}
        />
        重率：
        <input
          type="text"
          key={"入力2"}
          onChange={(e) => {
            setNextJuritsu(parseFloat(e.target.value));
          }}
        />
        <button type="button" key={"ボタン"} onClick={setNewResult}>
          追加
        </button>
      </p>
      <p>値の表</p>
      <table key={"table"} className="table">
        <thead>
          <tr key={"tr"}>
            <th>単位数</th>
            <th>評点</th>
            <th>重率</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {bunshi.map((content) => (
            <tr key={content.id}>
              <td key={`変数${content.var3}`}>{content.var3}</td>
              <td key={`展開${content.var2}`}>{content.var1}</td>
              <td key={`回数${content.var2}`}>{content.var2}</td>
              <td key={`remove${content.id}`}>
                <button
                  key={`button${content.id}`}
                  type="button"
                  className="sakujo"
                  onClick={() => {
                    removeResult(content.id);
                  }}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>基本平均点は、{result2 / result1}です。</p>
    </>
  );
}

export default App;
