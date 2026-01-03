import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

interface UploaderProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const Uploader: React.FC<UploaderProps> = ({ onFileSelect, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    onFileSelect(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !isAnalyzing && inputRef.current?.click()}
      className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out h-64 flex flex-col items-center justify-center overflow-hidden
        ${isDragging 
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10' 
          : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }
        ${isAnalyzing ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      `}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
        accept="image/*"
      />
      
      <div className="z-10 flex flex-col items-center space-y-4 text-center p-6">
        <div className={`p-4 rounded-full bg-white dark:bg-slate-800 shadow-sm transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
          <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-brand-500' : 'text-slate-400'}`} />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            SVG, PNG, JPG or GIF (max. 10MB)
          </p>
        </div>
      </div>
      
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};