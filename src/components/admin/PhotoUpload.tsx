'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useField, FieldLabel, Button, LoadingOverlay, toast } from '@payloadcms/ui'
import { X, Upload, CheckCircle2, RotateCcw, AlertCircle, RefreshCw } from 'lucide-react'

interface Props {
    path: string;
    label?: string | Record<string, string>;
    required?: boolean;
    field?: {
        label?: string | Record<string, string>;
        admin?: {
            description?: string | Record<string, string>;
        }
    }
}

export const PhotoUpload: React.FC<Props> = (props) => {
    const { path, required, field } = props;
    const { value, setValue } = useField<string | number | null>({ path })
    const [preview, setPreview] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [previousValue, setPreviousValue] = useState<string | number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const valueRef = useRef(value);
    useEffect(() => { valueRef.current = value; }, [value]);

    const getLabel = useCallback(() => {
        const rawLabel = props.label || field?.label;
        if (typeof rawLabel === 'string' && rawLabel !== 'Asset') return rawLabel;
        if (rawLabel && typeof rawLabel === 'object') {
            const val = rawLabel.en || Object.values(rawLabel)[0];
            if (val && val !== 'Asset') return val;
        }
        return path.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace('Id', '');
    }, [props.label, field?.label, path]);

    const displayLabel = getLabel();
    const description = field?.admin?.description;

    const getMediaId = (val: string | number | { id: string | number } | null) => {
        if (!val) return null;
        if (typeof val === 'object' && val !== null && 'id' in val) return val.id;
        return val as string | number;
    }

    const mediaId = getMediaId(value);

    useEffect(() => {
        if (mediaId) {
            const fetchMedia = async () => {
                try {
                    const response = await fetch(`/api/payload/media/${mediaId}`)
                    if (response.ok) {
                        const data = await response.json()
                        setPreview(data.url)
                        setFileName(data.filename)
                        setError(null);
                        setStatus('success');
                    } else {
                        setStatus('idle');
                    }
                } catch (err) {
                    console.error('Error fetching media:', err)
                    setStatus('idle');
                }
            }
            fetchMedia()
        } else {
            setPreview(null)
            setFileName(null)
            setError(null);
            setStatus('idle');
        }
    }, [mediaId])

    const triggerAutosave = useCallback(async (newValue: string | number | null) => {
        setLoading(true);
        try {
            const response = await fetch('/api/payload/globals/branding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [path]: newValue }),
            });

            if (response.ok) {
                toast.success(`${displayLabel} updated and saved.`);
                setError(null);
                setStatus('success');
            } else {
                const errData = await response.json().catch(() => ({}));
                const msg = errData.errors?.[0]?.message || `Update failed (${response.status})`;
                setError(msg);
                setStatus('error');
            }
        } catch (err) {
            console.error('Autosave error:', err);
            setError('Connection failed during autosave');
            setStatus('error');
        } finally {
            setLoading(false);
        }
    }, [displayLabel, path]);

    const handleUpload = useCallback(async (file: File) => {
        setLoading(true)
        setError(null);
        setStatus('idle');

        const formData = new FormData()
        formData.append('file', file)
        formData.append('alt', displayLabel)

        try {
            const response = await fetch('/api/payload/media', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json().catch(() => ({}));

            if (response.ok && data.doc) {
                const newId = data.doc.id;
                setPreviousValue(valueRef.current);
                setValue(newId);
                await triggerAutosave(newId);
            } else {
                const msg = data.errors?.[0]?.message || `Upload failed (${response.status})`;
                setError(msg);
                setStatus('error');
                toast.error(`Check file: ${msg}`);
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('Connection failed during upload');
            setStatus('error');
            toast.error('Upload failed. Connection lost.');
        } finally {
            setLoading(false)
        }
    }, [displayLabel, setValue, triggerAutosave]);

    const undo = useCallback(async (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (previousValue !== undefined && previousValue !== null) {
            const redoValue = previousValue;
            setPreviousValue(value);
            setValue(redoValue);
            await triggerAutosave(redoValue);
            toast('Undo successful', { icon: <RotateCcw size={14} /> });
        }
    }, [previousValue, value, setValue, triggerAutosave]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
                if (previousValue !== null) {
                    undo();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previousValue, undo]);

    return (
        <div className="field-type upload admin-field-group">
            <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <FieldLabel label={displayLabel} required={required} />
                    {description && (
                        <div style={{ fontSize: '13px', color: 'var(--theme-text-tertiary)', marginTop: '4px' }}>
                            {typeof description === 'string' ? description : ''}
                        </div>
                    )}
                </div>
                {previousValue !== null && (
                    <button
                        onClick={undo}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--theme-primary)',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            opacity: 0.8
                        }}
                    >
                        <RotateCcw size={12} /> UNDO (⌘Z)
                    </button>
                )}
            </div>

            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    if (e.dataTransfer.files?.[0]) {
                        handleUpload(e.dataTransfer.files[0]);
                    }
                }}
                className={`admin-component-card ${status} ${dragging ? 'dragging' : ''}`}
                onClick={() => document.getElementById(`file-input-${path}`)?.click()}
            >
                {loading && <LoadingOverlay />}

                <input
                    type="file"
                    id={`file-input-${path}`}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            handleUpload(e.target.files[0]);
                        }
                    }}
                />

                {preview ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div className="admin-preview-box">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preview} alt="Current Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div className="admin-status-badge success">
                                <CheckCircle2 size={16} />
                                <span>Syndicated to Supabase</span>
                            </div>
                            {fileName && <span style={{ fontSize: '12px', color: 'var(--theme-text-tertiary)', fontWeight: '500' }}>{fileName}</span>}
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <Button size="small" buttonStyle="secondary" onClick={(e) => { e.stopPropagation(); setPreviousValue(value); setValue(null); triggerAutosave(null); }} icon={<X size={14} />}>Reset</Button>
                            <Button size="small" buttonStyle="primary" onClick={(e) => { e.stopPropagation(); document.getElementById(`file-input-${path}`)?.click(); }} icon={<RefreshCw size={14} />}>Replace Image</Button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            background: error ? 'rgba(255, 0, 0, 0.1)' : 'var(--theme-elevation-150)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: error ? 'var(--theme-error)' : 'var(--theme-primary)',
                        }}>
                            {error ? <AlertCircle size={32} /> : <Upload size={32} />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '15px', fontWeight: '800', color: error ? 'var(--theme-error)' : 'var(--theme-text)' }}>
                                {error ? 'SYNCHRONIZATION ERROR' : `UPLOAD ${displayLabel.toUpperCase()}`}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--theme-text-tertiary)' }}>
                                {error ? error : 'Drag & drop or click to connect asset'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
