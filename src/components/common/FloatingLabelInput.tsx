import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react';

interface FloatingLabelInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  multiline?: false;
  rows?: never;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FloatingLabelTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string;
  multiline: true;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

type Props = FloatingLabelInputProps | FloatingLabelTextareaProps;

export function FloatingLabelInput({ label, multiline, rows, ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value !== '' && props.value !== undefined && props.value !== null;

  const isFloating = isFocused || hasValue;

  const sharedClasses = `
    w-full px-5 pt-7 pb-3 bg-white border-2 border-slate-200 rounded-xl
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition-all text-slate-900 font-medium
  `;

  const labelClasses = `
    absolute left-5 transition-all pointer-events-none font-medium
    ${isFloating
      ? 'top-2 text-xs text-blue-600'
      : 'top-1/2 -translate-y-1/2 text-base text-slate-500'
    }
  `;

  return (
    <div className="relative">
      {multiline ? (
        <>
          <textarea
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={rows || 3}
            className={sharedClasses}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e as any);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e as any);
            }}
          />
          <label className={`${labelClasses} top-4 translate-y-0 ${isFloating ? 'top-2' : ''}`}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </>
      ) : (
        <>
          <input
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            className={sharedClasses}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e as any);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e as any);
            }}
          />
          <label className={labelClasses}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </>
      )}
    </div>
  );
}
