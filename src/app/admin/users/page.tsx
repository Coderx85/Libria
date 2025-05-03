'use client'

import React, { useState } from 'react';
import Image from 'next/image'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
// import { getUsers } from '@/actions/admin/users.action'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { User } from '@/database/schema'
import { IconType } from 'react-icons'
import { dummyUsers } from '@/constant/sample'
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/admin/StatCard';
import { FaUser } from 'react-icons/fa';
import SubscribedUserChart from '../_components/charts/SubscribedUserChart';
import UserTimelineChart from '../_components/charts/UserTimelineChart';

const tableAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const rowAnimations = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 }
}

const HeaderProps = ({ Icon, name }: { Icon: IconType, name: string }) => {
  return (
    <TableHead className="">
      <div className='flex gap-2 items-center'>
        <Icon className='size-5'/>{name}
      </div>
    </TableHead>  
  )
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="container mx-auto max-w-[1600px] min-h-screen">
      <motion.section 
        className="flex flex-col gap-4 lg:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header Section */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gray-800/50 shadow-lg"
            >
              <Image
                src="/icons/admin/users.svg"
                alt="Users"
                width={24}
                height={24}
                className="invert"
              />
            </motion.div>
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-100">User Management</h1>
              <p className="text-sm text-gray-400">Manage and monitor user accounts</p>
            </div>
          </div>
          
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[350px] lg:w-[400px] p-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Stats Cards - Mobile Scrollable, Desktop Fixed */}
          <div className="lg:col-span-3 overflow-auto lg:overflow-visible">
            <div className="flex lg:flex-col gap-4 lg:gap-6 lg:sticky lg:top-6">
              {/* Make cards scroll horizontally on mobile */}
              <div className="min-w-[250px] sm:min-w-0">
                <StatCard
                  title="Total Users"
                  value={dummyUsers.length}
                  icon={FaUser}
                  description="+5% from last week"
                  variant="total"
                  size="md"
                />
              </div>
              <div className="min-w-[250px] sm:min-w-0">
                <StatCard
                  title="Active Users"
                  value={Math.floor(dummyUsers.length * 0.8)}
                  icon={FaUser}
                  description="80% of total users"
                  variant="active"
                  size="md"
                />
              </div>
              <div className="min-w-[250px] sm:min-w-0">
                <StatCard
                  title="Pending Users"
                  value={Math.floor(dummyUsers.length * 0.2)}
                  icon={FaUser}
                  description="Awaiting approval"
                  variant="dues"
                  size="md"
                />
              </div>
            </div>
          </div>
          
          {/* Charts and Table Section */}
          <div className="lg:col-span-9 space-y-4 lg:space-y-6">
            {/* Charts Grid */}
            <div className="hidden xl:grid xl:grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 lg:p-5">
                <h3 className="text-base lg:text-lg font-semibold text-gray-200 mb-4">User Subscription Trends</h3>
                <SubscribedUserChart />
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 lg:p-5">
                <h3 className="text-base lg:text-lg font-semibold text-gray-200 mb-4">User Activity Timeline</h3>
                <UserTimelineChart />
              </div>
            </div>

          </div>
        </div>
        {/* Users Table */}
        <AnimatePresence>
          <motion.div
            variants={tableAnimations}
            initial="initial"
            animate="animate"
            exit="exit"
            className="rounded-lg border border-gray-700 overflow-hidden bg-gray-900/50 backdrop-blur-sm"
          >
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="text-gray-400 whitespace-nowrap">Avatar</TableHead>
                    <TableHead className="text-gray-400 whitespace-nowrap">Full Name</TableHead>
                    <TableHead className="text-gray-400 whitespace-nowrap">Email</TableHead>
                    <TableHead className="text-gray-400 whitespace-nowrap">University ID</TableHead>
                    <TableHead className="text-gray-400 whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-gray-400 whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyUsers.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      variants={rowAnimations}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-800 hover:bg-gray-800/50"
                    >
                      <TableCell className="w-[60px]">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-lg"
                        >
                          <Image
                            src="/icons/admin/user.svg"
                            alt="User Avatar"
                            width={20}
                            height={20}
                            className="invert opacity-70"
                          />
                        </motion.div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-200 min-w-[120px]">{user.fullName}</TableCell>
                      <TableCell className="text-gray-300 min-w-[180px]">{user.email}</TableCell>
                      <TableCell className="text-gray-300 min-w-[120px]">{user.universityId}</TableCell>
                      <TableCell className="min-w-[100px]">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex px-3 py-1 text-xs rounded-full bg-gray-800 text-emerald-400 border border-emerald-500/20"
                        >
                          Active
                        </motion.span>
                      </TableCell>
                      <TableCell className="min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  className="bg-gray-800 hover:bg-gray-700 text-gray-200"
                                >
                                  <motion.div
                                    whileHover={{ rotate: 15 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Image
                                      src="/icons/admin/edit.svg"
                                      alt="Edit"
                                      width={16}
                                      height={16}
                                      className="mr-1.5 invert opacity-70"
                                    />
                                  </motion.div>
                                  <span className="hidden sm:inline">Edit</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-gray-200">
                                <p>Edit user details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Image
                                      src="/icons/admin/trash.svg"
                                      alt="Delete"
                                      width={16}
                                      height={16}
                                      className="mr-1.5"
                                    />
                                  </motion.div>
                                  <span className="hidden sm:inline">Delete</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-gray-200">
                                <p>Delete user account</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>
    </div>
  )
}

export default UsersPage

const ActiveChartSubs = ({
  totalUser
}: {
  totalUser: User[]
}) => {
  const activeUsers: User[] = totalUser.filter((user) => {user.status === "APPROVED"})
  const totalActiveUser: number = activeUsers.length


  return (
    <div>
      
    </div>
  )
}

// const UserTable = ({ user }: { user: User }) => {
//   return (
    
//   )
// }

/*
const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

*/