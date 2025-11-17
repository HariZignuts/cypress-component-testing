import "./App.css";
import { Button } from "@/components/Button";
import { FetchUserList } from "./components/FetchUserList";

function App() {
  return (
    <main>
      <h1>My Cypress Test App</h1>

      <section>
        <h2>Button Component</h2>
        <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
      </section>

      <section>
        <h2>Fetched User List</h2>
        <FetchUserList />
      </section>
    </main>
  );
}

export default App;
