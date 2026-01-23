'use client'

import React from 'react'
import { Plus, SearchX } from 'lucide-react'
import { useConfig } from '@payloadcms/ui'
import Link from 'next/link'

interface EmptyListStateProps {
    listData?: {
        totalDocs: number
    }
    collectionSlug?: string
}

export const EmptyListState: React.FC<EmptyListStateProps> = (props) => {
    // We only want to show this if there are no documents.
    // However, beforeListTable is always rendered.
    // We can use a trick: Payload's default empty state is actually rendered by the List view itself.
    // If we want to replace it, we might need a different approach or just styling.

    // For now, let's create a component that can be used consistently.
    // If props.data?.totalDocs === 0, we show our custom UI.

    const { config } = useConfig()

    // In Payload 3.0, props for beforeListTable might vary.
    // Let's check for totalDocs.
    const totalDocs = props?.listData?.totalDocs

    if (totalDocs !== 0) return null

    return (
        <div className="custom-empty-state">
            <div className="empty-state-icon">
                <SearchX size={48} />
            </div>
            <h3 className="empty-state-title">No Results Found</h3>
            <p className="empty-state-description">
                It looks like there aren&apos;t any records here yet.
                Start by creating your first one or adjusting your filters.
            </p>
            <Link
                href={`${config.routes.admin}/collections/${props.collectionSlug}/create`}
                className="empty-state-cta"
            >
                <Plus size={18} />
                <span>Create New {props.collectionSlug}</span>
            </Link>
        </div>
    )
}
