import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldWrapperProps = {
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
};

export function FieldWrapper({
  label,
  description,
  error,
  children,
}: FieldWrapperProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-neutral-900">{label}</span>

      {description ? (
        <span className="mt-1 block text-sm leading-6 text-neutral-500">
          {description}
        </span>
      ) : null}

      <div className="mt-2">{children}</div>

      {error ? (
        <span className="mt-2 block text-sm text-red-600">{error}</span>
      ) : null}
    </label>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      className={`w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/10 ${className}`}
      {...props}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`min-h-28 w-full resize-y rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm leading-7 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/10 ${className}`}
      {...props}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/10 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}