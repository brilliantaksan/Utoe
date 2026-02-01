import React from 'react';
import Icon from 'components/AppIcon';

const SourceAttribution = () => {
  const sources = [
    {
      id: 1,
      name: 'LinkedIn',
      percent: 42,
      count: 128,
      trend: 'up',
      change: 12,
      color: 'primary',
    },
    {
      id: 2,
      name: 'Company Careers',
      percent: 24,
      count: 73,
      trend: 'up',
      change: 6,
      color: 'success',
    },
    {
      id: 3,
      name: 'Indeed',
      percent: 18,
      count: 55,
      trend: 'down',
      change: -3,
      color: 'warning',
    },
    {
      id: 4,
      name: 'Referral',
      percent: 10,
      count: 31,
      trend: 'up',
      change: 4,
      color: 'accent',
    },
    {
      id: 5,
      name: 'Other',
      percent: 6,
      count: 19,
      trend: 'down',
      change: -2,
      color: 'secondary',
    },
  ];

  const getBarColor = (color) => {
    const colors = {
      primary: 'bg-primary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      accent: 'bg-accent-500',
      secondary: 'bg-secondary-500',
    };
    return colors[color] || 'bg-secondary-500';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-text-primary">Source Attribution</h3>
          <p className="text-sm text-text-secondary mt-1">Applicants by acquisition channel</p>
        </div>
        <button className="text-text-secondary hover:text-text-primary transition-smooth">
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-text-primary">{source.name}</span>
                <span className="text-xs text-text-secondary">{source.count} applicants</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-primary">{source.percent}%</span>
                <span className={`text-xs flex items-center ${getTrendColor(source.trend)}`}>
                  <Icon name={getTrendIcon(source.trend)} size={12} className="mr-1" />
                  {Math.abs(source.change)}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(source.color)}`}
                style={{ width: `${source.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-text-secondary">Last 30 days</span>
        <button className="text-sm text-primary hover:text-primary-700 transition-smooth flex items-center">
          <span>View details</span>
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default SourceAttribution;
