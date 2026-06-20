declare module 'lucide-react';
declare module '@radix-ui/react-tooltip';
declare module '@radix-ui/react-toast';

// Allow importing path aliases in non-type-checked environments
declare module '@/components/*';
declare module '@/hooks/*';
 
// Minimal React typings to satisfy JSX in environments missing @types/react
// keep only lightweight module shims for third-party libs; do not override React types
declare module 'lucide-react';
declare module '@radix-ui/react-tooltip';
declare module '@radix-ui/react-toast';

// Allow importing path aliases in non-type-checked environments
declare module '@/components/*';
declare module '@/hooks/*';

// NOTE: Removed the custom `declare module 'react'` block because it shadowed
// the official `@types/react` definitions and caused many missing-type errors.
