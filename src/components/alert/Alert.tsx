'use client'
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { AlertContext, AlertOption } from './Context';

export default function AlertContextManager({ children }: { children: React.ReactNode }) {
    const [showAlert, setShowAlert] = useState<AlertOption | null>(null);

    const triggerAlert = ({ message, mode }: AlertOption) => {
        setShowAlert({ message, mode });
        setTimeout(() => {
            setShowAlert(null);
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert: triggerAlert }}>
            {showAlert && (
                <Alert variant="filled" severity={
                    showAlert.mode ?? 'success'
                } className='fixed top-0 w-full z-50 bg-black text-white opacity-50'>
                    {showAlert.message}
                </Alert>
            )}
            {children}
        </AlertContext.Provider>
    );
}