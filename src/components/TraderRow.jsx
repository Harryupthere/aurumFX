import '../styles/TraderRow.scss';
import { allCountries } from 'country-telephone-data';

const TraderRow = ({ trader, rank }) => {

  const getGrowthClass = (growth) => {
    if (growth > 0) return 'positive';
    if (growth < 0) return 'negative';
    return 'neutral';
  };

  const getPlatformClass = (platform) => {
    return platform.toLowerCase().replace(/\s+/g, '');
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(balance);
  };

  const formatGrowthPercentage = (growth) => {
    return `${growth > 0 ? '+' : ''}${growth}%`;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Desktop table row
  const TableRow = () => (
    <tr className="trader-row">
      <td className="rank-cell">
        <span className={`rank-number ${rank <= 3 ? 'top-3' : ''}`}>
          #{rank}
        </span>
      </td>
      <td>
        <div className="trader-info">
          <div className="trader-avatar">
            {trader.country_name && (
              <img
                src={`https://flagcdn.com/24x18/${trader.country_name.toLowerCase()}.png`}
                alt={trader.country_name}
                title={trader.country_name}
                style={{ borderRadius: '3px', width: 24, height: 18, objectFit: 'cover' }}
              />
            )}
          </div>
          <div className="trader-details">
            <div className="trader-name">{trader.name}</div>
            { }
          </div>
        </div>
      </td>
      <td className="text-right">
        <span className="account-balance">
          ${trader.account_balance}
          {/* {formatBalance(trader.balance)} */}
        </span>
      </td>
      <td className="growth-cell text-center">
        <span className={`growth-percentage ${getGrowthClass(trader.growth_percentage)}`}>
          {formatGrowthPercentage(trader.growth_percentage)}
        </span>
      </td>
      <td className="text-center">
        <span className={`platform-tag ${getPlatformClass(trader.platform)}`}>
          {trader.platform}
        </span>
      </td>
    </tr>
  );

  // Mobile card
  const MobileCard = () => (
    <div className="trader-card">
      <div className="card-header">
        <div className="trader-info">
         <div className="trader-avatar">
            {trader.country_name && (
              <img
                src={`https://flagcdn.com/24x18/${trader.country_name.toLowerCase()}.png`}
                alt={trader.country_name}
                title={trader.country_name}
                style={{ borderRadius: '3px', width: 24, height: 18, objectFit: 'cover' }}
              />
            )}
          </div>
          <div className="trader-details">
            <div className="trader-name">{trader.name}</div>
            {/* <div className="trader-id">ID: {trader.id}</div> */}
          </div>
        </div>
        <div className={`rank-badge ${rank <= 3 ? 'top-3' : ''}`}>
          #{rank}
        </div>
      </div>
      
      <div className="card-content">
        <div className="balance-info">
          <div className="label">Account Balance</div>
          <div className="value">  ${trader.account_balance}</div>
        </div>
        <div className="growth-info">
          <div className="label">Growth</div>
          <span className={`growth-percentage ${getGrowthClass(trader.growth_percentage)}`}>
            {formatGrowthPercentage(trader.growth_percentage)}
          </span>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="platform-info">
          <div className="label">Platform</div>
          <span className={`platform-tag ${getPlatformClass(trader.platform)}`}>
            {trader.platform}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <TableRow />
      <div className="mobile-cards">
        <MobileCard />
      </div>
    </>
  );
};

export default TraderRow;