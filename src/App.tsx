import { DefaultTheme, ThemeProvider } from "react-jss"
import Dropdown from "components/Dropdown"

const theme: DefaultTheme = {
  colorPrimary: "#738ad2",
  colorAccent: "#DADEFF",
  colorHover: "#e7e7e7",
  colorGrey: "grey",
}

function App() {
  const items = ["Education 📚", "Sport ⚽️", "Games 🎮"]

  return (
    <ThemeProvider theme={theme}>
      <Dropdown
        items={items}
        placeholder="Type or select item"
        onSelect={(item) => console.log("Selected item:", item)}
      />
    </ThemeProvider>
  )
}

export default App
