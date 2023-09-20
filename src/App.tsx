import './App.css'
import Sort from "./components/methods/sort/Sort";

export type TAvailableTabs = "select" | "selectAll" | "selectEven" | "selectOdd" | undefined

function App() {
  return (
    <div>
      <Sort dimensions={{height : 100, width : 300}}/>
    </div>
  )
}

export default App
