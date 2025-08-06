import { useState, useEffect } from 'react';
import TraderRow from './TraderRow';
import '../styles/Leaderboard.scss';
import useApiRequest from "../hook/useApiRequest";
import { API_ENDPOINTS } from "../constants/endPoints";
import { useNavigate } from "react-router-dom";
import { successMsg, errorMsg } from "../utils/customFn";
const Leaderboard = () => {
    const { fetchData } = useApiRequest();
  const navigate = useNavigate();
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data - in a real app, this would come from an API
  const sampleTraders = [
    {
      id: 'FXT001',
      name: 'Alexander Chen',
      balance: 2847520,
      growth: 23.87,
      platform: 'MT5',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT002',
      name: 'Sarah Rodriguez',
      balance: 2654380,
      growth: 19.42,
      platform: 'cTrader',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT003',
      name: 'Marcus Johnson',
      balance: 2298765,
      growth: 15.63,
      platform: 'MT4',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT004',
      name: 'Elena Volkov',
      balance: 2156890,
      growth: 12.94,
      platform: 'MT5',
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT005',
      name: 'David Kim',
      balance: 1987430,
      growth: 8.76,
      platform: 'cTrader',
      avatar: 'https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT006',
      name: 'Isabella Santos',
      balance: 1856720,
      growth: 6.32,
      platform: 'MT4',
      avatar: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT007',
      name: 'James Wilson',
      balance: 1743690,
      growth: 4.18,
      platform: 'MT5',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT008',
      name: 'Amara Okafor',
      balance: 1632180,
      growth: 1.95,
      platform: 'cTrader',
      avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT009',
      name: 'Oliver Thompson',
      balance: 1521340,
      growth: -2.14,
      platform: 'MT4',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 'FXT010',
      name: 'Zara Ahmed',
      balance: 1456780,
      growth: -4.73,
      platform: 'MT5',
      avatar: 'https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  const [leaderboard,setLeaderboard]=useState([])

  useEffect(() => {
     callApi()
    // Simulate loading
    // const timer = setTimeout(() => {
    //   setTraders(leaderboard);
    //   setLoading(false);
    // }, 1000);

    // return () => clearTimeout(timer);
  }, []);

  const callApi=async()=>{
    try{
      const response=await fetchData(API_ENDPOINTS.leaderboard, navigate, "GET", {});
    
    if(response.success){
      setLeaderboard(response.data)
          setTraders(response.data);
      setLoading(false);
  
    return  response.data

    }
    }catch(error){
      console.log(error)
    }
  }

  if (loading) {
    return (
      <div className="leaderboard">
        <div className="leaderboard-header">
          <h2>Loading...</h2>
        </div>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#8892b0' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid rgba(255,255,255,0.1)', 
            borderTop: '4px solid #00ff88',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Fetching trader data...
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Top Performers</h2>
        <div className="live-indicator">
          LIVE
        </div>
      </div>

      {/* Desktop Table */}
      <div className='table-container'>
      <table className="leaderboard-table">
        <thead className="table-header">
          <tr>
            <th>Rank</th>
            <th>Trader</th>
            <th className="text-left">Account Balance</th>
            <th className="text-center">Growth %</th>
            <th className="text-center">Platform</th>
          </tr>
        </thead>
        <tbody>
          {traders.length>0 && traders.map((trader, index) => (
            <TraderRow 
              key={trader.id} 
              trader={trader} 
              rank={index + 1} 
            />
          ))}
        </tbody>
      </table>
</div>
      {/* Mobile Cards */}
      <div className="mobile-cards">
        {traders.length>0 &&traders.map((trader, index) => (
          <div key={`mobile-${trader.id}`}>
            <TraderRow 
              trader={trader} 
              rank={index + 1} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;