import { useState } from "react"
import CustomDropdown from "./CustomDropdown2"

function App() {
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2", "Item 3"])

  const handleNewItem = (item: string) => {
    console.log(`Selected item: ${item}`)
  }

  return (
    <div>
      <CustomDropdown
        items={["Item 1", "Item 2", "Item 3"]}
        placeholder="Select an item"
        onSelect={(item) => console.log("Selected item:", item)}
        allowAddNew={true}
      />
    </div>
  )
}

export default App
