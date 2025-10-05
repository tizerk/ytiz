import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-opacity-50 group-[.toaster]:bg-gradient-to-b from-nav_top to-nav_bot group-[.toaster]:text-text  group-[.toaster]:border-2 group-[.toaster]:shadow-lg drop-shadow-glow",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:border-red-400",
          success: "group-[.toaster]:border-green-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
