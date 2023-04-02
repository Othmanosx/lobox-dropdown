import CustomDropdown from "./components/Dropdown"

function App() {
  return (
    <div>
      <CustomDropdown
        items={["Item 1", "Item 2", "Item 3"]}
        placeholder="Type or Select an item"
        onSelect={(item) => console.log("Selected item:", item)}
      />
    </div>
  )
}

export default App
