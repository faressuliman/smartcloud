import { Info } from "lucide-react";
import { memo } from "react";

interface FormInputProps {
  type?: "text" | "email" | "tel" | "number";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  min?: string;
}

const FormInput = memo(function FormInput({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  error,
  min 
}: FormInputProps) {
  const inputClass = "w-full rounded-lg border-2 border-transparent bg-slate-50/80 px-4 py-3 text-[#1e3a5f] transition-all duration-200 ease-out focus:border-primary focus:bg-white focus:shadow-md focus:outline-none placeholder:text-slate-400 text-xs sm:text-base";

  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
        placeholder={placeholder}
        min={min}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
          <Info className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
});

export default FormInput;
