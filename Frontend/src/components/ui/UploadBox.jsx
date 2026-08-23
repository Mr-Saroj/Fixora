import React from "react";

const UploadBox = ({
  label,
  icon,
  preview,
  inputRef,
  onChange,
  onRemove,
}) => {
  return (
    <div>
      {/* Label */}
      <label className="block text-[13px] font-bold text-text-main uppercase mb-2 flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px] text-primary">
          {icon}
        </span>

        {label}
      </label>

      {/* Preview / Upload Area */}
      {preview ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-primary/20">
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-cover"
          />

          {/* Remove Button */}
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              close
            </span>
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-40 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-[36px]">
            cloud_upload
          </span>

          <p className="text-[13px] text-text-muted">
            Click to upload
          </p>

          <p className="text-[11px] text-text-muted/60">
            JPG, PNG, WEBP — max 5 MB
          </p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default UploadBox;