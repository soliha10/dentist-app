'use client';

import React, { useState, useEffect } from 'react';
import InvoiceForm from '../../components/InvoiceForm';
import InvoiceTable from '../../components/InvoiceTable';

interface Invoice {
  username: string;
  name: string;
  numberOfWorks: number
  condition: string;
  price: number;
  paid: number;
}

const UserPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.username) {
      setUserId(loggedInUser.username);
      setRole(loggedInUser.role);
      const userInvoices = JSON.parse(localStorage.getItem(`invoices_${loggedInUser.username}`) || '[]');
      setInvoices(userInvoices);
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
      <InvoiceForm userId={userId} onAddInvoice={handleAddInvoice} />
      <InvoiceTable userId={userId} role={role} invoices={invoices} />
    </div>
  );
};

export default UserPage;