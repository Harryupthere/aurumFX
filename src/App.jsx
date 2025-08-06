import Leaderboard from './components/Leaderboard';
import './styles/App.scss';

function App() {
  return (
    <div className="app">
      <div className="scrolling-banner">
    <span>🚀 Win up to $50,000 in the Arc Funding Forex Competition! Built for Traders. Backed by Professionals. Join Now & Conquer the Charts! 🚀</span>
  </div>
      <div className="container">
        <header className="app-header">
          <h1>Forex Competition Leaderboard</h1>
          <p className="subtitle">
            Real-time leaderboard showcasing our top-performing traders and their exceptional results
          </p>
        </header>

        <main>
          <Leaderboard />
        </main>
      </div>
    </div>
  );
}

export default App;