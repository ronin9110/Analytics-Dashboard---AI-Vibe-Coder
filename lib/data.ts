// lib/data.ts

export const metrics = [
  { title: 'Revenue', value: '$82,400', growth: '+14.2%' },
  { title: 'Users', value: '8,420', growth: '+3.8%' },
  { title: 'Conversions', value: '1,240', growth: '+9.1%' },
  { title: 'Growth', value: '12.4%', growth: '+1.2%' },
];

export const lineChartData = [
  { month: 'Jan', revenue: 24000 },
  { month: 'Feb', revenue: 28000 },
  { month: 'Mar', revenue: 32000 },
  { month: 'Apr', revenue: 37000 },
  { month: 'May', revenue: 42000 },
  { month: 'Jun', revenue: 46000 },
];

export const barChartData = [
  { channel: 'Email', conversions: 320 },
  { channel: 'Social', conversions: 520 },
  { channel: 'SEO', conversions: 260 },
  { channel: 'Ads', conversions: 740 },
];

export const donutChartData = [
  { source: 'Google', value: 400 },
  { source: 'Facebook', value: 300 },
  { source: 'Twitter', value: 150 },
  { source: 'LinkedIn', value: 150 },
];

export const tableData = [
  { id: 1, campaign: 'Summer Promo', users: 4200, revenue: 24000 },
  { id: 2, campaign: 'Black Friday', users: 1800, revenue: 18500 },
  { id: 3, campaign: 'Holiday Boost', users: 3200, revenue: 27800 },
  { id: 4, campaign: 'New Year Kickoff', users: 1100, revenue: 12900 },
];
