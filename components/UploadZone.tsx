import React, { useRef, useState } from 'react';
import { Upload, FileVideo, FileImage, ScanLine, FileAudio, FileText } from 'lucide-react';

interface Props {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  file?: File | null;
}

const UploadZone: React.FC<Props> = ({ onFileSelect, isProcessing, file }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndPass(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndPass(e.target.files[0]);
    }
  };

  const validateAndPass = (file: File) => {
    // Extended validation for Image, Video, Audio, and Text
    const validTypes = ['image/', 'video/', 'audio/', 'text/'];
    const isPDF = file.type === 'application/pdf';
    
    if (!validTypes.some(t => file.type.startsWith(t)) && !isPDF) {
      alert("Please upload an Image, Video, Audio, or Text file.");
      return;
    }
    onFileSelect(file);
  };

  const getFileIcon = (type: string) => {
      if (type.startsWith('image')) return <FileImage className="w-5 h-5 text-indigo-500" />;
      if (type.startsWith('video')) return <FileVideo className="w-5 h-5 text-purple-500" />;
      if (type.startsWith('audio')) return <FileAudio className="w-5 h-5 text-cyan-500" />;
      return <FileText className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div 
      className={`relative w-full max-w-2xl h-72 mx-auto rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group
      ${isDragging ? 'border-primary-500 bg-primary-500/10' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900'}
      ${isProcessing ? 'pointer-events-none' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        accept="image/*,video/*,audio/*,text/plain,application/pdf"
        onChange={handleChange}
      />

      <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 transition-opacity duration-300 ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`p-4 rounded-full bg-slate-200 dark:bg-slate-800 mb-4 transition-transform duration-500 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
          <Upload className="w-8 h-8 text-slate-500 dark:text-slate-300" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">
          {isDragging ? 'Release to Scan' : 'Upload Evidence'}
        </h3>
        <p className="text-sm text-slate-500 mb-4 max-w-xs text-center">
          Drag & drop media for multi-modal forensic analysis
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-500 dark:text-slate-600 uppercase tracking-widest font-mono">
          <span className="flex items-center gap-1"><FileImage className="w-3 h-3" /> JPG/PNG</span>
          <span className="flex items-center gap-1"><FileVideo className="w-3 h-3" /> MP4/MOV</span>
          <span className="flex items-center gap-1"><FileAudio className="w-3 h-3" /> MP3/WAV</span>
          <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> TXT/PDF</span>
        </div>
      </div>

      {/* Scanning Effect & File Display */}
      {isProcessing && (
        <div className="absolute inset-0 z-30 bg-white/90 dark:bg-black/80 flex items-center justify-center backdrop-blur-md transition-all duration-500">
           <div className="text-center px-6">
             <div className="relative inline-block">
                <ScanLine className="w-12 h-12 text-primary-600 dark:text-primary-500 mx-auto animate-pulse mb-4" />
                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full animate-pulse"></div>
             </div>
             
             <p className="text-primary-600 dark:text-primary-400 font-mono animate-pulse font-bold tracking-widest text-sm mb-4">ANALYZING DATA...</p>
             
             {file && (
               <div className="animate-fade-in-up bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-lg max-w-sm mx-auto">
                 <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="overflow-hidden min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{file.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono uppercase">
                        {file.type || 'UNKNOWN'} • {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                 </div>
               </div>
             )}
           </div>
        </div>
      )}
      
      {!isProcessing && <div className="scan-line pointer-events-none opacity-20 group-hover:opacity-50" />}
    </div>
  );
};

export default UploadZone;
