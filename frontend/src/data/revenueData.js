// Mock revenue data for admin dashboard
export const revenueData = {
  // Overview metrics
  totalRevenue: 2850000, // LKR 2.85M
  monthlyGrowth: 15.3,
  yearlyGrowth: 45.7,
  
  // Revenue by source
  therapistRegistrations: {
    total: 450000, // LKR 450K
    count: 18,
    avgPerRegistration: 25000,
    growth: 22.5,
    monthlyBreakdown: [
      { month: 'Jan', amount: 75000, count: 3 },
      { month: 'Feb', amount: 50000, count: 2 },
      { month: 'Mar', amount: 75000, count: 3 },
      { month: 'Apr', amount: 100000, count: 4 },
      { month: 'May', amount: 75000, count: 3 },
      { month: 'Jun', amount: 75000, count: 3 }
    ]
  },
  
  sessionBookings: {
    total: 1200000, // LKR 1.2M
    count: 240,
    avgPerSession: 5000,
    growth: 18.7,
    monthlyBreakdown: [
      { month: 'Jan', amount: 180000, count: 36 },
      { month: 'Feb', amount: 190000, count: 38 },
      { month: 'Mar', amount: 195000, count: 39 },
      { month: 'Apr', amount: 200000, count: 40 },
      { month: 'May', amount: 210000, count: 42 },
      { month: 'Jun', amount: 225000, count: 45 }
    ],
    topTherapists: [
      { name: 'Dr. Shanika Madumali', revenue: 125000, sessions: 25 },
      { name: 'Dr. Umali Silva', revenue: 110000, sessions: 22 },
      { name: 'Dr. Pooja Jayanetti', revenue: 95000, sessions: 19 },
      { name: 'Dr. Randuni Silva', revenue: 85000, sessions: 17 }
    ]
  },
  
  proGamingFeatures: {
    total: 350000, // LKR 350K
    count: 140,
    avgPerUser: 2500,
    growth: 12.4,
    monthlyBreakdown: [
      { month: 'Jan', amount: 50000, count: 20 },
      { month: 'Feb', amount: 55000, count: 22 },
      { month: 'Mar', amount: 57500, count: 23 },
      { month: 'Apr', amount: 60000, count: 24 },
      { month: 'May', amount: 62500, count: 25 },
      { month: 'Jun', amount: 65000, count: 26 }
    ],
    features: [
      { name: 'Advanced Speech Analytics', users: 45, revenue: 112500 },
      { name: 'Premium Game Modes', users: 38, revenue: 95000 },
      { name: 'AI Coaching Assistant', users: 32, revenue: 80000 },
      { name: 'Progress Insights Pro', users: 25, revenue: 62500 }
    ]
  },
  
  enterprisePackages: {
    total: 850000, // LKR 850K
    count: 3,
    avgPerPackage: 283333,
    growth: 45.2,
    monthlyBreakdown: [
      { month: 'Jan', amount: 0, count: 0 },
      { month: 'Feb', amount: 250000, count: 1 },
      { month: 'Mar', amount: 300000, count: 1 },
      { month: 'Apr', amount: 0, count: 0 },
      { month: 'May', amount: 300000, count: 1 },
      { month: 'Jun', amount: 0, count: 0 }
    ],
    clients: [
      { 
        name: 'Colombo International School', 
        revenue: 350000, 
        students: 45, 
        package: '12-month Premium',
        startDate: '2024-02-01'
      },
      { 
        name: 'Hope Special Needs Center', 
        revenue: 300000, 
        students: 35, 
        package: '6-month Standard',
        startDate: '2024-03-15'
      },
      { 
        name: 'Kandy Rehabilitation Center', 
        revenue: 200000, 
        students: 25, 
        package: '12-month Basic',
        startDate: '2024-05-01'
      }
    ]
  },

  // Monthly data for charts
  monthlyData: [
    { 
      month: 'Jan', 
      therapists: 75000, 
      sessions: 180000, 
      gaming: 50000, 
      enterprise: 0,
      total: 305000
    },
    { 
      month: 'Feb', 
      therapists: 50000, 
      sessions: 190000, 
      gaming: 55000, 
      enterprise: 250000,
      total: 545000
    },
    { 
      month: 'Mar', 
      therapists: 75000, 
      sessions: 195000, 
      gaming: 57500, 
      enterprise: 300000,
      total: 627500
    },
    { 
      month: 'Apr', 
      therapists: 100000, 
      sessions: 200000, 
      gaming: 60000, 
      enterprise: 0,
      total: 360000
    },
    { 
      month: 'May', 
      therapists: 75000, 
      sessions: 210000, 
      gaming: 62500, 
      enterprise: 300000,
      total: 647500
    },
    { 
      month: 'Jun', 
      therapists: 75000, 
      sessions: 225000, 
      gaming: 65000, 
      enterprise: 0,
      total: 365000
    }
  ],

  // Top performing categories
  topCategories: [
    { 
      name: 'Session Bookings', 
      revenue: 1200000, 
      percentage: 42.1, 
      color: 'blue',
      count: 240,
      avgTransaction: 5000
    },
    { 
      name: 'Enterprise Packages', 
      revenue: 850000, 
      percentage: 29.8, 
      color: 'purple',
      count: 3,
      avgTransaction: 283333
    },
    { 
      name: 'Therapist Registrations', 
      revenue: 450000, 
      percentage: 15.8, 
      color: 'green',
      count: 18,
      avgTransaction: 25000
    },
    { 
      name: 'Pro Gaming Features', 
      revenue: 350000, 
      percentage: 12.3, 
      color: 'orange',
      count: 140,
      avgTransaction: 2500
    }
  ],

  // Projections
  projections: {
    nextMonth: {
      therapists: 100000,
      sessions: 240000,
      gaming: 70000,
      enterprise: 400000,
      total: 810000
    },
    nextQuarter: {
      therapists: 300000,
      sessions: 720000,
      gaming: 210000,
      enterprise: 1200000,
      total: 2430000
    }
  },

  // Key metrics
  metrics: {
    averageRevenuePerUser: 3500,
    customerLifetimeValue: 45000,
    monthlyRecurringRevenue: 285000,
    churnRate: 2.3,
    conversionRate: 12.5
  }
};

// Helper functions
export const formatCurrency = (amount) => {
  if (amount >= 1000000) {
    return `LKR ${(amount / 1000000).toFixed(2)}M`;
  }
  return `LKR ${(amount / 1000).toFixed(0)}K`;
};

export const getGrowthColor = (growth) => {
  return growth > 0 ? 'text-green-600' : 'text-red-600';
};

export const getGrowthIcon = (growth) => {
  return growth > 0 ? '↗' : '↘';
};
