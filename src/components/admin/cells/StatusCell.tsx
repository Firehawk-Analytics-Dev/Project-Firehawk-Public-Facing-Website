'use client'

import React from 'react'

interface StatusCellProps {
    cellData?: string | number
    field: {
        options?: {
            label: string
            value: string | number
        }[]
    }
}

export const StatusCell: React.FC<StatusCellProps> = ({ cellData, field }) => {
    if (!cellData) return null

    const value = cellData.toString().toLowerCase()

    // Find the label from the field options if available
    const option = field.options?.find((opt) => opt.value === cellData)
    const label = option ? option.label : cellData

    return (
        <div className={`status-pill status-${value}`}>
            <span className="status-dot" />
            <span className="status-text">{label}</span>
        </div>
    )
}
