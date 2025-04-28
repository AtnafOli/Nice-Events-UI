import React, { useState, useEffect } from "react";
import { MyModal } from "./reUsableModal";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const PaymentMethod = ({
  method,
  isSelected,

  onSelect,
}: {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-5 rounded-lg cursor-pointer transition-all duration-200 shadow-md
        ${
          isSelected
            ? "bg-white ring-2 ring-primary"
            : "bg-gray-50 hover:bg-gray-100 border border-gray-300"
        }
      `}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center space-x-4">
        <Image
          alt={`${method.name} logo`}
          src={method.logo}
          width={80}
          height={80}
          className={`rounded-md ${
            isSelected ? "bg-primary text-primary" : "bg-gray-100"
          }`}
        />
        <div className="flex-1 flex-col items-start justify-start">
          <p className="font-semibold text-gray-900">{method.name}</p>
          <p className="text-sm text-gray-500">{method.description}</p>
        </div>
        {isSelected && <CheckCircle className="w-6 h-6 text-primary" />}
      </div>
    </div>
  );
};

const PaymentGateways = ({
  amount,
  isModalOpen,
  closeModal,
  title,
  onSelectPayment,
}: {
  amount: string;
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  onSelectPayment: (method: PaymentMethod) => void;
}) => {
  const [selectedGateway, setSelectedGateway] = useState<
    PaymentMethod | undefined
  >(undefined);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "chapa",
      name: "Chapa",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2omZr0ntD1eBRPTQBYdwll8tMqsT3MaeGQ&s",
      description: "Pay with Mobile Money",
    },
  ];

  useEffect(() => {
    setSelectedGateway(paymentMethods[0]);
  }, []);

  const handleContinue = () => {
    if (selectedGateway) {
      onSelectPayment(selectedGateway);
    }
  };

  return (
    <MyModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={title}
      showIcon={false}
      size="md"
      bgClassName="bg-white mx-auto rounded-2xl shadow-lg"
      contentClassName="text-center px-8 py-6"
    >
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-gray-500">Amount to Pay</p>
          <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
            ETB {parseInt(amount).toFixed(2)}
          </span>
        </div>

        {!selectedGateway && (
          <div className="text-center text-primary font-medium mb-4">
            Please select a payment gateway.
          </div>
        )}

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <PaymentMethod
              key={method.id}
              method={method}
              isSelected={selectedGateway?.id === method.id}
              onSelect={() => setSelectedGateway(method)}
            />
          ))}
        </div>

        <div className="space-y-4">
          <button
            onClick={handleContinue}
            disabled={!selectedGateway || isProcessing}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200
              ${
                selectedGateway
                  ? isProcessing
                    ? "bg-primary text-white opacity-75 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
            aria-label="Pay Now Button"
            aria-disabled={!selectedGateway || isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin w-5 h-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Processing...
              </div>
            ) : (
              "Pay Now"
            )}
          </button>

          <button
            onClick={closeModal}
            className="w-full py-3 rounded-xl font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-300"
            aria-label="Cancel Button"
          >
            Cancel
          </button>
        </div>
      </div>
    </MyModal>
  );
};

export default PaymentGateways;
