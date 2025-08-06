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