import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);

    if(props.changeCount) {
      props.changeCount(props.id, btn)
    }
  }, [btn]);

  useEffect(()=>{
    if(props.count) {
      setBtn(props.count)
    }
  }, [props.count])

  return (
    <div className="flex items-center justify-center gap-2">
      <span
        onClick={(e) => {
          if (btn > 1) {
            setBtn((prev) => prev - 1);
          } else {
            setBtn(1);
          }
        }}
      >
        <button type="button" className="text-white bg-red-500 px-3 py-1 rounded text-center">
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>
      <div className="">
        <input
          type="number"
          min={1}
          max={100}
          value={btn}
          onChange={(e) => {
            if (e.target.value > 1) {
              setBtn(e.target.value);
            } else {
              setBtn(1);
            }
          }} 
          className="px-3 py-1 rounded outline-none border border-gray-300 hover:border-cyan-400"
        />
      </div>
      <span onClick={() => setBtn((prev) => ++prev)}>
        <button type="button" className="text-white bg-green-500 px-3 py-1 rounded text-center">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}
