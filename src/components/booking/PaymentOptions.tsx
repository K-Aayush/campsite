import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: (method: "esewa" | "khalti") => void;
  amount: number;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  isOpen,
  onClose,
  onSelectPayment,
  amount,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            onClick={() => onSelectPayment("esewa")}
            className="flex flex-col items-center gap-2 h-auto p-4"
            variant="outline"
          >
            <Image
              src="/esewa-logo.png"
              alt="eSewa"
              width={60}
              height={60}
              className="rounded-md"
            />
            <span>Pay with eSewa</span>
            <span className="text-sm text-muted-foreground">
              NPR {amount.toLocaleString()}
            </span>
          </Button>
          <Button
            onClick={() => onSelectPayment("khalti")}
            className="flex flex-col items-center gap-2 h-auto p-4"
            variant="outline"
          >
            <Image
              src="/khalti-logo.png"
              alt="Khalti"
              width={60}
              height={60}
              className="rounded-md"
            />
            <span>Pay with Khalti</span>
            <span className="text-sm text-muted-foreground">
              NPR {amount.toLocaleString()}
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptions;
