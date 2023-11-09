"use client"
import { store } from '@/redux/store';
import React from 'react'
import { Provider } from 'react-redux';

interface IProps {
    children: React.ReactNode;
}
function AppProvider({children}: IProps) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default AppProvider
