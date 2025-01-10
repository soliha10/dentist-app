'use client';

import React, { useState, useEffect } from 'react';
import InvoiceForm from '../../components/InvoiceForm';
import InvoiceTable from '../../components/InvoiceTable';
import { DatePickerDemo } from '../../components/date';

interface Invoice {
  username: string;
  name: string;
  numberOfWorks: number
  condition: string;
  price: number;
  paid: number;
}

const ManagerPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.username) {
      setUserId(loggedInUser.username);
      setRole(loggedInUser.role);
      const allInvoices = Object.keys(localStorage)
        .filter(key => key.startsWith('invoices_'))
        .flatMap(key => JSON.parse(localStorage.getItem(key) || '[]'));
      setInvoices(allInvoices);
    } else {
      // Redirect to login if no user is logged in
      window.location.href = '/login';
    }
  }, []);

  const handleAddInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };

  if (!userId || !role) {
    return null; // or a loading spinner
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl mb-4">Xush kelibsiz, {userId}</h1>
      <DatePickerDemo />
      <InvoiceForm userId={userId} onAddInvoice={handleAddInvoice} />
      <InvoiceTable userId={userId} role={role} invoices={invoices} />
    </div>
  );
};

export default ManagerPage;