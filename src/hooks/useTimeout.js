import React from 'react'


export const useTimeout = (time = 1000) => {
    setTimeout(() => {
        return true
    }, time)
}