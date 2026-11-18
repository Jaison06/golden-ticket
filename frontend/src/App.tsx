import { Header } from "./components/Header";
import { BuyTicket } from "./pages/BuyTicket";
import { Footer } from "./components/Footer";
export default function App() {
  return (
    <main className="page-container">
      <Header />
      <BuyTicket />
      <Footer />
    </main>
  );
}
