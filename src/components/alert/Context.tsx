import React, { createContext, useContext, useState } from 'react';

type AlertMode = 'success' | 'error' | 'warning' | 'info';
export interface AlertOption {
    message: string;
    mode: AlertMode;
}
export const AlertContext = createContext({
    showAlert: ({ message, mode }: AlertOption) => { },
});

export const useAlert = () => useContext(AlertContext);
