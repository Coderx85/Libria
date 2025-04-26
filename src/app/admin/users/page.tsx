'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { getUsers } from '@/actions/admin/users.action'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { User } from '@/database/schema'

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

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  return (
    <motion.section 
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="flex items-center justify-between"
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
          <h1 className="text-2xl font-semibold text-gray-100">Users Management</h1>
        </div>
        
        <Button 
          variant="secondary"
          size="lg"
          className="group bg-gray-800 hover:bg-gray-700 text-gray-100"
        >
          <Image
            src="/icons/admin/user.svg"
            alt="Add User"
            width={18}
            height={18}
            className="mr-2 invert transition-transform group-hover:scale-110"
          />
          Add New User
        </Button>
      </motion.div>

      <AnimatePresence>
        <motion.div
          variants={tableAnimations}
          initial="initial"
          animate="animate"
          exit="exit"
          className="rounded-lg border border-gray-700 overflow-hidden bg-gray-900/50 backdrop-blur-sm"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-gray-800/50">
                <TableHead className="text-gray-400">Avatar</TableHead>
                <TableHead className="text-gray-400">Full Name</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">University ID</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  variants={rowAnimations}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-800 hover:bg-gray-800/50"
                >
                  <TableCell>
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
                  <TableCell className="font-medium text-gray-200">{user.fullName}</TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell className="text-gray-300">{user.universityId}</TableCell>
                  <TableCell>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 text-xs rounded-full bg-gray-800 text-emerald-400 border border-emerald-500/20"
                    >
                      Active
                    </motion.span>
                  </TableCell>
                  <TableCell>
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
                              Edit
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
                              Delete
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
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}

export default UsersPage