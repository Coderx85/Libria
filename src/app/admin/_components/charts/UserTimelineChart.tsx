"use client"

import { dummyUsers as users } from '@/constant/sample'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import React from 'react'

const UserTimelineChart = () => {
  // Process data to show cumulative user growth
  const sortedUsers = [...users]
    .filter(user => user.createdAt !== null)
    .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))

  const timelineData = sortedUsers.map((user, index) => ({
    date: user.createdAt?.toLocaleDateString() || 'Unknown Date',
    totalUsers: index + 1,
    status: user.status
  }))

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col">
      <Card className="flex-1 bg-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-base lg:text-lg font-semibold">User Growth Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timelineData}
                margin={{ 
                  top: 10, 
                  right: 10, 
                  left: 0, 
                  bottom: 0 
                }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis 
                  dataKey="date"
                  tick={{ fill: 'rgb(156, 163, 175)' }}
                  tickLine={{ stroke: 'rgb(75, 85, 99)' }}
                  axisLine={{ stroke: 'rgb(75, 85, 99)' }}
                  tickFormatter={(value) => {
                    if (value === 'Unknown Date') return value;
                    const date = new Date(value);
                    return new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric'
                    }).format(date);
                  }}
                />
                <YAxis
                  tick={{ fill: 'rgb(156, 163, 175)' }}
                  tickLine={{ stroke: 'rgb(75, 85, 99)' }}
                  axisLine={{ stroke: 'rgb(75, 85, 99)' }}
                  tickCount={5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    borderColor: 'rgb(55, 65, 81)',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                  itemStyle={{ color: 'rgb(229, 231, 235)' }}
                  labelStyle={{ color: 'rgb(156, 163, 175)' }}
                  formatter={(value) => [`${value} Users`, 'Total Users']}
                />
                <Area
                  type="monotone"
                  dataKey="totalUsers"
                  stroke="var(--chart-1)"
                  fill="url(#colorUsers)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserTimelineChart