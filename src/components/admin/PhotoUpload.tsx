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
            <div className="flex justify-between items-end mb-4">
                <div>
                    <FieldLabel label={displayLabel} required={required} />
                    {description && (
                        <div className="text-sm text-gray-500 mt-1">
                            {typeof description === 'string' ? description : ''}
                        </div>
                    )}
                </div>
                {previousValue !== null && (
                    <button
                        onClick={undo}
                        className="flex items-center gap-1 text-xs font-bold text-brand-blue opacity-80 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer"
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
                    <div className="w-full flex flex-col items-center gap-5">
                        <div className="admin-preview-box">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preview} alt="Current Logo" className="max-w-full max-h-full object-contain" />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="admin-status-badge success">
                                <CheckCircle2 size={16} />
                                <span>Syndicated to Supabase</span>
                            </div>
                            {fileName && <span className="text-xs text-gray-400 font-medium">{fileName}</span>}
                        </div>

                        <div className="flex gap-3">
                            <Button size="small" buttonStyle="secondary" onClick={(e) => { e.stopPropagation(); setPreviousValue(value); setValue(null); triggerAutosave(null); }} icon={<X size={14} />}>Reset</Button>
                            <Button size="small" buttonStyle="primary" onClick={(e) => { e.stopPropagation(); document.getElementById(`file-input-${path}`)?.click(); }} icon={<RefreshCw size={14} />}>Replace Image</Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 pointer-events-none">
                        <div className={`upload-icon-circle w-16 h-16 rounded-full flex items-center justify-center transition-all ${error ? 'bg-red-50 text-red-500' : 'bg-brand-blue/10 text-brand-blue'}`}>
                            {error ? <AlertCircle size={32} /> : <Upload size={32} />}
                        </div>
                        <div className="flex flex-col gap-1 text-center font-sans">
                            <span className={`text-base font-extrabold tracking-tight ${error ? 'text-red-500' : 'text-gray-900 uppercase'}`}>
                                {error ? 'SYNCHRONIZATION ERROR' : `UPLOAD ${displayLabel.toUpperCase()}`}
                            </span>
                            <span className="text-sm text-gray-500">
                                {error ? error : 'Drag & drop or click to connect asset'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
