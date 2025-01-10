import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"

interface Invoice {
  username: string
  name: string
  numberOfWorks: number
  condition: string
  price: number
  paid: number
}

interface InvoiceTableProps {
  userId: string
  role: string
  invoices: Invoice[]
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ userId, role, invoices }) => {
  const [storedInvoices, setStoredInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    if (role === "Manager") {
      // If the user is a manager, get all invoices from all users
      const allInvoices = Object.keys(localStorage)
        .filter(key => key.startsWith('invoices_'))
        .flatMap(key => JSON.parse(localStorage.getItem(key) || '[]'))
      setStoredInvoices(allInvoices)
    } else {
      // If the user is not a manager, get only their invoices
      const userInvoices = JSON.parse(localStorage.getItem(`invoices_${userId}`) || '[]')
      setStoredInvoices(userInvoices)
    }
  }, [userId, role, invoices])

  return (
    <Table className="w-full mt-5 border border-gray-300 rounded-md">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="border border-gray-300 text-center">Username</TableHead>
          <TableHead className="border border-gray-300 text-center">Name</TableHead>
          <TableHead className="border border-gray-300 text-center">Number of Works</TableHead>
          <TableHead className="border border-gray-300 text-center">Condition</TableHead>
          <TableHead className="border border-gray-300 text-center">Price</TableHead>
          <TableHead className="border border-gray-300 text-center">Paid</TableHead>
          <TableHead className="border border-gray-300 text-center">Total</TableHead>
          <TableHead className="border border-gray-300 text-center">Left Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storedInvoices.map((invoice, index) => {
          const total = invoice.price * invoice.numberOfWorks
          const leftAmount = total - invoice.paid
          return (
            <TableRow key={index} className="border border-gray-300">
              <TableCell className="border border-gray-300 text-center">{invoice.username}</TableCell>
              <TableCell className="border border-gray-300 text-center">{invoice.name}</TableCell>
              <TableCell className="border border-gray-300 text-center">{invoice.numberOfWorks}</TableCell>
              <TableCell className="border border-gray-300 text-center">{invoice.condition}</TableCell>
              <TableCell className="border border-gray-300 text-center">{invoice.price}</TableCell>
              <TableCell className="border border-gray-300 text-center">{invoice.paid}</TableCell>
              <TableCell className="border border-gray-300 text-center">{total}</TableCell>
              <TableCell className="border border-gray-300 text-center">{leftAmount}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-gray-100 text-black">
          <TableCell colSpan={6} className="border border-gray-300 text-center">Total</TableCell>
          <TableCell className="border border-gray-300 text-center">
            {storedInvoices.reduce((acc, invoice) => acc + invoice.price * invoice.numberOfWorks, 0)}
          </TableCell>
          <TableCell className="border border-gray-300 text-center">
            {storedInvoices.reduce((acc, invoice) => acc + (invoice.price * invoice.numberOfWorks - invoice.paid), 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default InvoiceTable