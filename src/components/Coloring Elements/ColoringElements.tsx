import {useState} from 'react';
import FilterArea from "./FilterArea/FilterArea";
import {TAvailableTabs} from "../../App";

function ColoringElements() {
  const [currentSelection, setCurrentSelection] = useState<TAvailableTabs>(undefined);
  const updateCurrentSelection = (value : TAvailableTabs) => {
    setCurrentSelection(value)
    setTimeout(() => {
      setCurrentSelection(undefined)
    }, 1)
  }
  return (
    <div>
      <h1 className={`w`}>Coloring Elements</h1>
      <div className={`flex items-center justify-between w-full my-6`}>
        <button onClick={() => {updateCurrentSelection("select")}}>select</button>
        <button onClick={() => {updateCurrentSelection("selectAll")}}>selectAll</button>
        <button onClick={() => {updateCurrentSelection("selectEven")}}>selectEven</button>
        <button onClick={() => {updateCurrentSelection("selectOdd")}}>selectOdd</button>
      </div>
      <FilterArea currentSelection={currentSelection} dimensions={{
        height : 600,
        width : 450
      }} />
      <div>
        {currentSelection}
      </div>
    </div>
  );
}

export default ColoringElements;