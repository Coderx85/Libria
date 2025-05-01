'use client'

import { dummyUsers as users } from '@/constant/sample'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import React from 'react'

const UserTimelineChart = () => {
  // Process data to show cumulative user growth
  const sortedUsers = [...users].sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime())
  
  const timelineData = sortedUsers.map((user, index) => ({
    date: user.createdAt!.toLocaleDateString(),
    totalUsers: index + 1,
    status: user.status
  }))

  return (
    <div className="p-6 w-full bg-gradient-to-b from-slate-950/75 to-slate-950/75 via-slate-900/75">
      <Card>
        <CardHeader>
          <CardTitle>User Growth Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timelineData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="totalUsers" 
                  stroke="var(--chart-1)" 
                  fill="var(--chart-1)" 
                  fillOpacity={0.3}
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