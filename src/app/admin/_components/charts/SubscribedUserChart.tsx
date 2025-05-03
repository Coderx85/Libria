'use client'

import { dummyUsers as users } from '@/constant/sample'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import React from 'react'
// import { User } from '@/database/schema'

const SubscribedUserChart = (
// {
  // user
// }: User[]
) => {

  // Calculate total and subscribed users
  const totalUsers = users.length
  const approvedUsers = users.filter(user => user.status === "APPROVED").length
  const pendingUsers = users.filter(user => user.status === "PENDING").length
  const rejectedUsers = users.filter(user => user.status === "REJECTED").length

  const data = [
    { name: 'Approved Users', value: approvedUsers, color: 'var(--chart-2)' },
    { name: 'Pending Users', value: pendingUsers, color: 'var(--chart-4)' },
    { name: 'Rejected Users', value: rejectedUsers, color: 'var(--chart-5)' }
  ]

  return (
    <div className="w-full h-full min-h-[300px] flex flex-row">
      <Card className="flex-1 bg-transparent">
        <CardContent>
          <div className="xl:h-[300px] xl:w-full h-52 w-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  // paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Approved Users</p>
              <p className="text-2xl font-bold">{approvedUsers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SubscribedUserChart