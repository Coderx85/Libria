'use client'

import { dummyUsers as users } from '@/constant/sample'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import React from 'react'

const UserRoleChart = () => {
  const adminUsers = users.filter(user => user.isAdmin).length
  const regularUsers = users.filter(user => !user.isAdmin).length

  const data = [
    { name: 'Admin Users', value: adminUsers, color: 'var(--chart-4)' },
    { name: 'Regular Users', value: regularUsers, color: 'var(--chart-5)' }
  ]

  return (
    <div className="p-6 w-[500px] bg-gradient-to-b from-slate-950/75 to-slate-950/75 via-slate-900/75">
      <Card>
        <CardHeader>
          <CardTitle>User Role Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
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
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Admin Users</p>
              <p className="text-2xl font-bold">{adminUsers}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Regular Users</p>
              <p className="text-2xl font-bold">{regularUsers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserRoleChart