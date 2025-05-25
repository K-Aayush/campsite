import { toast } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning";

export type CustomToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export type ToastAnimation =
  | "slide-in-right"
  | "slide-in-left"
  | "slide-in-up"
  | "slide-in-down"
  | "zoom"
  | "fade";

// Our custom options type
export type ToastOptions = {
  title: string;
  description?: string;
  duration?: number;
  position?: CustomToastPosition;
  animation?: ToastAnimation;
  dismissible?: boolean;
  className?: string;
  actionLabel?: string;
  onAction?: () => void;
};

// Type for internal use with sonner's toast function
interface SonnerCompatibleOptions {
  description?: string;
  duration?: number;
  position?: CustomToastPosition;
  dismissible?: boolean;
  className?: string;
  custom?: Record<string, unknown>;
  icon?: string | null;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type AnimationStyle = {
  initial: Record<string, number>;
  animate: Record<string, number>;
  exit: Record<string, number>;
};

/**
 * Shows a color-coded toast notification using Sonner
 * @param type - The type of toast: 'success', 'error', 'info', or 'warning'
 * @param options - Configuration options for the toast
 */
export const showToast = (type: ToastType, options: ToastOptions) => {
  const {
    title,
    description,
    duration = 2000,
    position = "top-right",
    animation = "slide-in-right",
    dismissible = true,
    className = "",
    actionLabel,
    onAction,
  } = options;

  const animationStyles: Record<ToastAnimation, AnimationStyle> = {
    "slide-in-right": {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
    },
    "slide-in-left": {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    },
    "slide-in-up": {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 100 },
    },
    "slide-in-down": {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -100 },
    },
    zoom: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  const getTypeClass = (toastType: ToastType) => {
    switch (toastType) {
      case "success":
        return "toast-success border-l-4 border-green-500 bg-green-50";
      case "error":
        return "toast-error border-l-4 border-red-500 bg-red-50";
      case "info":
        return "toast-info border-l-4 border-blue-500 bg-blue-50";
      case "warning":
        return "toast-warning border-l-4 border-yellow-500 bg-yellow-50";
      default:
        return "toast-default";
    }
  };

  const getIcon = (toastType: ToastType) => {
    switch (toastType) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      default:
        return null;
    }
  };

  // Create toast options with our own compatible interface
  const toastOptions: SonnerCompatibleOptions = {
    description,
    duration,
    position,
    dismissible,
    className: `${getTypeClass(type)} shadow-md rounded-md ${className}`,
    custom: animationStyles[animation],
    icon: getIcon(type),
  };

  if (actionLabel && onAction) {
    toastOptions.action = {
      label: actionLabel,
      onClick: onAction,
    };
  }

  switch (type) {
    case "success":
      toast.success(title, toastOptions);
      break;
    case "error":
      toast.error(title, toastOptions);
      break;
    case "info":
      toast.info(title, toastOptions);
      break;
    case "warning":
      toast.warning(title, toastOptions);
      break;
    default:
      toast(title, toastOptions);
  }
};

export const ToastConfig = () => {
  return {
    theme: "light",
    closeButton: true,
    richColors: true,
    toastOptions: {
      className: "shadow-lg rounded-lg",
      success: {
        className: "bg-white text-green-800",
      },
      error: {
        className: "bg-white text-red-800",
      },
    },
  };
};
