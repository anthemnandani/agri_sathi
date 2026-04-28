"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Wrench,
  MessageSquare,
  FileText,
  MapPin,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  Target,
  Zap
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Dummy analytics data
const overviewMetrics = {
  totalUsers: { value: 12847, change: 12.5, trend: "up" },
  activeUsers: { value: 8234, change: 8.3, trend: "up" },
  totalRevenue: { value: 2845000, change: 23.1, trend: "up" },
  avgSessionTime: { value: "12m 34s", change: -2.4, trend: "down" }
}

const userGrowthData = [
  { month: "Jan", users: 8500 },
  { month: "Feb", users: 9200 },
  { month: "Mar", users: 9800 },
  { month: "Apr", users: 10500 },
  { month: "May", users: 11200 },
  { month: "Jun", users: 12847 }
]

const categoryPerformance = [
  { name: "Vegetables", products: 2340, sales: 45000, growth: 15.2 },
  { name: "Grains", products: 1890, sales: 38000, growth: 12.8 },
  { name: "Fruits", products: 1560, sales: 32000, growth: 18.4 },
  { name: "Dairy", products: 890, sales: 25000, growth: 8.6 },
  { name: "Spices", products: 670, sales: 18000, growth: 22.1 }
]

const topRegions = [
  { name: "Maharashtra", farmers: 3245, percentage: 25 },
  { name: "Uttar Pradesh", farmers: 2890, percentage: 22 },
  { name: "Punjab", farmers: 2340, percentage: 18 },
  { name: "Gujarat", farmers: 1890, percentage: 15 },
  { name: "Madhya Pradesh", farmers: 1560, percentage: 12 },
  { name: "Others", farmers: 922, percentage: 8 }
]

const engagementMetrics = {
  pageViews: { value: 485000, change: 18.2 },
  bounceRate: { value: "32.4%", change: -5.2 },
  avgPages: { value: 4.8, change: 12.3 },
  returnRate: { value: "67.8%", change: 8.9 }
}

const featureUsage = [
  { feature: "Marketplace", usage: 89, users: 11450 },
  { feature: "Weather Updates", usage: 76, users: 9780 },
  { feature: "Communities", usage: 68, users: 8740 },
  { feature: "Rental Tools", usage: 54, users: 6940 },
  { feature: "Government Schemes", usage: 48, users: 6170 },
  { feature: "Expert Talk", usage: 42, users: 5400 }
]

const recentActivity = [
  { type: "signup", message: "245 new farmers registered", time: "Today" },
  { type: "transaction", message: "₹1.2L in marketplace transactions", time: "Today" },
  { type: "rental", message: "89 new tool bookings", time: "Yesterday" },
  { type: "community", message: "12 new communities created", time: "This week" },
  { type: "post", message: "1,234 posts published", time: "This week" }
]

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`
    }
    return `₹${value.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights and platform metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Farmers</p>
                <p className="text-3xl font-bold mt-1">{overviewMetrics.totalUsers.value.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-emerald-600">+{overviewMetrics.totalUsers.change}%</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold mt-1">{overviewMetrics.activeUsers.value.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-600">+{overviewMetrics.activeUsers.change}%</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(overviewMetrics.totalRevenue.value)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-amber-600">+{overviewMetrics.totalRevenue.change}%</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session Time</p>
                <p className="text-3xl font-bold mt-1">{overviewMetrics.avgSessionTime.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{overviewMetrics.avgSessionTime.change}%</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">User Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Engagement</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Features</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* User Growth Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  User Growth Trend
                </CardTitle>
                <CardDescription>Monthly farmer registration growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end gap-4 pt-8">
                  {userGrowthData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600"
                        style={{ height: `${(data.users / 15000) * 250}px` }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                      <span className="text-xs font-medium">{(data.users / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === "signup" ? "bg-emerald-100 dark:bg-emerald-900/50" :
                      activity.type === "transaction" ? "bg-amber-100 dark:bg-amber-900/50" :
                      activity.type === "rental" ? "bg-blue-100 dark:bg-blue-900/50" :
                      "bg-purple-100 dark:bg-purple-900/50"
                    }`}>
                      {activity.type === "signup" && <Users className="h-4 w-4 text-emerald-600" />}
                      {activity.type === "transaction" && <ShoppingCart className="h-4 w-4 text-amber-600" />}
                      {activity.type === "rental" && <Wrench className="h-4 w-4 text-blue-600" />}
                      {activity.type === "community" && <MessageSquare className="h-4 w-4 text-purple-600" />}
                      {activity.type === "post" && <FileText className="h-4 w-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
                Category Performance
              </CardTitle>
              <CardDescription>Product categories by sales and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-28 font-medium">{category.name}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{category.products} products</span>
                        <span className="text-sm font-medium">{formatCurrency(category.sales)}</span>
                      </div>
                      <Progress value={(category.sales / 50000) * 100} className="h-2" />
                    </div>
                    <Badge variant="outline" className={category.growth > 15 ? "text-emerald-600 border-emerald-200" : "text-blue-600 border-blue-200"}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{category.growth}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Analytics Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Regional Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  Regional Distribution
                </CardTitle>
                <CardDescription>Farmers by state</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topRegions.map((region, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 font-medium text-sm">{region.name}</div>
                    <div className="flex-1">
                      <Progress value={region.percentage} className="h-3" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{region.farmers.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{region.percentage}%</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User Demographics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  User Demographics
                </CardTitle>
                <CardDescription>Breakdown by user type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-center">
                    <p className="text-3xl font-bold text-emerald-600">78%</p>
                    <p className="text-sm text-muted-foreground mt-1">Small Farmers</p>
                    <p className="text-xs text-emerald-600 mt-1">10,020 users</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-center">
                    <p className="text-3xl font-bold text-blue-600">15%</p>
                    <p className="text-sm text-muted-foreground mt-1">Medium Farmers</p>
                    <p className="text-xs text-blue-600 mt-1">1,927 users</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-center">
                    <p className="text-3xl font-bold text-amber-600">5%</p>
                    <p className="text-sm text-muted-foreground mt-1">Large Farmers</p>
                    <p className="text-xs text-amber-600 mt-1">642 users</p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-center">
                    <p className="text-3xl font-bold text-purple-600">2%</p>
                    <p className="text-sm text-muted-foreground mt-1">Agri-Business</p>
                    <p className="text-xs text-purple-600 mt-1">258 users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Activity Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                Peak Activity Hours
              </CardTitle>
              <CardDescription>When farmers are most active on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 24 }).map((_, hour) => {
                  const intensity = hour >= 6 && hour <= 9 ? 90 : 
                                   hour >= 17 && hour <= 20 ? 85 :
                                   hour >= 10 && hour <= 16 ? 50 :
                                   hour >= 21 && hour <= 23 ? 30 : 10
                  return (
                    <div key={hour} className="text-center">
                      <div 
                        className="h-20 rounded transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: `rgba(16, 185, 129, ${intensity / 100})`,
                        }}
                      ></div>
                      <p className="text-xs text-muted-foreground mt-1">{hour}:00</p>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-emerald-200"></div>
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-emerald-400"></div>
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-emerald-600"></div>
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold">{(engagementMetrics.pageViews.value / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-emerald-600">+{engagementMetrics.pageViews.change}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">{engagementMetrics.bounceRate.value}</p>
                    <p className="text-xs text-emerald-600">{engagementMetrics.bounceRate.change}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Pages/Session</p>
                    <p className="text-2xl font-bold">{engagementMetrics.avgPages.value}</p>
                    <p className="text-xs text-emerald-600">+{engagementMetrics.avgPages.change}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Return Rate</p>
                    <p className="text-2xl font-bold">{engagementMetrics.returnRate.value}</p>
                    <p className="text-xs text-emerald-600">+{engagementMetrics.returnRate.change}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
                Content Engagement
              </CardTitle>
              <CardDescription>User interaction with different content types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-medium">Posts</p>
                    <Badge className="bg-emerald-100 text-emerald-700">+24%</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Posts</span>
                      <span className="font-medium">8,456</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Likes</span>
                      <span className="font-medium">124K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Comments</span>
                      <span className="font-medium">45K</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-medium">Communities</p>
                    <Badge className="bg-blue-100 text-blue-700">+18%</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Communities</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Messages</span>
                      <span className="font-medium">89K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium">8.7K</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-medium">Marketplace</p>
                    <Badge className="bg-amber-100 text-amber-700">+32%</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Listings</span>
                      <span className="font-medium">12,340</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Inquiries</span>
                      <span className="font-medium">34K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Transactions</span>
                      <span className="font-medium">5.6K</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-600" />
                Feature Usage
              </CardTitle>
              <CardDescription>How farmers use different platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {featureUsage.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{feature.feature}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{feature.users.toLocaleString()} users</span>
                      <span className="text-sm font-medium w-12 text-right">{feature.usage}%</span>
                    </div>
                  </div>
                  <Progress value={feature.usage} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feature Comparison */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featureUsage.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{feature.feature}</p>
                      <p className="text-sm text-muted-foreground">{feature.users.toLocaleString()} active users</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">{feature.usage}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features Needing Attention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featureUsage.slice(-3).reverse().map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30">
                    <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{feature.feature}</p>
                      <p className="text-sm text-muted-foreground">Only {feature.users.toLocaleString()} users</p>
                    </div>
                    <Badge variant="outline" className="text-amber-600 border-amber-200">{feature.usage}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
