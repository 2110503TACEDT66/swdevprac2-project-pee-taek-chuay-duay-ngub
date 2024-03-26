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
                } className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-45 animate-pulse">
                    {showAlert.message}
                </Alert>
            )}
            {children}
        </AlertContext.Provider>
    );
}