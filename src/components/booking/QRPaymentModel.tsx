"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, X } from "lucide-react";
import { showToast } from "@/utils/Toast";

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: "FONEPAY" | null;
  amount: number;
  onPaymentComplete: (paymentProof: File) => void;
}

const QRPaymentModal: React.FC<QRPaymentModalProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  amount,
  onPaymentComplete,
}) => {
  const [copied, setCopied] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const paymentDetails = {
    FONEPAY: {
      name: "FONEPAY",
      qrCode: "/esewa-qr.png",
      accountId: "9841234567",
      instructions: [
        "Open your banking app",
        "Scan the QR code or enter your ID",
        "Enter the exact amount shown below",
        "Complete the payment",
        "Take a screenshot of the payment confirmation",
        "Upload the screenshot below",
      ],
    },
  };

  const currentPayment = paymentMethod ? paymentDetails[paymentMethod] : null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("success", { title: "Copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
      showToast("error", { title: "Failed to copy" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleSubmitProof = () => {
    if (paymentProof) {
      onPaymentComplete(paymentProof);
      onClose();
    } else {
      showToast("error", { title: "Please upload payment proof" });
    }
  };

  if (!currentPayment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Pay with {currentPayment.name}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount */}
          <div className="text-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Amount to Pay
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              NPR {amount.toLocaleString()}
            </p>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border inline-block">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                {/* Placeholder for QR code - replace with actual QR code image */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-lg mb-2 mx-auto flex items-center justify-center">
                    <span className="text-xs text-gray-500">QR Code</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Scan with {currentPayment.name} app
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account ID */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">
              {currentPayment.name} ID:
            </p>
            <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded border">
              <span className="font-mono text-lg">
                {currentPayment.accountId}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(currentPayment.accountId)}
                className="ml-2"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-medium mb-3">Payment Instructions:</h3>
            <ol className="space-y-2">
              {currentPayment.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Upload Payment Proof */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Payment Screenshot <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              required
            />
            {paymentProof && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                ✓ File selected: {paymentProof.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitProof}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!paymentProof}
            >
              Submit Payment Proof
            </Button>
          </div>

          {/* Note */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Please ensure the payment amount matches
              exactly. Your booking will be confirmed after payment
              verification.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRPaymentModal;
