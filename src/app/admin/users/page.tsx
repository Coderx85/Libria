import React from 'react'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { User } from '@/types/user'

const Users = async () => {
  const users: User[] = await getUsers()
  return (
    <section className="flex flex-col gap-4 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>University ID Number</TableHead>
            <TableHead>University ID Card</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.universityId}</TableCell>
                <TableCell>{user.universityCard}</TableCell>
                <TableCell>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHeader>
      </Table>
    </section>
  )
}

export default Users