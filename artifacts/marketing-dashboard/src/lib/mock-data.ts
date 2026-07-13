// Mock Data for Klaviyo-style Marketing Dashboard

// 1. Customers Generator
export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  totalOrders: number;
  totalSpend: number;
  lastPurchase: string;
  status: 'active' | 'inactive' | 'churned';
  tags: string[];
}

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Brazil'];
const baseTags = ['VIP', 'Wholesale', 'Early Adopter', 'Holiday Shopper', 'Reviewer', 'Refund Requested', 'Loyalty Tier 1', 'Loyalty Tier 2', 'B2B'];

export function generateCustomers(count: number): Customer[] {
  const customers: Customer[] = [];
  // Use a pseudo-random seed approach so it's deterministic
  for (let i = 0; i < count; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const country = countries[(i * 7) % countries.length];
    const spend = ((i * 137) % 5000) + 20;
    const orders = Math.max(1, Math.floor(spend / 80));
    
    let status: 'active' | 'inactive' | 'churned' = 'active';
    if (i % 5 === 0) status = 'inactive';
    if (i % 11 === 0) status = 'churned';

    const numTags = (i % 3) + 1;
    const tags = [];
    for(let t=0; t<numTags; t++) {
      tags.push(baseTags[(i + t) % baseTags.length]);
    }
    
    // Distribute dates over last 365 days
    const dateOffset = (i * 23) % 365;
    const lastPurchase = new Date(Date.now() - dateOffset * 24 * 60 * 60 * 1000).toISOString();
    
    customers.push({
      id: `CUST-${10000 + i}`,
      avatar: `${fn.charAt(0)}${ln.charAt(0)}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`,
      phone: `+1 555 ${String(100 + (i%900)).padStart(3, '0')} ${String(1000 + (i%9000)).padStart(4, '0')}`,
      country,
      totalOrders: orders,
      totalSpend: spend,
      lastPurchase,
      status,
      tags
    });
  }
  return customers;
}

export const mockCustomers = generateCustomers(5000);

// 2. Campaigns
export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'Push Notification';
  audience: string;
  status: 'Draft' | 'Scheduled' | 'Sending' | 'Completed';
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  revenue: number;
  sentAt?: string;
  scheduledAt?: string;
}

export const mockCampaigns: Campaign[] = [
  { id: 'CAMP-001', name: 'Black Friday Early Access', type: 'Email', audience: 'VIP Customers', status: 'Completed', deliveryRate: 99.2, openRate: 48.5, clickRate: 12.4, revenue: 124500, sentAt: '2023-11-20T10:00:00Z' },
  { id: 'CAMP-002', name: 'Welcome Series - Email 1', type: 'Email', audience: 'New Subscribers', status: 'Sending', deliveryRate: 100, openRate: 62.1, clickRate: 18.5, revenue: 4500 },
  { id: 'CAMP-003', name: 'Winter Collection Launch', type: 'Email', audience: 'All Customers', status: 'Scheduled', deliveryRate: 0, openRate: 0, clickRate: 0, revenue: 0, scheduledAt: '2023-12-01T14:00:00Z' },
  { id: 'CAMP-004', name: 'Abandoned Cart Reminder', type: 'Push Notification', audience: 'Cart Abandoners (24h)', status: 'Draft', deliveryRate: 0, openRate: 0, clickRate: 0, revenue: 0 },
  { id: 'CAMP-005', name: 'Holiday Gift Guide', type: 'Email', audience: 'Active Last 90 Days', status: 'Completed', deliveryRate: 98.5, openRate: 35.2, clickRate: 8.9, revenue: 56200, sentAt: '2023-12-05T09:00:00Z' },
  { id: 'CAMP-006', name: 'Flash Sale - 24 Hours Only', type: 'Email', audience: 'VIP Customers', status: 'Completed', deliveryRate: 99.8, openRate: 52.4, clickRate: 15.2, revenue: 89000, sentAt: '2023-10-15T08:00:00Z' },
  { id: 'CAMP-007', name: 'Re-engagement Campaign', type: 'Email', audience: 'Dormant', status: 'Completed', deliveryRate: 95.1, openRate: 18.4, clickRate: 2.1, revenue: 3200, sentAt: '2023-09-10T11:00:00Z' },
  { id: 'CAMP-008', name: 'New Year Promotion', type: 'Email', audience: 'All Customers', status: 'Scheduled', deliveryRate: 0, openRate: 0, clickRate: 0, revenue: 0, scheduledAt: '2024-01-01T10:00:00Z' },
  { id: 'CAMP-009', name: 'Spring Lookbook', type: 'Email', audience: 'High LTV', status: 'Draft', deliveryRate: 0, openRate: 0, clickRate: 0, revenue: 0 },
  { id: 'CAMP-010', name: 'App Exclusive Offer', type: 'Push Notification', audience: 'App Users', status: 'Completed', deliveryRate: 99.9, openRate: 75.2, clickRate: 22.4, revenue: 15400, sentAt: '2023-11-28T16:00:00Z' },
];

// 3. Analytics & Charts Time Series
export const revenueTrend = [
  { name: 'Jan', revenue: 45000, orders: 450 },
  { name: 'Feb', revenue: 52000, orders: 520 },
  { name: 'Mar', revenue: 48000, orders: 480 },
  { name: 'Apr', revenue: 61000, orders: 610 },
  { name: 'May', revenue: 59000, orders: 590 },
  { name: 'Jun', revenue: 67000, orders: 670 },
  { name: 'Jul', revenue: 72000, orders: 720 },
  { name: 'Aug', revenue: 71000, orders: 710 },
  { name: 'Sep', revenue: 85000, orders: 850 },
  { name: 'Oct', revenue: 94000, orders: 940 },
  { name: 'Nov', revenue: 145000, orders: 1450 },
  { name: 'Dec', revenue: 182000, orders: 1820 },
];

export const emailPerformance = [
  { name: 'Week 1', sent: 120000, opened: 45000, clicked: 12000 },
  { name: 'Week 2', sent: 150000, opened: 52000, clicked: 14000 },
  { name: 'Week 3', sent: 180000, opened: 68000, clicked: 19000 },
  { name: 'Week 4', sent: 220000, opened: 89000, clicked: 25000 },
];

export const geographicAudience = [
  { name: 'United States', value: 45 },
  { name: 'United Kingdom', value: 20 },
  { name: 'Canada', value: 12 },
  { name: 'Australia', value: 8 },
  { name: 'Germany', value: 5 },
  { name: 'Other', value: 10 },
];

export const deviceDistribution = [
  { name: 'Mobile', value: 65 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 5 },
];

// 4. Activity Feed
export const mockActivity = [
  { id: 1, type: 'campaign', title: 'Campaign Sent', desc: 'Black Friday Early Access sent to 45k users', time: '10m ago' },
  { id: 2, type: 'customer', title: 'New VIP Customer', desc: 'Sarah Jenkins crossed $1,000 LTV', time: '1h ago' },
  { id: 3, type: 'automation', title: 'Automation Triggered', desc: 'Abandoned Cart flow triggered 140 times today', time: '3h ago' },
  { id: 4, type: 'sync', title: 'Shopify Sync Completed', desc: '1,240 orders synced successfully', time: '5h ago' },
  { id: 5, type: 'campaign', title: 'Campaign Draft Created', desc: 'Winter Collection Launch prepared', time: '1d ago' },
];

// 5. Segments
export const mockSegments = [
  { id: 'SEG-1', name: 'VIP Customers', description: 'Customers with LTV > $1000', count: 1240, lastUpdated: '2h ago' },
  { id: 'SEG-2', name: 'At Risk', description: 'No purchase in 90+ days but historically active', count: 3450, lastUpdated: '5h ago' },
  { id: 'SEG-3', name: 'New This Month', description: 'First purchase in the last 30 days', count: 890, lastUpdated: '1d ago' },
  { id: 'SEG-4', name: 'High LTV', description: 'Top 10% of customers by revenue', count: 500, lastUpdated: '2d ago' },
  { id: 'SEG-5', name: 'Dormant', description: 'No activity in 180+ days', count: 8900, lastUpdated: '1w ago' },
  { id: 'SEG-6', name: 'European Customers', description: 'Located in EU countries', count: 2100, lastUpdated: '1d ago' },
];

// 6. Integrations
export const mockIntegrations = [
  { id: 'INT-1', name: 'Shopify', description: 'Sync products, customers, and orders.', connected: true, lastSync: '10 mins ago', icon: 'SiShopify' },
  { id: 'INT-2', name: 'WooCommerce', description: 'Connect your WordPress store data.', connected: false, lastSync: '', icon: 'SiWoocommerce' },
  { id: 'INT-3', name: 'Stripe', description: 'Sync subscription and payment data.', connected: true, lastSync: '1 hour ago', icon: 'SiStripe' },
  { id: 'INT-4', name: 'Slack', description: 'Send notifications to your team.', connected: true, lastSync: 'Real-time', icon: 'SiSlack' },
  { id: 'INT-5', name: 'Google Analytics', description: 'Track campaign conversion metrics.', connected: false, lastSync: '', icon: 'SiGoogleanalytics' },
  { id: 'INT-6', name: 'Zapier', description: 'Connect with thousands of other apps.', connected: true, lastSync: 'Active', icon: 'SiZapier' },
];
